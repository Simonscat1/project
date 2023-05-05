import Modal from "../../Pages/Modal/Modal"
import ProfileGroup from "../../Pages/ProfileGroup/ProfileGroup";
import { useState, useEffect } from "react";
import "./groups.css"
import socket from "../../socket";

const Groups = ({ user }) => {
    const [modal, setModal] = useState(false)
    const [group, setGroup] = useState(null);
    const [list, setList] = useState("");

    useEffect(() => {
        const getGroup = () => {
            fetch(`/api/posts/group/get?userID=${user.userID}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            }).then((response) => {
                if(response.status === 200) return response.json();
                throw new Error("Ошибка");
            }).then((resObject) => {
                    setGroup(resObject.groups);
            }).catch((err) => {
                console.log(err);
            });
        };
        getGroup();
    },[user]);
    console.log(group)
    const Toggle = () => setModal(!modal); 
    const GetsAllGroup = (groups, user) => {
        if(groups != null){
            return(
                <div className="card" key={groups._id}>
                    <ul className="">
                        <ProfileGroup group={groups} user={user}/>
                    </ul>
                </div>
            )
        }
    }
    function hedlerClick(event){
        socket.emit("search_group",  {name: event.target.value, socketID: socket.id})
    }
    useEffect(() => {
        const getGropes = () => {
            socket.on("get_Grope", (data) => {
                setGroup(data)
            })
        }
        getGropes()
    },[])
    return(
        <div className="main">
            <div className="search-container-above-cards">
                <div className="search-container">
                    <input type="text" className="search-input-above-cards" placeholder="Search..." onChange={ (event) => {setList(event.target.value)} }/>
                    <button className="search-button-above-cards" onClick={hedlerClick} value={list}>Search</button>
                </div>
            </div>
            <div className="cards-container">
                <div className="card-actions">
                        <button className="card-action-button">Ваши Группы</button>
                        <button className="card-action-button" onClick={() => Toggle()}>Создать Группу</button>
                </div>
                {group?.filter((item) => {
                    if(item === ""){
                        return item
                    }else if(item.title.toLowerCase().includes(list.toLowerCase())){
                        return item
                    }
                }).map((item) => (
                    GetsAllGroup(item, user)
                ))}
            </div>
            <Modal show={modal} close={Toggle} userID={user.userID} userName={user.userName}/>
        </div>
    )
};
export default Groups;