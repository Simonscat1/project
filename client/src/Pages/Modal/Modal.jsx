import { useState } from "react";
import Close from "../../Images/times-solid.svg"
import socket from "../../socket";
import "./modal.scss";

const Modal = ({ show, close, userID, userName }) => {
    const [ data, setData ] = useState({
        title: '',
        heading: '',
        context: '',
        owner: userID,
        url: '',
        avatar: '',
        userName: userName
    })

    const handlerChange = (event) => {
        const {name, value} = event.target;

        setData(prevInput => {
            return{
                ...prevInput,
                [name]:value
            }
        })
    }
    const handleClick = (event) => {
        socket.emit("grope_create", data);
        window.location.reload()
    }
    return(
        <div>
            { show ?
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
                                    <p>Заголовок</p>
                                    <input onChange={handlerChange} value={data.heading} name="heading" type="text" />
                                </div>
                                <div>
                                    <p>О себе</p>
                                    <textarea onChange={handlerChange} value={data.context} name="context" type="text"  />
                                </div>
                                <div>
                                    <p>Личная ссылка</p>
                                    <input onChange={handlerChange} value={data.url} name="url" type="text" />/
                                </div>
                                <div>
                                    <p>Аватарка</p>
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