import { useEffect, useState } from "react"
import axios from "axios"

const admin = ["323827486750146561"]

const Panel = ({ user }) => {
    const [reqPost, setReqPost] = useState(null)
    
    useEffect(() => {
        const getPostReq = () => {
            fetch('/api/posts/req/get', {
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
                    setReqPost(resObject.post_req)
            }).catch((err) => {
                console.log(err);
            });
        };
        getPostReq();
    })
    const GetUser = ({ isUserGet,reqPost }) => {
        async function handlerClikAdd(event){
            const newPost = {
                id:event.target.value
            }
            axios.put("/api/posts/edit", newPost)
            window.location.reload()
        }
        async function handlerClikRemove(event){
            const newPost = {
                id:event.target.value
            }
            axios.post("/api/posts/delete", newPost)
            window.location.reload()
        }
        function Postes_add(reqPost){
            return(
                <div className="" key={reqPost._id}>
                    <ul>
                        <p>| Название поста: {reqPost.title}||</p>
                        <button className="" title="delete" onClick={handlerClikAdd} value={reqPost._id}>Добавить</button>
                        <button className="" title="delete" onClick={handlerClikRemove} value={reqPost._id}>Удалить</button>
                    </ul>
                </div>
            )
        }
        return(
            <div>
                {reqPost.map(reqPost => Postes_add(reqPost))}
                
            </div>
        )
    }
    const GuestGreeting = ({ isUserGets }) =>{
        return(
            <>What are doing in my swamp {isUserGets.userName}</>
        )
    }
    function Greeting(props){
        const isLoggedIn = props.isLoggedIn.userID
        for(let i = 0; i < admin.length; i++){
            if(admin[i] === isLoggedIn){
                if(reqPost !== null){
                    return (
                        <>
                            <GetUser isUserGet={user} reqPost={reqPost} />
                        </>
                    )
                }
            }
        }
        return <GuestGreeting isUserGets={user} />;
    }
    return(
        <>
            <Greeting isLoggedIn={user} />
        </>
    )
}

export default Panel;