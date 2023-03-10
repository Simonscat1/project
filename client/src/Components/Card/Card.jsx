import { Link } from "react-router-dom";
import "./card.css"

const Card = ({ posts }) => {
    return(
        <div className="card">
            <Link>
                <span className="title">{posts.title}</span>
                <img src={posts.img} alt="" className="img" />
                <p className="desc">{posts.context_desc}</p>
                <button className="cardButton">Read More</button>
            </Link>
        </div>
    )
}

export default Card;