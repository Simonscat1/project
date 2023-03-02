import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Avatars from "../../Images/DiscordAvatars.jpg"
import socket from "../../socket.js";
import axios from "axios"
import "./profile.css"
//создать увед по добавлению в друзья
//создать админ палель и там же сделать редактирование сетки + создание постов
const Profile = ({ user }) => {
     const [users_gets, setUserGets] = useState(null)
     const [lastPong, setLastPong] = useState(null);
     const location = useLocation();
     const path = location.pathname.split("/")[1];
     useEffect(() => {
          const getUsers = async () => {
               const res = await axios.get(`/auth?userid=${path}`)
               setUserGets(res.data)
          }
          getUsers()
     },[path]);
     useEffect(() => {
          const q1 = () => {
               socket.emit(`post_nothings`,{id: user.userID});
               socket.on('nothings', (data) => {
                    setLastPong(data)
               })
          },
          iterval = setInterval(() => {
               q1()
          },10 * 1000)
          return () => {
               clearInterval(iterval)
          }
     })
     const sendMessage = () => {
          if(path === user.userID){
               socket.emit("edit_profile", {id: path})
          }else{
               socket.emit('add_friend', {id: path, userAddidDb: user._id})
          }
          
     }

     if((users_gets === null) && ((lastPong === null))){
          return(
               <div>Загруза ...</div>
          )
     }
     console.log(lastPong)
     return(
          <div>
               {users_gets.user.ID === user.userID ?(
                    <div>
                         <div>
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
                         <div>
                              <h4 className="">{users_gets.discord.userName}</h4>
                              <span className="">{users_gets.user.desc}</span>
                              <button onClick={sendMessage}>Редактирование профеля</button>
                         </div>
                         <div>
                              {}
                         </div>
                    </div>
               ):(
                    <div>
                         <div>
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
                         <div>     
                              <h4 className="">{users_gets.discord.userName}</h4>
                              <span className="">{users_gets.user.desc}</span>
                              <button onClick={sendMessage}>Добавть в друзья</button>
                         </div>
                    </div>
               )}
          </div>
     )
}

export default Profile;