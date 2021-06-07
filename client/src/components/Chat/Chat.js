import React,{useState,useEffect} from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar.js';
import Input from "../Input/Input.js";
import Messages from "../Messages/Messages.js";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./Chat.css";

let socket;

const Chat = ({location}) => {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const [usersInRoom,setUsersInRoom]=useState([]);

    const ENDPOINT='localhost:5000';

    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);

        socket=io(ENDPOINT);

        setName(name);
        setRoom(room);
        
        socket.emit('join',{name,room},()=>{
        
        });
        socket.on('roomData',roomData=>{setUsersInRoom(roomData.users)});
        return () => {
            socket.emit('disconect');
            socket.off();
        }
    },[ENDPOINT,location.search]);

    useEffect(() => {
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        });
        socket.on('roomData',roomData=>{setUsersInRoom(roomData.users)});
    },[messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        
        if(message){
            socket.emit('sendMessage',message, () => setMessage(''));
            console.log(message);
        }
    }

    return(
        <div className="outerContainer">
            <div className="sideBar">
                <div className="title">&ensp;&ensp;{name}</div>
                <div>
                    <ul className="userlist">
                        <li style={{listStyle:"none",position:"absolute",left:"4px"}}><GroupAddIcon/></li>
                        {usersInRoom.map((user,i)=>{
                            return (<li className="roomUser" key={i}>{user.name}</li>)
                        })}
                    </ul>
                </div>
            </div>
            <div className="container">
                <InfoBar room={room}/>
                
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}
export default Chat;