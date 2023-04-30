import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Profile from "./Components/Profile/Profile";
import Groups from "./Components/Groups/Groups";
import Post from "./Pages/Post/Post";
import socket from "./socket";
import Home from "./Components/Home/Home";
import Panel from "./Components/Panel/Panel";
import GroupsProfile from "./Components/GroupsProfile/GroupsProfile";

const App = () => {
    const [userDiscord, setUserDiscord] = useState(null);
    const [post,setPost] = useState(null);
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
                if(response.status === 200) return response.json();
                throw new Error("Ошибка");
            }).then((resObject) => {
                setUserDiscord(resObject.discord);
            }).catch((err) => {
                console.log(err);
            });
        };
        getUser();
    },[]);
    useEffect(() => {
        const getPost = () => {
            fetch('/api/posts/get', {
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
                setPost(resObject.post);
            }).catch((err) => {
                console.log(err);
            });
        };
        getPost();
    },[]);

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
                    <Route 
                        path="/" 
                        element={post ? <Home posts={post}/> : <></>} 
                    />
                    <Route
                        path="/post/:id"
                        element={userDiscord ? <Post key={post._id} posts={post} /> : <Navigate to="/login" />}
                    />
                    <Route 
                        path="/groups"
                        element={userDiscord ? <Groups user={userDiscord} /> : <Navigate to="/login" />}
                    />
                    <Route 
                        path="/groups/:name"
                        element={userDiscord ? <GroupsProfile user={userDiscord} /> : <Login />} 
                    />
                </Routes>
            </BrowserRouter>
        );
    };
    return (
        <BrowserRouter>
            <Navbar user={userDiscord} />
            <Routes>
                <Route 
                    path="/" 
                    element={post ? <Home posts={post} users={userDiscord}/> : <Navigate to="/login" />} 
                />
                <Route
                    path="/post/:id"
                    element={userDiscord ? <Post key={post._id} posts={post} /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/groups"
                    element={userDiscord ? <Groups user={userDiscord} /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/groups/:name"
                    element={userDiscord ? <GroupsProfile user={userDiscord} /> : <Login />} 
                />
                <Route
                    path="/login"
                    element={userDiscord ? <Navigate to="/" /> : <Login />}
                />
                <Route 
                    path="/:id"
                    element={userDiscord ? <Profile key={userDiscord} user={userDiscord} /> : <Navigate to={`*/${userDiscord.userID}`} />}
                />
                <Route 
                    path="/:id/panel"
                    element={userDiscord ? <Panel key={userDiscord} user={userDiscord} /> : <Navigate to={`*/${userDiscord.userID}`} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;