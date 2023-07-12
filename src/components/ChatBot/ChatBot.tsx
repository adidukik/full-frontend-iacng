import { useState, useEffect, useRef } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './ChatBot.css';
import { sendMessage } from '../../utils/chatMessages'; // Assuming sendMessage function is properly exported

interface ChatLogType {
    sender: string;
    message: string;
}

const ChatBot = () => {
    const [userMessage, setUserMessage] = useState<string>("");
    const [chatLog, setChatLog] = useState<Array<ChatLogType>>([]);
    const [isBotResponding, setIsBotResponding] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMessage(event.target.value);
    };

    const handleSendMessage = (sender: string, message: string) => {
        if (message.trim() !== "") {
            setChatLog(chatLog => [...chatLog, {sender: sender, message: message}]);
            setUserMessage("");
        }
    };

    const sendBotResponse = () => {
        sendMessage(); // This should probably be done differently if sendMessage is asynchronous
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
                        sendBotResponse();
                    }
                }} className="chat-button"/>
            </div>
        </div>
    );
};

export default ChatBot;
