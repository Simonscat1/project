import Profile from "../../Pages/Profile/Profile";
import Notification from "../../Images/Notification.svg"
import Discord from "../../Images/DiscordAvatars.jpg"
import { useEffect, useState } from "react";
import socket from "../../socket.js";
import { Link } from "react-router-dom";
import "./navbar.css"
import AdminPanel from "../../Pages/AdminPanel/AdminPanel.jsx"
const admin = ["323827486750146561"]
//создать поиск по никнейму
//создать админ палель и там же сделать редактирование сетки + создание постов
const Navbar = ({ user }) => {
    const Logout = async () => {
        window.open(`${process.env.REACT_APP_REDIRECT}/auth/logout`, "_self")
        
    }
    const [notification, setNotification] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const post_nothings = () => {
            if(user !== undefined){
                socket.emit('post_nothings', user?.userID, socket.id)
            }
        },
        iterval = setInterval(() => {
            post_nothings()
        },1000)
        return () => {
            clearInterval(iterval)
        }
    })
    useEffect(() => {
        const getNothings = () => {
            if(user !== undefined ){
                socket?.on('getNothings', (data) => {
                    setNotification(data)
                })
            }
        },
        iterval = setInterval(() => {
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

        const addGroup = async (event) => {
            socket.emit("req_add_groupe", {group_add: event.target.value, id: isGetUser._id})
        }

        const removeGroup = async (event) => {
            socket.emit("req_remove_groupe", {group_add: event.target.value, id: isGetUser._id})
        }


        const displayNotification = ({ id, userNames, avatars }) => {
            const requseted = (
                <div className="">
                    <img className="avatars" src={Discord}  alt="" />
                    <span className="notification">{userNames}</span> 
                    <div className="Buttons">
                        <button className="nButton" type="button" value={id} onClick={addUserFrinds}>Добавить</button>
                        <button className="nButton" type="button" value={id} onClick={removeUserFrinds}>Отказать</button>
                    </div>
                </div>
            )
            if(avatars === undefined){
                return (
                    <div className="" key={id}>
                        {requseted}
                    </div>
                )
            }
            return(
                <div className="" key={id}>
                    {requseted}
                </div>
            )
        }
        const displayNotification1 = ({ id, userNames, avatars }) => {
            const requseted = (
                <div className="">
                    <img className="avatars" src={Discord}  alt="" />
                    <span className="notification">{userNames}</span> 
                    <div className="Buttons">
                        <button className="nButton" type="button" value={id} onClick={addGroup}>Добавить</button>
                        <button className="nButton" type="button" value={id} onClick={removeGroup}>Отказать</button>
                    </div>
                </div>
            )
            if(avatars === undefined){
                return (
                    <div className="" key={id}>
                        {requseted}
                    </div>
                )
            }
            return(
                <div className="" key={id}>
                    {requseted}
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
        } else {
            return (
                <ul className="list">
                    <li className="listItem">
                        <div className="wq">
                            <div className="icons">
                                <div className="icon" onClick={() => setOpen(!open)}>
                                    <img src={Notification} className="iconImg" alt="" />
                                    {(notification?.request?.length || notification?.request_groupe?.length) > 0 && <div className="counter">{(notification?.request?.length + notification?.request_groupe?.length)}</div>}
                                </div>
                            
                            {open && (
                                <div className="notifications">
                                    <div className="div-table">
                                        <div className="div-table-row">
                                            <p>Заявки в друзья</p>
                                            {notification?.request?.map(n => displayNotification(n))}
                                        </div>
                                        <div className="div-table-row">
                                            <p>Заявки в группу</p>
                                            {notification?.request_groupe.map(n =>displayNotification1(n))}
                                        </div>
                                    </div>
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
                    <li className="listItem">
                        <Link className="link" to="groups">
                            Группы
                        </Link>
                    </li>
                    {admin.find(users => users === isGetUser.userID) ?(
                        <li className="listItem">
                            <AdminPanel key="админ палель" user={isGetUser} />
                        </li>
                    ):(
                        <></>
                    )}
                    <li className="listItem" onClick={Logout}>
                        Logout
                    </li>
                 </ul>

            )
        }
    }
    return(
        <div className="navbar">
            <ul className="list">
                <span className="site-title">
                    <Link className="link" to="/">
                        <h1>Twitch Revels</h1>
                    </Link>
                </span>
                <li className="listItem">
                    <Link className="button" to="/">
                        Главная
                        <span className="button-underline"></span>
                    </Link>
                </li>
                <li className="listItem">
                    <Link className="button" to="groups">
                        Группы
                        <span className="button-underline"></span>
                    </Link>
                </li>
            </ul>
            <GetUser isGetUser={user}/>
        </div>
    )
}

export default Navbar;