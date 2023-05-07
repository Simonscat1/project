import { useState } from "react";
import Close from "../../Images/times-solid.svg"
import socket from "../../socket";
import "./modal.scss";

const Modal = ({ show, close, userID, userName }) => {
    const [ data, setData ] = useState({
        title: '',
        context: '',
        owner: userID,
        userName: userName
    })
    const [file, setFile] = useState(null);

    
    const handlerChange = (event) => {
        const {name, value} = event.target;

        setData(prevInput => {
            return{
                ...prevInput,
                [name]:value
            }
        })
        
    }
    function upload(event){
        setFile(event.target.files[0])
    }

    const handleClick = async (event) => {
        socket.emit("grope_create",{ data:data, img:file }, (status) => {
            console.log(status)
            
        })
        window.location.reload()
    }
    return(
        <div>
            {show ?
                <div className="modalContainer" onClick={() => close()}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <header className="modal_header">
                            <h2 className="modal_header-title">Создание Группы</h2>
                            <button className="close" onClick={() => close()}>
                                <img src={Close} alt="close" />
                            </button>
                        </header>
                        <main className="modal_content">
                            <form>
                                <div>
                                    <p>Название</p>
                                    <input onChange={handlerChange} value={data.title} name="title" type="text" />
                                </div>
                                <div>
                                    <p>О группе</p>
                                    <textarea onChange={handlerChange} value={data.context} name="context" type="text"  />
                                </div>
                                <div>
                                    <p>Аватарка</p>
                                    {/* <img src={file} width="200" height="200"/> */}
                                    <input type="file" onChange={upload} />
                                </div>
                            </form>
                        </main>
                        <footer className="modal_footer">
                            <button className="modal-close" onClick={() => close()}>
                                Отмена
                            </button>

                            <button className="submit" onClick={handleClick}>Создать</button>
                        </footer>
                    </div>
                </div>
            : null }
        </div>
    )
}

export default Modal;