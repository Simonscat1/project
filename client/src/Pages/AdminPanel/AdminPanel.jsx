import { Link } from "react-router-dom";
const AdminPanel = ({user}) => {

    return(
        <div className="">
            <Link className="link" to={`/${user.userID}/panel`}>
                Панель
            </Link>
        </div>
    )
}

export default AdminPanel;