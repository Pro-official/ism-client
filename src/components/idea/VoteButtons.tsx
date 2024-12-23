import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface VoteButtonsProps {
  initialUpvotes: number;
  initialDownvotes: number;
  onVote: (type: "up" | "down") => void;
}

export default function VoteButtons({
  initialUpvotes,
  initialDownvotes,
  onVote,
}: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null);
      if (type === "up") setUpvotes((prev) => prev - 1);
      else setDownvotes((prev) => prev - 1);
    } else {
      if (userVote) {
        if (userVote === "up") setUpvotes((prev) => prev - 1);
        else setDownvotes((prev) => prev - 1);
      }
      setUserVote(type);
      if (type === "up") setUpvotes((prev) => prev + 1);
      else setDownvotes((prev) => prev + 1);
    }
    onVote(type);
  };

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote("up")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          userVote === "up"
            ? "bg-green-500/20 text-green-500"
            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        <ThumbsUp className="w-5 h-5" />
        <span>{upvotes}</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote("down")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          userVote === "down"
            ? "bg-red-500/20 text-red-500"
            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        <ThumbsDown className="w-5 h-5" />
        <span>{downvotes}</span>
      </motion.button>
    </div>
  );
}
