import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const GroupsProfile = ({ user }) => {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [group, setGroup] = useState(null);
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
                resObject.groups.forEach(group => {
                    if(group.title === path){
                        setGroup(group);
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        };
        getGroup();
    },[user]);
    console.log(group)
    return( 
        <>
            {group?.title}
        </>
    )
}

export default GroupsProfile;