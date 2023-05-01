import Modal from "../../Pages/Modal/Modal"
import ProfileGroup from "../../Pages/ProfileGroup/ProfileGroup";
import { useState, useEffect } from "react";
import "./groups.css"

const Groups = ({ user }) => {
    const [modal, setModal] = useState(false)
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
                console.log(resObject.groups)
                    setGroup(resObject.groups);
            }).catch((err) => {
                console.log(err);
            });
        };
        getGroup();
    },[user]);

    const Toggle = () => setModal(!modal); 
    const GetsAllGroup = (groups) => {
        if(groups != null){
            return(
                <div className="" key={groups._id}>
                    <ul>
                        <ProfileGroup group={groups} />
                    </ul>
                </div>
            )
        }
    }
    console.log(group)
    return(
        <div>
            {group?.map(groups => GetsAllGroup(groups))}
            <div>
                <h3>Группы</h3>
                <div>
                    <button>Ваши Группы</button>
                </div>
                <div>
                    <button>Нати группу</button>
                </div>
                <div>
                    <button onClick={() => Toggle()}>Создать Группу</button>
                </div>
            </div>
            <Modal show={modal} close={Toggle} userID={user.userID} userName={user.userName}/>
        </div>
    )
};
export default Groups;