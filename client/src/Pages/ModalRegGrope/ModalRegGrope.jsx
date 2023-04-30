import { useEffect, useState } from "react";
import Close from "../../Images/times-solid.svg"
import socket from "../../socket";

const ModalRegGrope = ({ show, close, user, getsusers }) => {
    const [group, setGroup] = useState(null)
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
    const sendToRequst = async (getsusers, group) => {

        socket.emit("add_to_groupes", { 
            id: getsusers.userID,  
            userName: getsusers.userName, 
            groupID: group._id,
            socketID: socket.id  
        })
    }
    return(
        <div>
            {show ?
                <div className="modalContainer" onClick={() => close()}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <header className="modal_header">
                            <h2 className="modal_header-title">Приглосить в группу</h2>
                            <button className="close" onClick={() => close()}>
                                <img src={Close} alt="close" />
                            </button>
                        </header>
                        <main className="modal_content">
                            <form>
                                <div>
                                    {group !== null ?(
                                        <button onClick={() => sendToRequst(getsusers, group)}>{group.title}</button>
                                    ):(
                                        <></>
                                    )}
                                </div>

                            </form>
                        </main>
                    </div>
                </div>
            : null }
        </div>
    )
}

export default ModalRegGrope;