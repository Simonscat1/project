import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ModalRegGrope from "../../Pages/ModalRegGrope/ModalRegGrope.jsx"
import Avatars from "../../Images/DiscordAvatars.jpg"
import socket from "../../socket.js";
import axios from "axios"
import "./profile.css"

const Profile = ({ user }) => {
     const [users_gets, setUserGets] = useState(null)
     const [visible, setVisible] = useState(false);
     const [modal, setModal] = useState(false)

     const location = useLocation();
     const path = location.pathname.split("/")[1];
     useEffect(() => {
          const getUsers = async () => {
               const res = await axios.get(`/auth?userid=${path}`)
               setUserGets(res.data)
          }
          getUsers()
     },[path]);

     const sendMessage = () => {
          if(path === user.userID){
               socket.emit("edit_profile", {id: path, socketID: socket.id})
          }else{
               socket.emit('add_friend', {id: path, userAddidDb: user._id, socketID: socket.id})
          }
     }

     const Toggle = () => setModal(!modal);


     const GetUser = () => {
          const profile = (
               <div className="">
                    <div className="">
                         <img 
                              className=""
                              src={
                                   users_gets.discord.avatar
                                   ? users_gets.discord.avatar
                                   : Avatars
                              }
                              alt=""
                         />
                    </div>
                    <div className="">
                         <h4 className="">{users_gets.discord.userName}</h4>
                         <span className="">{users_gets.user.desc}</span>
                    </div>
               </div>
          )
          if(users_gets.user.ID === user.userID){
               return(
                    <>
                         {profile}
                         <button className="" onClick={sendMessage}>Редактирование профеля</button>
                    </>
               )
          }else{
               const getFriend = users_gets.user.friends
               const getRequest = users_gets.user.request
               if(String(getFriend.map(user => user.userID)) !== ""){
                    return(
                         <>
                              {profile}
                              <button className="">уже в друзьях</button>
                              <button onClick={() => setVisible(!visible)}>{visible ? "..." : "..."}</button>
                              {visible && 
                              <div>
                                   <ModalRegGrope show={modal} close={Toggle} user={user} getsusers={users_gets.discord}/>
                                   <ul>
                                        <li>
                                             <button onClick={() => Toggle()}>Добавить в группу</button>
                                        </li>
                                   </ul>
                              </div>
                              }
                         </>
                    )
               }
               if(String(getRequest.map(user => user.userID)) !== ""){
                    return(
                         <>
                              {profile}
                              <button className="">Заявка уже отправленна</button>
                         </>
                    )
               }
               return(
                    <>
                         {profile}
                         <button onClick={sendMessage}>Добавть в друзья</button>
                    </>
               )
          }
     }
     if(users_gets === null){
          return(
               <div className="">Загруза ...</div>
          )
     }
     return(
          <div className="">
               <GetUser />
          </div>
     )
}

export default Profile;