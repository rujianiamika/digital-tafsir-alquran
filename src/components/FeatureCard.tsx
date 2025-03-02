
import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="glass-card p-6 flex flex-col items-center text-center animate-float"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="h-12 w-12 rounded-full bg-islamic-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-islamic-primary" />
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
