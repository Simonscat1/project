import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../socket";

const GroupsProfile = ({ user }) => {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [group, setGroup] = useState(null);
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
                resObject.groups.forEach(group => {
                    if(group.title === path){
                        setGroup(group);
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        };
        getGroup();
    },[user]);
    async function hadlerClickRemove(event){
        socket.emit("remove_groupe_user", { idGroup: event.target.value, user: user }, (status) =>{
            console.log(status)
        })
        window.location.assign("http://localhost:3000/groups")
    }
    return( 
        <div className="groupes-card">
            <div className="group-names-card card">
                <h3>Название группы:{group?.title}</h3>
                <p className="member-count">Количество участников: {group?.players?.length}</p>
                <button className="leave-button" value={group?._id}  onClick={hadlerClickRemove}>Покинуть группу</button>
            </div>
            <div className="group-description-card card">
                <h3>Описание группы:</h3>
                <p className="group-description">{group?.content}</p>
            </div>
            <div className="avatars-card card">
                <h3>Участники группы:</h3>
                <ul className="groupes-avatars">

                </ul>
            </div>        
        </div>
    )
}

export default GroupsProfile;