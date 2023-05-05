import { useEffect, useState } from "react";
import Close from "../../Images/times-solid.svg"
import socket from "../../socket";

const ModalReqTur = ({show, close, user}) => {
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
                let gropew = []
                resObject.groups.forEach(grope => {
                    if(grope.owner == user.userID){
                        gropew.push(grope)
                    }
                });
                setGroup(gropew);
            }).catch((err) => {
                console.log(err);
            });
        };
        getGroup();
    },[user]);
    
    const sendToRequst = async (group) => {
        socket.emit("req_add_to_turnires", {gropes: group._id, socketID: socket.id})
    }
    return(
        <div>
            {show ?
                <div className="modalContainer" onClick={() => close()}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <header className="modal_header">
                            <h2 className="modal_header-title">Пригласить в группу</h2>
                            <button className="close" onClick={() => close()}>
                                <img src={Close} alt="close" />
                            </button>
                        </header>
                        <main className="modal_content">
                            <form>
                                <div>
                                    {group.map(gropes => {
                                        if(gropes != null){
                                            return(
                                                <div key={gropes._id}>
                                                    <button onClick={() => sendToRequst(gropes)}>{gropes.title}</button>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>

                            </form>
                        </main>
                    </div>
                </div>
            : null }
        </div>
    )
}

export default ModalReqTur;