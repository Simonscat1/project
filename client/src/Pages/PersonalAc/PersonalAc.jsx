import { Link } from "react-router-dom";
import "./personalac.css"

const Personal_account = ({ user }) =>{
    return(
        <div className="">
            <Link className="link" to={`/${user.userID}`}>
                Личный Кабинет
            </Link>
            
        </div>
    )
}

export default Personal_account;