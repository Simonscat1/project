import { Link } from "react-router-dom";

const ProfileGroup = ({ group }) =>{
    return(
        <div className="">
            <Link className="link" to={`/groups/${group.title}`}>
                {group.title}
            </Link>
        </div>
    )
}

export default ProfileGroup;