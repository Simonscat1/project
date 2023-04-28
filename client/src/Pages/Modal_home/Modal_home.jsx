import { useState } from "react";
import axios from "axios";
import Close from "../../Images/times-solid.svg"
import "./modal.scss";

const Modal_home = ({ show, close }) => {
    const [ data, setData ] = useState({
        title: '',
        avatar: '',
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
    const handleClick = async (event) => {
        axios.post("/api/posts/create", data)
        window.location.reload()
    }
    return(
        <div>
            {show ?
                <div className="modalContainer" onClick={() => close()}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <header className="modal_header">
                            <h2 className="modal_header-title">123</h2>
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

export default Modal_home;