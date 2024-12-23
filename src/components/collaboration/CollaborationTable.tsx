import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import ConfirmationModal from "../share/ConfirmationModal";
import { CollaborationRequest } from "../../types/collaboration";

const initialRequests: CollaborationRequest[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    },
    ideaName: "AI-Powered Education Platform",
    status: "pending",
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Michael Chen",
      username: "@mchen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    },
    ideaName: "Sustainable Energy Solution",
    status: "pending",
  },
];

export default function CollaborationTable() {
  const [requests, setRequests] =
    useState<CollaborationRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] =
    useState<CollaborationRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);

  const handleAction = (
    request: CollaborationRequest,
    actionType: "accept" | "reject"
  ) => {
    setSelectedRequest(request);
    setAction(actionType);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedRequest && action) {
      setRequests(requests.filter((req) => req.id !== selectedRequest.id));
      setIsModalOpen(false);
      setSelectedRequest(null);
      setAction(null);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                Idea Name
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {requests.map((request) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="border-b border-white/10"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {request.user.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {request.user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{request.ideaName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAction(request, "accept")}
                        className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction(request, "reject")}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        action={action}
        confirmSource="collaboration"
        username={selectedRequest?.user.name}
      />
    </div>
  );
}
