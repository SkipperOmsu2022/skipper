import "../../Button/button.scss"
import {logOut} from "../../../services/Service";

const MainPage = () => {
    return (
        <div style={{'padding': '40vh'}}>
            <button onClick={logOut} className="button">
                    Log out
            </button>
        </div>
    )
}

export default MainPage;