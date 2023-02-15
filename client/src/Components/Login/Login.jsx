import Twitch from '../../Images/twitch.png'
import "./login.css"

const Login = () => {
    const discord = () => {
        window.open(`${process.env.REACT_APP_REDIRECT}/auth/discord`, "_self");
    };
    return(
        <div className="login">
            <h1 className="loginTitle">Авторизация</h1>
            <div className="wrapper">
                <div className="left">
                    <div className="loginButton discord" onClick={discord}>
                        <img src={Twitch} alt="" className="icon" />
                            Discord
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;