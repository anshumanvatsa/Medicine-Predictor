import { motion } from "framer-motion";
import { 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  Award,
  Database,
  Stethoscope,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Engine",
      description: "Powered by XGBoost machine learning algorithms trained on millions of medical data points for unparalleled accuracy.",
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      icon: Shield,
      title: "Comprehensive Safety Analysis",
      description: "Analyze drug interactions, genetic factors, patient history, and contraindications in seconds.",
      color: "bg-green-500/10 text-green-600 border-green-200"
    },
    {
      icon: Zap,
      title: "Real-time Predictions",
      description: "Get instant safety assessments with confidence scores and detailed risk breakdowns.",
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-200"
    },
    {
      icon: Users,
      title: "Multi-patient Support",
      description: "Manage and analyze safety profiles for multiple patients with secure data handling.",
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    },
    {
      icon: Database,
      title: "Extensive Drug Database",
      description: "Access comprehensive information on thousands of medications, dosages, and interactions.",
      color: "bg-indigo-500/10 text-indigo-600 border-indigo-200"
    },
    {
      icon: Stethoscope,
      title: "Clinical Decision Support",
      description: "Evidence-based recommendations to support healthcare professionals in treatment decisions.",
      color: "bg-red-500/10 text-red-600 border-red-200"
    },
    {
      icon: Clock,
      title: "Historical Tracking",
      description: "Monitor patient safety profiles over time and track medication effectiveness.",
      color: "bg-teal-500/10 text-teal-600 border-teal-200"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast potential adverse reactions before they occur using predictive modeling.",
      color: "bg-orange-500/10 text-orange-600 border-orange-200"
    },
    {
      icon: Award,
      title: "Regulatory Compliance",
      description: "Built to meet healthcare standards including HIPAA, GDPR, and FDA guidelines.",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground mb-4">
            Powerful Features for Healthcare Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the comprehensive suite of tools designed to revolutionize 
            drug safety analysis and clinical decision-making.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${feature.color} border group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Patient Safety?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who trust our AI-powered platform 
              for accurate drug safety predictions and better patient outcomes.
            </p>
            <button 
              onClick={() => document.getElementById('safety-check')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Start Your Safety Analysis
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;