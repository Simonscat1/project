import Modal from "../../Pages/Modal/Modal"
import { useState } from "react";
import "./groups.css"

const Groups = () => {
    const [modal, setModal] = useState(false)
    const Toggle = () => setModal(!modal);
    return(
        <div>
            <div>
                поиск
            </div>
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
            <Modal show={modal} close={Toggle}/>
        </div>
    )
};
export default Groups;