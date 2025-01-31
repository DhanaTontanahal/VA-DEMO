import React, { useState } from "react";
import Image from "next/image";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import PDFUploader from "./PDFUploader";

const ChatInput = ({ input, setInput, handleSend }) => {
  const [showModal, setShowModal] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <SpeechRecognitionComponent sendTranscript={(d) => setInput(d)} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How can I help you today?"
      />

      <button
        style={{ position: "absolute", left: "320px" }}
        onClick={() => setShowModal(true)}
      >
        <Image
          src={"/icons/attch-icon.png"}
          alt="attach"
          width={40}
          height={40}
        />
      </button>

      <button onClick={handleSend}>
        <Image src={"/icons/send_icon.png"} alt="send" width={40} height={40} />
      </button>

      {showModal && <PDFUploader onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ChatInput;
