import React from 'react'
import "./InfoBar.css";
import TelegramIcon from '@material-ui/icons/Telegram';
import CloseIcon from '@material-ui/icons/Close';


export default function InfoBar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <TelegramIcon/>&ensp;&ensp;
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <CloseIcon style={{color:"white"}}/>
                </a>
            </div>
        </div>
    )
}
