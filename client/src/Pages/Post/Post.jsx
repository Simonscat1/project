import { useLocation } from "react-router";
import {  useState } from "react";
import ModalReqTur from "../../Pages/ModalReqTur/ModalReqTur";
import "./post.css"
// import socket from "../../socket";

const Post = ({ posts, user }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [modal, setModal] = useState(false)

    
    const Postes = (postes) => {

        if(postes._id === path){
            // function headerClick(event){
            //     socket.emit("req_add_to_turnires", { idUser: event.target.value, socketID:socket.id })
            // }

            const Toggle = () => setModal(!modal);
            return(
                <div className="post" key={postes._id}>
                    <div className="group-image">
                        <img src="assets/group-img.jpg" alt="Group Image" />
                    </div>
                    <div className="group-info">
                        <p className="group-description">Турнир {postes.title}</p>
                        <p className="group-time">Старт турнира {new Date(`${postes?.data_end}`).toDateString()}</p>
                    </div>
                    <div className="group-buttons">
                        <button className="button" onClick={() => Toggle()} value={user.userID}>Принять</button>
                    </div>
                    <div className="extra-buttons">
                        <button className="button button-1">Обзор<span className="button-underline"></span></button>
                        <button className="button button-1"><a href={`${location.pathname}/groupes`}>Команды</a><span className="button-underline"></span></button>
                    </div>
                    <div className="group-card-container">
                        <div className="group-card">
                            <h1 className="group-card-title">Инфо</h1>
                            <p className="group-card-a1">Команды</p>
                            <p className="group-card-d1">Размер: 5X5</p>
                            <p className="group-card-d1">Регион: RU</p>
                            <p className="group-card-d1">Карты: 7 карт</p>
                        </div>
                        <div className="group-card">
                            <h3 className="group-card-title">Правила</h3>

                            <h2 className="group-card-a1">1. Команды</h2>
                            <p className="group-card-a1">Каждая команда должна состоять из 5 игроков.</p>
                            
                            <h2 className="group-card-a1">2. Формат</h2>
                            <p className="group-card-a1">Турнир будет проходить в формате двойного выбывания.</p>
                            
                            <h2 className="group-card-a1">3. Правила игры</h2>
                            <ul className="group-card-ul">
                                <li>Игра будет проводиться на карте, выбранной организаторами.</li>
                                <li>Режим игры: Захват/Оборона.</li>
                                <li>Победителем считается команда, которая первой наберет 13 очков.</li>
                                <li>При ничьей (12:12) будет сыгран решающий раунд.</li>
                                <li>Запрещено использование читов, багов и других недобросовестных методов.</li>
                                <li>Организаторы могут применять дополнительные правила в случае необходимости.</li>
                            </ul>
                            
                            <h2 className="group-card-a1">4. Расписание</h2>
                            <p className="group-card-a1">Окончательное расписание будет объявлено организаторами перед началом турнира.</p>
                            
                            <h2 className="group-card-a1">5. Призы</h2>
                            <p className="group-card-a1">Призы будут распределены среди победителей в соответствии с решением организаторов.</p>
                            
                            <h2 className="group-card-a1">6. Дополнительные правила</h2>
                            <p className="group-card-a1">Организаторы могут внести дополнительные правила или вносить изменения в правила турнира по своему усмотрению. Участники будут уведомлены об этом в случае необходимости.</p>
                        </div>
                    </div>
                    <ModalReqTur show={modal} close={Toggle} user={user}/>
                </div>
            )
        };
    };
    return(
        <div>
            {posts.map(postes => Postes(postes))}
        </div>
    )
};
export default Post;