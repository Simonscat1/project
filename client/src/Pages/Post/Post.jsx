import { useLocation } from "react-router";
import "./post.css"

const Post = ({ posts }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const post = [];

    posts.forEach((p) => {
        if(p._id === path){
            post.push(p)
        };
    });
    return(
        <div>
            {post.map(postes => (
                <div key={postes._id}>
                    <h1 className="postTitle">{postes.title}</h1>
                    <p className="postLongDesc">{postes.content}</p>
                </div>
            ))}
        </div>
    )
};
export default Post;