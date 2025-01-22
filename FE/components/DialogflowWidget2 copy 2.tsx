"use client";

import { useEffect } from "react";

const DialogflowWidget2 = (props: any) => {
  useEffect(() => {
    // Add the Dialogflow script and stylesheet
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

    // Attach the df-request-sent event listener
    const dfMessenger = document.querySelector("df-messenger");
    if (dfMessenger) {
      dfMessenger.addEventListener("df-request-sent", (event: any) => {
        event.detail.requestBody.queryParams = {
          payload: {
            userName: props.userName, // Dynamically pass the logged-in user's name
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

        df-messenger::part(chat-button) {
          width: 60px;
          height: 60px;
        }

        df-messenger::part(message-list) {
          width: 360px;
        }

        df-messenger::part(messages) {
          max-height: 300px;
          overflow-y: auto;
        }

        df-messenger::part(message),
        df-messenger::part(user-message),
        df-messenger::part(input-box) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default DialogflowWidget2;
