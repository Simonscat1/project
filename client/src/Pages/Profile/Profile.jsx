import { Link } from "react-router-dom";

const Personal_account = ({ user }) =>{
    return(
        <div className="">
            <Link className="link" to={`/${user.userID}`}>
                {user.userName}
            </Link>
        </div>
    )
}

export default Personal_account;