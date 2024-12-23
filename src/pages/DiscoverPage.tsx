import { useState } from "react";
import { motion } from "framer-motion";
import IdeaGrid from "../components/discover/IdeaGrid";
import Pagination from "../components/discover/Pagination";
import { mockIdeas } from "../data/mock-ideas";

const ITEMS_PER_PAGE = 2;

export default function DiscoverPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate pagination with mock data
  const totalPages = Math.ceil(mockIdeas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedIdeas = mockIdeas.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container lg:max-w-7xl mx-auto px-4 pt-24 pb-12"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Discover Ideas</h1>
        <p className="text-gray-400">
          Explore innovative ideas from creative minds around the world
        </p>
      </div>

      <IdeaGrid ideas={paginatedIdeas} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </motion.div>
  );
}
