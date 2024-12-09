import { useEffect, useState } from 'react';


function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [teamNumber, setTeamNumber] = useState(1); // Change based on your team number
    const [userId, setUserId] = useState('67541417b0df510faf5b2b54'); // Set your user ID

    useEffect(() => {
        // Join the room when the component is mounted
        
    }, [teamNumber]);

    const handleSendMessage = () => {
        
    };

    return (
        <div>
            <div>
                <h2>Team {teamNumber} Chat</h2>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user_id}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatComponent;
