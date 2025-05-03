import React, { useState } from "react";

const CommentBox = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setText("");
    }
  };

  return (
    <div className="bg-gray-50 p-3 border border-gray-300 rounded-lg mt-2">
      <input
        type="text"
        placeholder="Add a comment..."
        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-200"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white py-1 px-3 rounded mt-2 hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const Comment = ({ text }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);

  const addReply = (replyText) => {
    setReplies((prev) => [...prev, replyText]);
    setShowReplyBox(false);
  };

  return (
    <div className="bg-white p-3 border border-gray-300 rounded-lg mt-3 shadow-sm">
      <div className="text-sm text-gray-800">{text}</div>
      <button
        className="text-blue-500 text-xs mt-1 hover:underline"
        onClick={() => setShowReplyBox((prev) => !prev)}
      >
        Reply
      </button>

      {showReplyBox && <CommentBox onSubmit={addReply} />}

      <div className="ml-4 border-gray-200 pl-4 mt-2">
        {replies.map((reply, idx) => (
          <Comment key={idx} text={reply} />
        ))}
      </div>
    </div>
  );
};

const CommentContainer = () => {
  const [comments, setComments] = useState([]);

  const addComment = (text) => {
    setComments((prev) => [...prev, text]);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <CommentBox onSubmit={addComment} />
      <div className="mt-4 space-y-3">
        {comments.map((comment, index) => (
          <Comment key={index} text={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
