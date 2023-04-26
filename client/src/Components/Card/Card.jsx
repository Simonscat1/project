import { Link } from "react-router-dom";
import "./card.css"

const Card = ({ posts }) => {
    return(
        <div className="card">
            <Link className="link" to={`/post/${posts._id}`}>
                <span className="title">{posts.title}</span>
                <button className="cardButton">Read More</button>
            </Link>
        </div>
    )
}

export default Card;