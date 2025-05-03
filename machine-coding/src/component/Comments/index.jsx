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
    <div className="p-2 border rounded mt-2">
      <input
        type="text"
        placeholder="Add a comment..."
        className="p-2 border rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-1 px-3 rounded mt-2 hover:bg-blue-600 transition"
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
    <div className="p-2 mt-2 border rounded">
      <div className="p-2">
        <span>{text}</span>
        <button
          className="text-blue-500 text-sm ml-2 hover:underline"
          onClick={() => setShowReplyBox((prev) => !prev)}
        >
          Reply
        </button>
      </div>

      {showReplyBox && <CommentBox onSubmit={addReply} />}

      <div className="ml-4 pl-2 border-l mt-2">
        {replies.map((reply, idx) => (
          <Comment key={idx} text={reply} onReply={addReply} />
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
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      <CommentBox onSubmit={addComment} />
      <div className="mt-4 space-y-2">
        {comments.map((comment, index) => (
          <Comment key={index} text={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
