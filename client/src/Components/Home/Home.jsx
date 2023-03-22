import { useEffect, useState } from "react";
import Card from "../Card/Card";
import FriendList from "../../Pages/FrindList/FriendList"
import socket from "../../socket";
import "./home.css"

//создать топ по elo соло
//создать топ команд по elo
const Home = ({ posts }) => {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        socket?.on('getNothings', (data) => {
            setUser(data)
        })
    })

    const friendsGets = (users) => {
        return(
            <div className="" key={users._id}>
                <ul>
                    <FriendList friend={users} />
                </ul>
            </div>
        )
    }
    const postes = (post) => {
        return(
            <div className="" key={post._id}>
                <ul className="">
                    <Card posts={post} />
                </ul>
            </div>
        )
    }
    return(
        <div className="Home">
            {user?.friends?.map(users => friendsGets(users))}
            {/* тут сделать динамический слайдер */}
            {posts?.map((post) => postes(post))}
        </div>
    )
}

export default Home;