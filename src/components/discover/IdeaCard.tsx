import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import { truncateText } from "../../utils/text";

interface IdeaCardProps {
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
}

export default function IdeaCard({
  title,
  description,
  image,
  author,
  date,
}: IdeaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-medium">{author.name}</p>
            <p className="text-sm text-gray-400">
              {formatDistanceToNow(date, { addSuffix: true })}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">
          {truncateText(description, 200)}
          {description.length > 200 && (
            <button className="text-purple-400 hover:text-purple-300 ml-1 inline-flex items-center gap-1">
              read more
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </p>
      </div>
    </motion.div>
  );
}
