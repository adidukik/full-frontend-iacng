import { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./ChatBot.css";
import { sendMessage } from "../../utils/chatMessages";

const ChatBot = () => {
  const link = "http://192.168.0.57:8501/";
  return (
    <iframe
      src={link}
      height="450"
      style={{
        width: "100%",
        border: "none",
      }}
      className="ChatBot__iframe"
    ></iframe>
  );
};

export default ChatBot;
