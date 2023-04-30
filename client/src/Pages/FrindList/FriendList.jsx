import Discord from "../../Images/DiscordAvatars.jpg"

const FriendList = ({ friend }) => {
    return(
        <div className="">
            <section>
                <div className="">
                    {friend.avatars === null?(
                        <img 
                            src={Discord}
                            alt=""
                            className="avatars"
                        />
                    ):(
                        <img 
                            src={friend.avatars}
                            alt=""
                            className="avatars"
                        />
                    )}
                </div>
                <div className="">
                    {friend.userNames}
                </div>
            </section>
        </div>
    )
}

export default FriendList;