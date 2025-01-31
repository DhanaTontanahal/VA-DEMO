import React from "react";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header">
      <h3>Hi, Russel!</h3>
      <div style={{ display: "flex" }}>
        <div onClick={onClose} className="close-icon">
          x
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
