import Profile from "../../Pages/Profile/Profile";
import Discord from "../../Images/DiscordAvatars.jpg"

import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = ({ user }) => {
    const Logout = () => {
        window.open(`${process.env.REACT_APP_REDIRECT}/auth/logout`, "_self")
    }

    function GetUser(props){
        const isGetUser = props.isGetUser

        if(isGetUser === undefined){
            return( 
                <ul className="list">
                    <li className="listItem">
                        <Link className="link" to="login">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }else {
            return (
                <ul className="list">
                    <li className="listItem">
                        {isGetUser.avatar === null ? (
                            <img 
                                src={Discord}
                                alt=""
                                className="avatar"
                            />
                        ):(
                            <img 
                                src={isGetUser.avatar}
                                alt=""
                                className="avatar"
                            />
                        )}
                    </li>
                    <li className="listItem">
                        {Array(isGetUser).map(user =>(
                            <Profile key={user} user={user} />
                        ))}
                    </li>
                    <li className="listItem" onClick={Logout}>
                        Logout
                    </li>
                 </ul>
    
            )
        }
    }
    return(
        <div className="navbar">
            <span className="logo">
                <Link className="link" to="/">
                    Twitch Revels
                </Link>
            </span>
            <GetUser isGetUser={user}/>
        </div>
    )
}

export default Navbar;