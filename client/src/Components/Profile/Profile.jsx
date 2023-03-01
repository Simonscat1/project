import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Avatars from "../../Images/DiscordAvatars.jpg"
import axios from "axios"
import "./profile.css"
//разделить на 2 разых компонента 
//создать увед по добавлению в друзья
//создать админ палель и там же сделать редактирование сетки + создание постов
const Profile = ({ user }) => {
     const [users_gets, setUserGets] = useState(null) 
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
          const getsFrinds = async () => {

          }
          getsFrinds()
     },[path])
     if(users_gets === null){
          return(
               <div>Загруза ...</div>
          )
     }
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
                              <button>Редактирование профеля</button>
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
                              <button>Добавть в друзья</button>
                         </div>
                    </div>
               )}
          </div>
     )
}

export default Profile;