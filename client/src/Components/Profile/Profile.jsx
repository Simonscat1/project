import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Avatars from "../../Images/DiscordAvatars.jpg"
import axios from "axios"
import "./profile.css"

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
    },[path])
    console.log(users_gets)
    if(users_gets === null){
        return(
            <div>Загруза ...</div>
        )
    }
    
    return(
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
            </div>
        </div>
    )
}

export default Profile;