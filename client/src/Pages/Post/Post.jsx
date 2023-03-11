import { useLocation } from "react-router";
import "./post.css"

const Post = ({ posts }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const Postes = ({_id, title, content}) => {
        if(_id === path){
            return(
                <div className="post" key={_id}>
                    <h1 className="postTitle">{title}</h1>
                    <p className="postLongDesc">{content}</p>
                </div>
            )
        };
    };
    return(
        <div>
            {posts.map(postes => Postes(postes))}
        </div>
    )
};
export default Post;