import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export default function CommentSection({
  comments,
  onAddComment,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
        />
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Comment
          </motion.button>
        </div>
      </form>

      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-white">
                    {comment.author.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(comment.date, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
