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
               Создать пост с таймер смены картинки
          </div>
    )
};
export default Post;