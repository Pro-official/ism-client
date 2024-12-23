import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import LoadingSpinner from "../components/share/LoadingSpinner";
import VoteButtons from "../components/idea/VoteButtons";
import CommentSection from "../components/idea/CommentSection";
import { mockIdeas } from "../data/mock-ideas";
import { Idea } from "../types/Idea";
import StatusBadge from "../components/idea/StatusBadge";

export default function IdeaPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchIdea = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const foundIdea = mockIdeas?.find((idea) => idea?.id === id);
        if (foundIdea) {
          setIdea(foundIdea);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!idea) return <div>Idea not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Discover
        </Link>

        <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
          <img
            src={idea.image}
            alt={idea.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={idea.author.avatar}
                  alt={idea.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-white">{idea.author.name}</h3>
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(idea.date, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge type="collaborate" />
                <StatusBadge type="evaluating" />
              </div>
              {/* <img
                src={idea.author.avatar}
                alt={idea.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-white">{idea.author.name}</h3>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(idea.date, { addSuffix: true })}
                </p>
              </div> */}
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{idea.title}</h1>
            <p className="text-gray-300 mb-8">{idea.description}</p>

            <div className="flex items-center gap-4">
              <VoteButtons
                initialUpvotes={150}
                initialDownvotes={12}
                onVote={(type) => console.log("Voted:", type)}
              />
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comments</span>
              </button>
            </div>
          </div>
        </div>

        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <CommentSection
              comments={[
                {
                  id: "1",
                  author: {
                    name: "Alex Thompson",
                    avatar:
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
                  },
                  content:
                    "This is a brilliant idea! I would love to see this implemented in my city.",
                  date: new Date("2024-02-15"),
                },
              ]}
              onAddComment={(content) => console.log("New comment:", content)}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
