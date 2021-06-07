import React from 'react'
import "./Input.css";

export default function Input({message,setMessage,sendMessage}) {
    return (
        <form className="form">
            <input value={message} onChange={(event)=>setMessage(event.target.value)}
                onKeyPress={event=>event.key==='Enter'?sendMessage(event):null}
                className="input" placeholder="type a message..."
                />
            <button type="submit" className="sendButton" onClick={e=>sendMessage(e)}>SEND</button>
        </form>
    )
}
