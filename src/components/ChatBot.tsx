import React, { useState, useEffect, useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import './ChatBot.css';

const ChatBot = () => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const messagesEndRef = useRef(null);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setChatLog([...chatLog, {sender: "user", message: message}]);
            setMessage("");
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

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
                <InputTextarea value={message} onChange={handleInputChange} placeholder="Введите запрос" className="chat-input" rows={2}/>
                <Button label="Отправить" onClick={handleSendMessage} className="chat-button"/>
            </div>
        </div>
    );
};

export default ChatBot;
