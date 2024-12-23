// src/components/idea/StatusBadge.tsx
import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";

type StatusType = "collaborate" | "evaluating";

interface StatusBadgeProps {
  type: StatusType;
}

export default function StatusBadge({ type }: StatusBadgeProps) {
  const config = {
    collaborate: {
      icon: Users,
      text: "Collaborate",
      colors: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    evaluating: {
      icon: Clock,
      text: "Being Evaluated",
      colors: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
  };

  const { icon: Icon, text, colors } = config[type];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors} cursor-pointer`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  );
}
