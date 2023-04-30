import { useState, useEffect } from "react";

const GroupsProfile = ({ user }) => {
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
                if((resObject.groups.owner === user.userID) || (resObject.groups.players.find(users => users.id === user.userID))){
                    setGroup(resObject.groups);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        getGroup();
    },[user]);
    return( 
        <>
            {group?.title}
        </>
    )
}

export default GroupsProfile;