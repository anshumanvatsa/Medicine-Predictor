import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Zap, Users } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  const stats = [
    { icon: Shield, label: "Safety Checks", value: "50,000+" },
    { icon: Zap, label: "AI Accuracy", value: "99.2%" },
    { icon: Users, label: "Trusted Users", value: "10,000+" },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Medical AI Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-foreground leading-tight">
                AI-Powered{" "}
                <span className="text-primary">Drug Safety</span>{" "}
                Analysis
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Harness the power of advanced machine learning to predict drug safety, 
                identify potential adverse reactions, and ensure optimal treatment outcomes 
                for every patient.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => document.getElementById('safety-check')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg"
              >
                Start Safety Analysis
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-semibold px-8 py-4 text-lg"
              >
                Learn How It Works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 shadow-2xl border border-border">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">AI Analysis Active</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Safety Score</span>
                    <span className="text-lg font-bold text-success">94.8%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div 
                      className="bg-success h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "94.8%" }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary">2.4s</div>
                    <div className="text-xs text-muted-foreground">Analysis Time</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-primary">847</div>
                    <div className="text-xs text-muted-foreground">Data Points</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;