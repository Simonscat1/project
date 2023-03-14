import Discord from "../../Images/DiscordAvatars.jpg"

const FriendList = ({ friend }) => {
    return(
        <div>
            <section>
                <div>
                    {friend.avatars === null?(
                        <img 
                            src={Discord}
                            alt=""
                            className="avatars"
                        />
                    ):(
                        <img 
                            src={friend.avatar}
                            alt=""
                            className="avatars"
                        />
                    )}
                </div>
                <div>
                    {friend.userNames}
                </div>
            </section>
        </div>
    )
}

export default FriendList;