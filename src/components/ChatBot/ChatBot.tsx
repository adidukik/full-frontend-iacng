import React, { useState, useEffect, useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import './ChatBot.css';
import {sendMessage} from '../../utils/chatMessages'

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
            setChatLog(chatLog => [...chatLog, {sender: sender, message: message}]);
            setUserMessage("");
        }
    };

    const sendBotResponse = () => {
        sendMessage()
        setTimeout(
            ()=>{
                handleSendMessage("bot", "I am SkyNet");
                setIsBotResponding(false);
            }, 1500
        );
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [chatLog]);

    return (
        <div className="chat-container">
            <div className="chat-content">
                {chatLog.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.sender === 'user' ? 'right' : 'left'}`}>
                        <p>{chat.message}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <Button icon="pi-file-import" className="chat-button"/>
                <InputTextarea value={userMessage} onChange={handleInputChange} placeholder="Введите запрос" className="chat-input" rows={2}/>
                <Button label="Отправить" onClick={() => {
                    if (!isBotResponding) {
                        handleSendMessage("user", userMessage);
                        setIsBotResponding(true);
                        sendMessage(userMessage);
                    }
                }} className="chat-button"/>
            </div>
        </div>
    );
};

export default ChatBot;
