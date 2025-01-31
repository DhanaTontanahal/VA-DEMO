import React, { useState, useEffect } from "react";
import "./Main.css";
import Image from "next/image";
import userIcon from "../../public/icons/user_icon.png";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import runChat from "./config/gemini";
import PDFUploader from "./PDFUploader";
import ChatResponse from "./ChatResponse";

const Main = (props) => {
  useEffect(() => {}, []);

  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "assistant",
      message:
        "Hello, I’m your Virtual Assistant. How can I help you today? You can ask me about credit cards, application process, eligibility, and more!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null); // State for modal image

  const onSent = async (customInput = null) => {
    const query = customInput || input; // Use predefined message if available
    //if (!input.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: input, images: [], videoLink: "" }, // Include images array
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://fastapi-app2-855220130399.us-central1.run.app/api/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query }),
        }
      );

      const data = await response.json();

      if (data.images && data.images.length > 0) {
        // If images exist, add them to chat history
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "assistant",
            message: data.answer, // Ensure correct field is used
            images: data.images, // Safely accessing images
            videoLink: data.videoLink || "", // Include video link if available
          },
        ]);
        setIsTyping(false);
      } else {
        // Handle text-only response
        let typingMessage = "";
        setChatHistory((prev) => [
          ...prev,
          {
            sender: "assistant",
            message: "", // Initially empty to simulate typing
            images: [], // No images
            videoLink: data.videoLink || "", // Include video link if available
          },
        ]);

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

      // if (data.images) {
      //   // If images exist, add them to chat history
      //   setChatHistory((prev) => [
      //     ...prev,
      //     {
      //       sender: "assistant",
      //       message: data.answer, // Update to use "answer"
      //       images: data?.images,
      //       videoLink: data?.videoLink || "", // Include video link in chat history
      //     },
      //   ]);
      //   setIsTyping(false);
      //   return;
      // }

      // let typingMessage = "";
      // const interval = setInterval(() => {
      //   const nextChar = data?.answer?.[typingMessage.length];
      //   if (nextChar) {
      //     typingMessage += nextChar;
      //     setChatHistory((prev) =>
      //       prev.map((item, idx) =>
      //         idx === prev.length - 1
      //           ? { ...item, message: typingMessage }
      //           : item
      //       )
      //     );
      //   } else {
      //     clearInterval(interval);
      //     setIsTyping(false);
      //   }
      // }, 10);

      // setChatHistory((prev) => [...prev, { sender: "assistant", message: "" }]);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  const listenTranscript = async (data) => {
    const prompt = `The following text is a raw voice transcription:
    "${data}"
    Please convert this input into a meaningful, grammatically correct sentence.
    If the transcription is incomplete or unclear, complete it to the best of your ability.`;

    try {
      const processedResponse = await runChat(prompt);
      setInput(processedResponse);
    } catch (error) {
      console.error("Error processing voice input:", error);
    }
  };

  const handleMinimizeClick = () => {
    props.closeClick();
  };

  const [showModal, setShowModal] = useState(false);

  const showPDFUploader = () => {
    setShowModal(true);
  };

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
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
      onSent(applicationQuery);
    }, 500);
  };
  return (
    <div className="main">
      {/* Chat Header */}
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="chat-header"
      >
        <h3>Hi, Russel !</h3>
        <div style={{ display: "flex" }}>
          {/* <div onClick={handleMinimizeClick} className="close-icon">
            -
          </div> */}
          <div onClick={handleMinimizeClick} className="close-icon">
            x
          </div>
        </div>
      </div>

      <div className="chat-container">
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

              {/* Image Display */}
              {chat.images && (
                <div className="image-container">
                  {chat.images.map((img, idx) => (
                    <div key={idx} className="card-container">
                      <Image
                        key={idx}
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

        <div className="chat-input">
          <SpeechRecognitionComponent
            sendTranscript={(d) => listenTranscript(d)}
          />
          <input
            id="msgInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="How can I help you today?"
          />

          <button
            style={{ position: "absolute", left: "320px" }}
            onClick={showPDFUploader}
          >
            <Image
              src={"/icons/attch-icon.png"}
              alt="attach"
              width={40}
              height={40}
            />
          </button>

          <button onClick={onSent}>
            <Image
              src={"/icons/send_icon.png"}
              alt="send"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>

      {showModal && <PDFUploader onClose={() => setShowModal(false)} />}

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content">
            <span className="close-button" onClick={closeImageModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Expanded View"
              className="modal-image"
            />
          </div>
        </div>
      )}

      <p className="bottom-info">
        Lloyds Bank plc is a major British retail and commercial bank with a
        significant presence across England and Wales. It has traditionally been
        regarded as one of the "Big Four" clearing banks.
      </p>
    </div>
  );
};

export default Main;
