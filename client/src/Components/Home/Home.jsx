import Card from "../Card/Card";
import { useEffect, useState } from "react";
import "./home.css"
import socket from "../../socket";

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
    return(
        <div>
            {user?.friends?.map(users => userGetsInfo(users))}
            {posts.map((post) => (
                <Card key={post._id} posts={post} />
            ))}
        </div>
    )
}

export default Home;