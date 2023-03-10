import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Profile from "./Components/Profile/Profile";
import socket from "./socket";
import Home from "./Components/Home/Home"

const App = () => {
    const [userDiscord, setUserDiscord] = useState(null);
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const getUser = () => {
            fetch('/auth/login/success', {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            }).then((response) => {
                if(response.status === 200) return response.json()
                throw new Error("Ошибка")
            }).then((resObject) => {
                setUserDiscord(resObject.user)
            }).catch((err) => {
                console.log(err)
            })
        }
        getUser()
    },[])
    
    useEffect(() => {
        const getUser = () => {
            fetch('/auth/login/success', {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            }).then((response) => {
                if(response.status === 200) return response.json()
                throw new Error("Ошибка")
            }).then((resObject) => {
                setUser(resObject.users)
            }).catch((err) => {
                console.log(err)
            })
        }
        getUser()
    },[])
    useEffect(() => {
        if(userDiscord !== null){
            socket?.emit("newUser", userDiscord.userID);
        }
    });
    if(userDiscord === null){
        return(
            <BrowserRouter>
                <Navbar  />
                <Routes>
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                </Routes>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <Navbar user={userDiscord} />
            <Routes>
                <Route 
                    path="/" 
                    element={<Home users={user}/>} 
                />
                <Route
                    path="/login"
                     element={userDiscord ? <Navigate to="/" /> : <Login />}
                />
                <Route 
                    path="/:id"
                    element={userDiscord ? <Profile key={userDiscord} user={userDiscord} /> : <Navigate to={`*/${userDiscord.userID}`} />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;