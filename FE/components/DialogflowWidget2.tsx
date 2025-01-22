"use client";

import { useEffect } from "react";

const DialogflowWidget2 = (props: any) => {
  useEffect(() => {
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

    // Add event listener to inject userName into the payload
    const dfMessenger = document.querySelector("df-messenger");
    if (dfMessenger) {
      dfMessenger.addEventListener("df-request-sent", (event: any) => {
        console.log("Event fired");
        console.log(props.userName);
        // Modify queryParams to include userName
        event.detail.requestBody.queryParams = {
          payload: {
            userName: "Dhana", // Dynamically pass the userName
          },
        };
      });
    }

    const handleRequestSent = (event: any) => {
      console.log("Global df-request-sent event fired");
      console.log("Props userName:", props.userName);

      // Modify the payload
      if (event.detail && event.detail.requestBody) {
        event.detail.requestBody.queryParams = {
          payload: {
            userName: props.userName || "Guest",
          },
        };
        console.log("Modified requestBody:", event.detail.requestBody);
      }
    };

    // Add event listener to window
    window.addEventListener("df-request-sent", handleRequestSent);

    // Cleanup
    return () => {
      window.removeEventListener("df-request-sent", handleRequestSent);
    };
  }, [props.userName]);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title={`EVA - Welcome ${props.userName}`}
      agent-id="2ca2e3c7-9f13-4a05-97c0-6b38f6134666"
      language-code="en"
    ></df-messenger>
  );
};

export default DialogflowWidget2;
