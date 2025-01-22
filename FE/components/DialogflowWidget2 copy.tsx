"use client"; // Required for useEffect

import { useEffect } from "react";

const DialogflowWidget2 = (props: any) => {
  useEffect(() => {
    // Prevent script and stylesheet from being added multiple times
    if (
      !document.querySelector(
        'script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]'
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href =
        "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
      document.head.appendChild(styleLink);
    }

    const dfMessenger = document.querySelector("df-messenger");
    if (dfMessenger) {
      dfMessenger.addEventListener("df-request-sent", (event: any) => {
        event.detail.queryParams = {
          payload: {
            userName: props.userName, // Pass the logged-in user's name
          },
        };
      });
    }
  }, [props.userName]);

  return (
    <>
      <df-messenger
        intent="WELCOME"
        chat-title={`EVA - Welcome ${props.userName}`}
        agent-id="2ca2e3c7-9f13-4a05-97c0-6b38f6134666"
        language-code="en"
      ></df-messenger>
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

export default DialogflowWidget2;
