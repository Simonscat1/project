import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import FriendList from "../../Pages/FrindList/FriendList"
import socket from "../../socket";
import "./home.css"

//создать топ по elo соло
//создать топ команд по elo
const Home = ({ posts }) => {
    const [ user, setUser ] = useState(null)
    const [wordData,setWordData] = useState(posts[0])
    
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
    const Slider = ({data}) => {
        return(
            <div>
                <h1>{data?.title}</h1>
                <Link to={`/post/${data?._id}`}>
                    
                    <button href={`/post/${data?._id}`}>перейти</button>
                </Link>
            </div>
        )
    }

    function create(event){
        console.log(event)
    }

    function handleClick(index){
        const q1 = posts[index]
        setWordData(q1)
    }
    return(
        <div className="Home">
            <div>
                {user?.friends?.map(users => friendsGets(users))}
            </div>
            <div className="slideBanner">
                <Slider data={wordData}/>
                <div className='flex_row'>
                    {posts?.map((data, i) =>
                        <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
                    )}
                </div>
            </div>
            <div>
                <button onClick={create}>Создать турнир</button>
                {posts?.map((post) => postes(post))}
            </div>
            
        </div>
    )
}

export default Home;