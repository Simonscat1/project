import Profile from "../../Pages/Profile/Profile";
import Notification from "../../Images/Notification.svg"
import Discord from "../../Images/DiscordAvatars.jpg"
import { useEffect, useState } from "react";
import socket from "../../socket.js";
import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = ({ user }) => {
    const Logout = async () => {
        window.open(`${process.env.REACT_APP_REDIRECT}/auth/logout`, "_self")
        
    }
    const [notification, setNotification] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const post_nothings = () => {
            if(user !== undefined ){
                socket?.emit('post_nothings', user.userID)
            }
        }
        const getNothings = () => {
            if(user !== undefined ){
                socket?.on('getNothings', (data) => {
                    setNotification(data)
                })
            }
        },
        iterval = setInterval(() => {
            post_nothings()
            getNothings()
        },1000)
        return () => {
            clearInterval(iterval)
        }
    })
    
    function GetUser(props){
        const isGetUser = props.isGetUser

        const addUserFrinds = async (event) => {
            socket.emit("reqAddFriend", {idAddUser: event.target.value, id: isGetUser._id})
        }
        const removeUserFrinds = async (event) => {
            socket.emit("removeAddUser", {idAddUser: event.target.value, id: isGetUser._id})
        }
        const displayNotification = ({ id, userNames, avatars }) => {
            if(avatars === undefined){
                return (
                    <div key={id}>
                        <img className="avatars" src={Discord}  alt="" />
                        <span className="notification">{userNames}</span> 
                        <div className="Buttons">
                            <button className="nButton" type="button" value={id} onClick={addUserFrinds}>Добавить</button>
                            <button className="nButton" type="button" value={id} onClick={removeUserFrinds}>Отказать</button>
                        </div>
                    </div>
                )
            }
            return(
                <div key={id}>
                    <img className="avatars" src={avatars}  alt="" />
                    <span className="notification">{userNames}</span> 
                    <div className="Buttons">
                        <button className="nButton" type="button" value={id} onClick={addUserFrinds}>Добавить</button>
                        <button className="nButton" type="button" value={id} onClick={removeUserFrinds}>Отказать</button>
                    </div>
                </div>
            )
        }
        if(isGetUser === undefined){
            return( 
                <ul className="list">
                    <li className="listItem">
                        <Link className="link" to="login">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }else {
            return (
                <ul className="list">
                    <li className="listItem">
                        <div className="wq">
                            <div className="icons">
                                <div className="icon" onClick={() => setOpen(!open)}>
                                    <img src={Notification} className="iconImg" alt="" />
                                    {notification?.length > 0 && <div className="counter">{notification?.length}</div>}
                                </div>
                            
                            {open && (
                                <div className="notifications">
                                        {notification?.map(n => displayNotification(n))}
                                </div>

                            )}
                            </div>
                        </div>
                    </li>
                    <li className="listItem">
                        {isGetUser.avatar === null ? (
                            <img 
                                src={Discord}
                                alt=""
                                className="avatars"
                            />
                        ):(
                            <img 
                                src={isGetUser.avatar}
                                alt=""
                                className="avatars"
                            />
                        )}
                    </li>
                    <li className="listItem">
                        {Array(isGetUser).map(user =>(
                            <Profile key={user} user={user} />
                        ))}
                    </li>
                    <li className="listItem" onClick={Logout}>
                        Logout
                    </li>
                 </ul>

            )
        }
    }
    return(
        <div className="navbar">
            <span className="logo">
                <Link className="link" to="/">
                    Twitch Revels
                </Link>
            </span>
            <GetUser isGetUser={user}/>
        </div>
    )
}

export default Navbar;