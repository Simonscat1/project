import { useEffect, useState } from "react";
import Card from "../Card/Card";
import socket from "../../socket";
import "./home.css"


const Home = ({ posts }) => {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        socket?.on('getNothings', (data) => {
            setUser(data)
        })
    })

    const userGetsInfo = ({ userNames, avatars }) => {
        console.log(userNames, avatars)
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
        <div>
            {user?.friends?.map(users => userGetsInfo(users))}
            {posts?.map((post) => postes(post))}
        </div>
    )
}

export default Home;