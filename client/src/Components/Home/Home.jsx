import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import socket from "../../socket";

import Card from "../Card/Card";
import FriendList from "../../Pages/FrindList/FriendList"
import Modal_home from "../../Pages/Modal_home/Modal_home";

import "./home.css"


//создать топ по elo соло
//создать топ команд по elo
const Home = ({ posts,users }) => {
    
    const [ user, setUser ] = useState(null)
    const [wordData,setWordData] = useState(posts[0])
    const [modal, setModal] = useState(false)
    useEffect(() => {
        const getsUser = () => {
            socket.on('getNothings', async (data) => {
                setUser(data)
            })
        }
        getsUser()
    },[])

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

    function handleClick(index){
        const slider = posts[index]
        setWordData(slider)
    }
    const Toggle = () => setModal(!modal);
    
   
    return(
        <div className="Home">
            <Modal_home show={modal} close={Toggle}/>
            <div className="">
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
                <button onClick={() => Toggle()}>Создать турнир</button>
                {posts?.map((post) => postes(post))}
            </div>
            
        </div>
    )
}

export default Home;