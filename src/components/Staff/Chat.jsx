import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Socket server URL

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [teamNumber, setTeamNumber] = useState(1); // Change based on your team number
    const [userId, setUserId] = useState('67541417b0df510faf5b2b54'); // Set your user ID

    useEffect(() => {
        // Join the room when the component is mounted
        socket.emit('joinTeam', teamNumber);

        // Listen for incoming messages
        socket.on('newMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socket.on('error', (error) => {
            alert(error);
        });

        // Cleanup on unmount
        return () => {
            socket.off('newMessage');
            socket.off('error');
        };
    }, [teamNumber]);

    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', {
                userId,
                team_number: teamNumber,
                message
            });
            setMessage(''); // Clear input after sending
        }
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
