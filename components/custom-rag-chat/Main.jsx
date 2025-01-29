import React, { useState, useEffect } from "react";
import "./Main.css";
import Image from "next/image";
import userIcon from "../../public/icons/user_icon.png";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import runChat from "./config/gemini";

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

  const [voiceData, setVoiceData] = useState("");
  const onSent = async () => {
    if (!input.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", message: input }]);
    setInput("");
    setIsTyping(true);

    try {
      // https://fastapi-app-855220130399.us-central1.run.app
      // http://127.0.0.1:8000/api/query
      const response = await fetch(
        "https://fastapi-app-855220130399.us-central1.run.app/api/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: input }),
        }
      );

      const data = await response.json();

      // Typing effect for the assistant's response
      let typingMessage = "";
      const interval = setInterval(() => {
        const nextChar = data.answer[typingMessage.length];
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
      }, 50);
      setChatHistory((prev) => [...prev, { sender: "assistant", message: "" }]);
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

  // const listenTranscript = (data) => {
  //   setInput((prevInput) => `${prevInput} ${data}`);
  // };

  const listenTranscript = async (data) => {
    // console.log("Voice input:", data);

    const prompt = `
      The following text is a raw voice transcription:
      "${data}"
      Please convert this input into a meaningful, grammatically correct sentence.
      If the transcription is incomplete or unclear, complete it to the best of your ability, ensuring it remains contextually appropriate.
    `;

    try {
      const processedResponse = await runChat(prompt); // Call Gemini function
      console.log("Processed response:", processedResponse);

      setInput(processedResponse); // Update the input box with processed text
    } catch (error) {
      console.error("Error processing voice input with Gemini:", error);
    }
  };

  const handleMinimizeClick = () => {
    props.closeClick();
  };

  return (
    <div className="main">
      {/* Chat Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="chat-header"
      >
        <h3 style={{ marginLeft: "4%" }}>Hi, Russel !</h3>

        <div style={{ display: "inline-flex" }}>
          <span
            onClick={handleMinimizeClick}
            style={{ width: "2px", cursor: "pointer", marginRight: "4%" }}
          >
            -
          </span>

          <span
            onClick={handleMinimizeClick}
            style={{ width: "2px", cursor: "pointer", marginLeft: "20px" }}
          >
            x
          </span>
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
              <p>{chat.message}</p>
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
          <input
            id="msgInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
          />
          <button onClick={onSent}>
            <Image
              src={"/icons/send_icon.png"}
              alt={`sender icon`}
              width={40}
              height={40}
              className="chat-icon1"
            />
          </button>
          <SpeechRecognitionComponent
            sendTranscript={(d) => listenTranscript(d)}
          />
          <button onClick={onSent}>
            <Image
              src={"/icons/attach.png"}
              alt={`sender icon`}
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>

      <p className="bottom-info">
        Lloyds Bank plc is a major British retail and commercial bank with a
        significant presence across England and Wales. It has traditionally been
        regarded one of the "Big Four" clearing banks{" "}
      </p>
    </div>
  );
};

export default Main;
