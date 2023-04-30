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
                    <li>
                        <FriendList friend={users} />
                    </li>
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
            <div className="">
                <h2>{data?.title}</h2>
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
        <div className="home">
            <div className="card">
                {user == null ?(
                    <p>Вход</p>
                ):(
                    <h2>{user?.friends?.map(users => friendsGets(users))}</h2>
                )}
                
            </div>
            <div className="card large">
                <Slider data={wordData}/>
                <div className='flex_row'>
                
                    {posts?.map((data, i) =>
                        <h1 key={i} onClick={()=>handleClick(i)}>.</h1>
                    )}
                    {/* <button className="prev" onClick={() => setIndex(index - 1)}>
                        <i className="fas fa-arrow-right" />
                        123
                    </button>
                    <button className="next" onClick={() => setIndex(index + 1)}>
                        <i className="fas fa-arrow-left" />
                        312
                    </button> */}
                </div>
            </div>
            <div className="card">
                <h2>Card 3</h2>
                <p>Card 3 content</p>
            </div>
            <div className="card">
                <h2>Card 4</h2>
                <p>Card 4 content</p>
            </div>
            <div className="card large">
                 {user == null ?(
                    <></>
                ):(
                    <button onClick={() => Toggle()}>Создать турнир</button>
                )}
                {posts?.map((post) => postes(post))}
            </div>
            <div className="card">
                <h2>Card 6</h2>
                <p>Card 6 content</p>
            </div>
            <Modal_home show={modal} close={Toggle}/>
        </div>
    )
}

export default Home;