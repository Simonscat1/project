import { Link } from "react-router-dom";
import socket from "../../socket";

const ProfileGroup = ({ group, user }) =>{
    async function hadlerClickRemove(event){
        socket.emit("remove_groupe_user", { idGroup: event.target.value, user: user }, (status) =>{
            console.log(status)
        })
        window.location.reload()
    }
    async function hadlerClickAdd(event){
        socket.emit("add_to_grope", { idGroup: event.target.value, user: user }, (status) =>{
            console.log(status)
        })
        window.location.reload()
    }
    return(
        <div className="">
            <Link className="link" to={`/groups/${group.title}`}>
                <h2>{group.title}</h2>
                
            </Link>
            
            {(group?.players?.filter(item => item.id.includes(user.userID)) == "") ?(
                <button onClick={hadlerClickAdd} value={group._id} className="card-right">Войти</button>
            ):(
                <button onClick={hadlerClickRemove} value={group._id} className="card-right">Покинуть</button>
            )}
            <p>Участников:{group.players.length}</p>
        </div>
    )
}

export default ProfileGroup;