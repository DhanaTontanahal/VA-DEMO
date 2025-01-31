import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import ImageModal from "./ImageModal";

const Main = (props) => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "assistant",
      message: "Hello, I’m your Virtual Assistant. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSend = async (customInput = null) => {
    const query = customInput || input;
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: input, images: [], videoLink: "" },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://fastapi-app1-855220130399.us-central1.run.app/api/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );

      const data = await response.json();
      const newMessage = {
        sender: "assistant",
        message: data.answer || "",
        images: data.images || [],
        videoLink: data.videoLink || "",
      };

      if (data.images?.length) {
        setChatHistory((prev) => [...prev, newMessage]);
      } else {
        let typingMessage = "";
        setChatHistory((prev) => [...prev, { ...newMessage, message: "" }]);

        const interval = setInterval(() => {
          const nextChar = data?.answer?.[typingMessage.length];
          if (nextChar) {
            typingMessage += nextChar;
            setChatHistory((prev) =>
              prev.map((item, idx) =>
                idx === prev.length - 1
                  ? { ...item, message: typingMessage }
                  : item
              )
            );
          } else {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, 10);
      }
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "An error occurred. Please try again.",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleApplyClick = (cardImage) => {
    const cardName = cardImage
      .split("/")
      .pop()
      .replace(".jpeg", "")
      .replace("_", " ");
    const applicationQuery = `I want to apply for ${cardName} credit card. What is the process?`;
    setInput(applicationQuery);
    setTimeout(() => {
      handleSend(applicationQuery);
    }, 500);
  };

  return (
    <div className="main">
      <ChatHeader onClose={props.closeClick} />
      <div className="chat-container">
        <ChatHistory
          chatHistory={chatHistory}
          isTyping={isTyping}
          openImageModal={setSelectedImage}
          handleApplyClick={handleApplyClick}
        />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
      <ImageModal
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Main;
