import React, { useState } from "react";

const MVPSelectBox = ({ participants, onVoteMVP, isVoting }) => {
  const [selectedCandidate, setSelectedCandidate] = useState("");

  return (
    <div className="flex items-center gap-3">
      <select
        value={selectedCandidate}
        onChange={(e) => setSelectedCandidate(e.target.value)}
        className="flex-1 bg-dark-primary text-gray-200 rounded-lg px-4 py-2 border border-dark-accent focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">MVPを選択</option>
        {participants.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <button
        onClick={() => onVoteMVP(selectedCandidate)}
        disabled={!selectedCandidate || isVoting}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isVoting ? "投票中..." : "MVP投票"}
      </button>
    </div>
  );
};

export default MVPSelectBox;
