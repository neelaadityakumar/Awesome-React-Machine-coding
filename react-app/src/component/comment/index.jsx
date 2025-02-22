import React, { useState } from "react";

const CommentBox = ({ addComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addComment(text);
      setText("");
    }
  };

  return (
    <div className="p-2 border rounded mt-2">
      <input
        type="text"
        placeholder="Add text here"
        className="p-2 border rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-1 px-3 rounded mt-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const Comment = ({ text }) => {
  const [showInputBox, setShowInputBox] = useState(false);
  const [replies, setReplies] = useState([]);

  const addReply = (replyText) => {
    setReplies([...replies, replyText]);
    setShowInputBox(false);
  };

  return (
    <div className="p-2 border rounded mt-2">
      <div className="card p-2  rounded">
        <span className="text block">{text}</span>
        <span
          className="text-blue-500 cursor-pointer mt-1 inline-block"
          onClick={() => setShowInputBox(!showInputBox)}
        >
          Add Reply
        </span>
      </div>

      {showInputBox && <CommentBox addComment={addReply} />}

      <div className="pl-4 border-l mt-2">
        {replies.map((reply, index) => (
          <Comment key={index} text={reply} onReply={addReply} />
        ))}
      </div>
    </div>
  );
};

const CommentContainer = () => {
  const [comments, setComments] = useState([]);

  const addComment = (commentText) => {
    setComments([...comments, commentText]);
  };

  return (
    <div className="p-4">
      <CommentBox addComment={addComment} />

      <div className="mt-4">
        {comments.map((comment, index) => (
          <Comment key={index} text={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
