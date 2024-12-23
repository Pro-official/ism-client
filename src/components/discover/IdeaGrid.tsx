import { motion } from "framer-motion";
import IdeaCard from "./IdeaCard";
import { Idea } from "../../types/Idea";

interface IdeaGridProps {
  ideas: Idea[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function IdeaGrid({ ideas }: IdeaGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {ideas.map((idea) => (
        <motion.div key={idea.id} variants={item}>
          <IdeaCard {...idea} />
        </motion.div>
      ))}
    </motion.div>
  );
}
