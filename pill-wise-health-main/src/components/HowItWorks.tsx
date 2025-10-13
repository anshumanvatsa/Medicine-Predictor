import { motion } from "framer-motion";
import { Database, Brain, Shield, CheckCircle } from "lucide-react";
import aiAnalysisImage from "@/assets/ai-analysis.jpg";

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Securely gather comprehensive patient information, medical history, and drug specifications through our intelligent form system.",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced XGBoost machine learning model processes hundreds of data points to predict potential drug interactions and adverse reactions.",
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: "Safety Assessment",
      description: "Generate detailed safety scores and risk assessments based on patient-specific factors, genetics, and medical history.",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      title: "Actionable Results",
      description: "Receive clear, evidence-based recommendations with confidence scores to support informed healthcare decisions.",
      color: "text-orange-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground mb-4">
            How Our AI Platform Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of drug safety analysis with our state-of-the-art 
            artificial intelligence platform designed for healthcare professionals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-lg border border-border">
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {index + 1}
                    </span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={aiAnalysisImage} 
                alt="AI Analysis Process"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Floating Elements */}
              <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Processing...</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground">Accuracy</div>
                <div className="text-2xl font-bold text-primary">99.2%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;