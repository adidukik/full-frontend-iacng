import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './ChatBot.css';
import { sendMessage } from '../../utils/chatMessages'; // Assuming sendMessage function is properly exported
const ChatBot = () => {
    const [userMessage, setUserMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [isBotResponding, setIsBotResponding] = useState(false);
    const messagesEndRef = useRef(null);
    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };
    const handleSendMessage = (sender, message) => {
        if (message.trim() !== "") {
            setChatLog(chatLog => [...chatLog, { sender: sender, message: message }]);
            setUserMessage("");
        }
    };
    const sendBotResponse = () => {
        sendMessage(); // This should probably be done differently if sendMessage is asynchronous
        setTimeout(() => {
            handleSendMessage("bot", "I am SkyNet");
            setIsBotResponding(false);
        }, 1500);
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [chatLog]);
    return (_jsxs("div", { className: "chat-container", children: [_jsxs("div", { className: "chat-content", children: [chatLog.map((chat, index) => (_jsx("div", { className: `chat-message ${chat.sender === 'user' ? 'right' : 'left'}`, children: _jsx("p", { children: chat.message }) }, index))), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "chat-input-area", children: [_jsx(Button, { icon: "pi-file-import", className: "chat-button" }), _jsx(InputTextarea, { value: userMessage, onChange: handleInputChange, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441", className: "chat-input", rows: 2 }), _jsx(Button, { label: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", onClick: () => {
                            if (!isBotResponding) {
                                handleSendMessage("user", userMessage);
                                setIsBotResponding(true);
                                sendBotResponse();
                            }
                        }, className: "chat-button" })] })] }));
};
export default ChatBot;
