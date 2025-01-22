"use client"; // Required for useEffect

import { useEffect } from "react";

const DialogflowWidget = () => {
  useEffect(() => {
    // Prevent script and stylesheet from being added multiple times
    if (
      !document.querySelector(
        'script[src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
      script.async = true;
      document.body.appendChild(script);

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href =
        "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
      document.head.appendChild(styleLink);
    }
  }, []);

  return (
    <>
      <df-messenger
        project-id="even-blueprint-444004-m8"
        agent-id="b9670a82-ec97-43a5-aa60-0e9a22623a7f"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="Virtual Assistant"></df-messenger-chat-bubble>
      </df-messenger>
      <style jsx>{`
        df-messenger {
          z-index: 999;
          --df-messenger-font-color: #000;
          --df-messenger-font-family: Google Sans;
          --df-messenger-chat-background: #f3f6fc;
          --df-messenger-message-user-background: #d3e3fd;
          --df-messenger-message-bot-background: #fff;
        }

        /* Optional: Adjusting the size of the chat bubble or popup */
        df-messenger::part(chat-button) {
          width: 60px; /* Customize button size */
          height: 60px;
        }

        df-messenger::part(message-list) {
          width: 360px; /* Adjust popup width */
        }

        /* Adjust the height of the expanded chat popup */
        df-messenger::part(messages) {
          max-height: 300px; /* Adjust the height of the message area */
          overflow-y: auto; /* Enable scrolling if messages exceed the height */
        }

        /* Adjust font size inside the messenger */
        df-messenger::part(message) {
          font-size: 14px; /* Customize message font size */
        }

        df-messenger::part(user-message) {
          font-size: 14px; /* Customize user message font size */
        }

        /* Adjust chat input field font size */
        df-messenger::part(input-box) {
          font-size: 14px; /* Customize input field font size */
        }
      `}</style>
    </>
  );
};

export default DialogflowWidget;
