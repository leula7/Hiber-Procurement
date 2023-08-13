import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "./chat.css";
import { messages, sendMessage, users } from '../../api/chat';
import { useSelector } from 'react-redux';


const Chat = () => {
  const { authData } = useSelector((state) => state.authReducer);
  const [allUser,Setusers] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [id, setId] = useState(0);
  const [message,setMessage] = useState({
    message: "",
    sender: "",
    reciever: ""
  });
  let i = 23;

  //Get USers
  useEffect (()=>{
      const getuser = async()=>{
      const user = await users(authData.position);
      Setusers(user.data.result);
    }
    getuser();
  },[]);

  useEffect(()=>{
    const select = async()=>{
      const sender = authData.user_id;
      const chat =await messages(sender,id);
      setActiveChat(chat.data.result);
    }
    select();
  },[activeChat]);

  const handleChatSelect = async(user_id) => {
      const sender = authData.user_id;
      const reciever = user_id;
      const chat =await messages(sender,reciever);
      setActiveChat(chat.data.result);
    };

  const SendMessages = async()=>{
    console.log(authData)
    if(message.message !==""){
        const sendMess = await sendMessage(message);

    }else{
       alert("Write a Message");
    }
  }

  return (
    <>
    <Header />
    <div className="container">
         <div className="chat-list">
            {allUser.map((user,index) => (
            <div className={`chat-row ${activeChat && activeChat.user_id === user.user_id ? 'active' : ''}`}
                key={user.user_id+i}
                onClick={() =>{
                  setMessage({...message, reciever: user.user_id,sender: authData.user_id})
                  setId(user.user_id)
                  handleChatSelect(user.user_id)}}>
                <img src='' alt={`${user.username} avatar`} className="profile-image" />
                <div className="chat-info">
                <div className="username">{user.username}</div>
                <div className="last-message">{user.last_massage}</div>
                </div>
                <div className="time">{user.time}</div>
            </div>
            ))}
        </div>
       <div className="message-container">
       {activeChat && (
            <div className="message-box">
                <div className="profile">
                    <img src='doc.png' alt={`${activeChat.reciever} avatar`} className="profile-image" />
                    <div className="chat-info">
                    <div className="username">{activeChat.user_id}</div>
                    </div>
                </div>
            <div className="messages">
            {activeChat.map((message) => (
                <div className='single-message' style={{
                  flexDirection: authData.user_id !== message.reciever ? "row" : "row-reverse"}}>
                    <div  className='msg' 
                          style={{alignItems: authData.user_id !== message.reciever ? "flex-start" : "flex-end",
                              background: authData.user_id !== message.reciever ? "#2c5279" : "#182633"}}>
                        <p className='times' style={{textAlign: authData.user_id !== message.reciever ? "start" : "end",
                        }}>{message.time}</p>
                        <p>{message.message}</p>
                    </div>
                </div>
            ))}

            </div>
            <div className="send">
              <input  type='text' 
                      onChange={(event) => setMessage({...message, message: event.target.value})}
                      placeholder='Write a message...'/>
            <button onClick={SendMessages}>Send</button>
            </div>
            </div>
        )}
       </div>
    </div>

    <Footer/>
    </>
  );
};

export default Chat;
