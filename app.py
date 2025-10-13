import io
import os
import streamlit as st
import pandas as pd
import joblib

# -----------------------------
# Streamlit page config
# -----------------------------
st.set_page_config(page_title="DrugSafe AI (Streamlit)", layout="wide")

# -----------------------------
# Model paths
# -----------------------------
MODEL_ADVERSE_PATH = "xgb_adverse_reaction_model.pkl"
MODEL_REACTION_PATH = "xgb_reaction_type_model.pkl"
LE_ADVERSE_PATH = "le_adverse.pkl"
LE_REACTION_PATH = "le_reaction.pkl"


@st.cache_resource
def load_artifacts():
    if not (os.path.exists(MODEL_ADVERSE_PATH) and os.path.exists(MODEL_REACTION_PATH)):
        raise FileNotFoundError(
            "Model files not found. Ensure .pkl files are in the same folder as app.py"
        )
    model1 = joblib.load(MODEL_ADVERSE_PATH)
    model2 = joblib.load(MODEL_REACTION_PATH)
    le_adverse = joblib.load(LE_ADVERSE_PATH) if os.path.exists(LE_ADVERSE_PATH) else None
    le_reaction = joblib.load(LE_REACTION_PATH) if os.path.exists(LE_REACTION_PATH) else None
    return model1, model2, le_adverse, le_reaction


model1, model2, le_adverse, le_reaction = load_artifacts()

CATEGORICAL_COLS = [
    "Sex", "Ethnicity", "Comorbidities", "Known_Allergies", "Previous_Adverse_Reactions",
    "Current_Medications", "Herbal_Supplements", "Alcohol_Use", "Smoking_Status",
    "CYP2D6_status", "CYP2C19_status", "HLA_B_5701", "Other_Genetic_Risks",
    "Drug_Name", "Drug_Route", "Drug_Frequency"
]

NUMERIC_COLS = [
    "Age", "Weight_kg", "Height_cm", "BMI", "Creatinine_mg_dL", "eGFR_mL_min",
    "ALT_U_L", "AST_U_L", "Bilirubin_mg_dL", "Hemoglobin_g_dL", "QTc_ms", "Drug_Dose_mg"
]

# Try to pull expected features from models to align ordering
FEATURES_MODEL1 = list(getattr(model1, "feature_names_in_", []))
FEATURES_MODEL2 = list(getattr(model2, "feature_names_in_", []))
EXPECTED_FEATURES = list(dict.fromkeys([*FEATURES_MODEL1, *FEATURES_MODEL2])) or None


def normalize_and_prepare(df: pd.DataFrame) -> pd.DataFrame:
    if "Patient_ID" in df.columns:
        df = df.drop(columns=["Patient_ID"])  # not used

    # Normalize categorical text
    if "Sex" in df.columns:
        df["Sex"] = (
            df["Sex"].astype(str).str.strip().str.title().replace({"M": "Male", "F": "Female"})
        )
    if "Alcohol_Use" in df.columns:
        df["Alcohol_Use"] = (
            df["Alcohol_Use"].astype(str).str.strip().str.title().replace({"None": "No", "Never": "No"})
        )
    if "Smoking_Status" in df.columns:
        df["Smoking_Status"] = (
            df["Smoking_Status"].astype(str).str.strip().str.title().replace({"None": "No", "Never": "No"})
        )
    if "HLA_B_5701" in df.columns:
        df["HLA_B_5701"] = df["HLA_B_5701"].astype(str).str.strip().str.title()
    if "Drug_Route" in df.columns:
        df["Drug_Route"] = df["Drug_Route"].astype(str).str.strip().str.title()
    if "Drug_Frequency" in df.columns:
        df["Drug_Frequency"] = df["Drug_Frequency"].astype(str).str.strip()

    # Coerce numerics safely
    for col in NUMERIC_COLS:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # Fill missing values
    for col in df.columns:
        if col in NUMERIC_COLS:
            df[col] = df[col].fillna(0)
        elif col in CATEGORICAL_COLS:
            df[col] = df[col].fillna("Unknown")

    # Ensure categorical dtypes
    for col in CATEGORICAL_COLS:
        if col in df.columns:
            df[col] = df[col].astype("category")

    # Add missing expected features and reorder
    if EXPECTED_FEATURES:
        for col in EXPECTED_FEATURES:
            if col not in df.columns:
                df[col] = "Unknown" if col in CATEGORICAL_COLS else 0
        df = df.reindex(columns=EXPECTED_FEATURES, fill_value=0)

    return df


def adverse_label_to_safe_text(value) -> str:
    s = str(value).lower()
    return "Safe" if s in {"no", "0", "safe"} else "Harmful"


# -----------------------------
# UI
# -----------------------------
st.title("💊 DrugSafe AI – Intelligent Drug Safety Checker")
st.markdown("Upload patient records (CSV) to analyze drug safety.")

uploaded_file = st.file_uploader("📂 Upload your CSV file", type=["csv"])

if uploaded_file:
    try:
        # Preview CSV
        df_in = pd.read_csv(uploaded_file)
        st.write("### 🔍 CSV Preview")
        st.dataframe(df_in.head(), use_container_width=True)

        with st.spinner("Analyzing CSV..."):
            X = normalize_and_prepare(df_in.copy())
            pred1 = model1.predict(X)
            pred2 = model2.predict(X)

            pred1_labels = le_adverse.inverse_transform(pred1) if le_adverse is not None else pred1
            pred2_labels = le_reaction.inverse_transform(pred2) if le_reaction is not None else pred2

            out = df_in.copy()
            out["Adverse_Reaction_Predicted"] = pred1_labels
            out["Reaction_Type_Predicted"] = pred2_labels
            out["Safety_Summary"] = [adverse_label_to_safe_text(v) for v in out["Adverse_Reaction_Predicted"]]

        st.success(f"✅ Analysis Complete for {len(out)} record(s)")
        st.subheader("📋 Results (first 50 rows)")
        st.dataframe(out.head(50), use_container_width=True)

        csv_out = out.to_csv(index=False).encode("utf-8")
        st.download_button("⬇️ Download Results as CSV", csv_out, "user_predictions.csv", "text/csv")

    except Exception as e:
        st.error(f"⚠️ Failed to process file: {e}")
