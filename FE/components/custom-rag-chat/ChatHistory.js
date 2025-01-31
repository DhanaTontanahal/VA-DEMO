import React from "react";
import Image from "next/image";
import ChatResponse from "./ChatResponse";
import userIcon from "../../public/icons/user_icon.png";

const ChatHistory = ({
  chatHistory,
  isTyping,
  openImageModal,
  handleApplyClick,
}) => {
  return (
    <div className="chat-history">
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`chat-message ${
            chat.sender === "user" ? "user-message" : "assistant-message"
          }`}
        >
          <Image
            width={40}
            height={40}
            src={
              chat.sender === "user"
                ? userIcon
                : "/icons/lloyds_response_icon.png"
            }
            alt={`${chat.sender} icon`}
            className="chat-icon1"
          />
          <ChatResponse message={chat.message} videoLink={chat.videoLink} />

          {chat.images && (
            <div className="image-container">
              {chat.images.map((img, idx) => (
                <div key={idx} className="card-container">
                  <Image
                    src={img}
                    alt="Credit Card"
                    width={150}
                    height={150}
                    className="chat-image"
                    onClick={() => openImageModal(img)}
                  />
                  <button
                    className="apply-button"
                    onClick={() => handleApplyClick(img)}
                  >
                    Apply ?
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="chat-message assistant-message">
          <Image
            width={40}
            height={40}
            src={"/icons/lloyds_response_icon.png"}
            alt="Assistant Typing"
            className="chat-icon"
          />
          <p>...</p>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
