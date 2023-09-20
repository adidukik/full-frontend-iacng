import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";

const ChatBot = () => {
  const chatBotLink = "http://192.168.0.60:8501/";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  const fullScreenStyles = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000, // Adjust the z-index as needed
  };

  const normalStyles = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  const chatBotStyles = isFullscreen ? fullScreenStyles : normalStyles;

  return (
    <div
      style={{
        ...chatBotStyles,
      }}
    >
      {isFullscreen && (
        <Button
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            borderRadius: "10px",
            background: "none",
             border: "none",
              display: "flex",
             marginRight: "10px",
            zIndex: 1001, // Ensure the button is above the iframe in fullscreen mode
          }}
          onClick={() => {
            setIsFullscreen(false);
          }}
        >
         ⤢ <div style={{marginLeft: "10px"}}>MoonAI</div>
        </Button>
      )}
      {!isFullscreen && (
        <Button
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            borderRadius: "10px",
            background: "none",
            border: "none",
            marginRight: "10px",
            display: "flex",
            zIndex: 1001, // Ensure the button is above the iframe in normal mode
          }}
          onClick={() => {
            setIsFullscreen(true);
          }}
        >
          ⤢ <div style={{marginLeft: "10px"}}>MoonAI</div>
        </Button>
      )}
      
      <iframe
        src={chatBotLink}
        height="450"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        className="ChatBot__iframe"
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

export default ChatBot;