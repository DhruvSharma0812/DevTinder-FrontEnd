import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";


const Chat = () => {
    const {targetUserId} = useParams();
    const [messages, setmessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    const user = useSelector (store => store.user);
    const userId = user?._id;

    useEffect (() => {
        if (!userId) return;

        const socket = createSocketConnection ();
        socket.emit ("joinChat", {firstName : user.firstName, userId, targetUserId});

        socket.on ("messageRecieved", ({firstName, lastName, text}) => {
            console.log (firstName + " " + lastName + " : " + text);
            setmessages ((messages) => [...messages, {firstName, lastName, text}]);
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection ();
        socket.emit ("sendMessage", {
            firstName : user.firstName,
            lastName : user.lastName,
            userId,
            targetUserId,
            text : newMessage,
        });

        setnewMessage ("");
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-400 text-white">
                Chat
            </h1>

            <div className="flex-1 overflow-scroll p-5">
                {/* display messages */}
                {messages.map((msg, index) => {
                    return (
                        <div 
                        key={index}
                        className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}

                        >
                            <div className="chat-header">
                                {`${msg.firstName} ${msg.lastName}`} 
                            </div>
                            <div className="chat-bubble"> {msg.text} </div>
                        </div>
                    )
                })}
            </div>  

            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input 
                    value={newMessage} 
                    onChange={(e) => setnewMessage (e.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2">    
                </input>
                <button onClick={sendMessage} className="btn btn-secondary">
                    Send
                </button>
            </div>            
        </div>
    )
}

export default Chat
