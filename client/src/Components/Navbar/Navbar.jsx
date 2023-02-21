import { Link } from "react-router-dom";
import PersonalAc from "../../Pages/Profile"
const Navbar = ({ user }) => {

    const Logout = () => {
        window.open(`${process.env.REACT_APP_REDIRECT}/auth/logout`, "_self")
    }

    if(user !== undefined){
        return(
            <ul className="list">

                <li className="listItem">
                    <PersonalAc key={user} user={user} />
                </li>
                <li className="listItem">
                    <img
                        src={user.avatar}
                        alt=""
                        className="avatar"
                    />
                </li>
                <li className="listItem">
                    <button onClick={Logout}>Logout</button>
                </li>
            </ul>
        )
    }

    return(
        <ul className="list">
            <li className="listItem">
                <Link className="link" to="login">
                    Login
                </Link>
            </li>
        </ul>
    )
}

export default Navbar;