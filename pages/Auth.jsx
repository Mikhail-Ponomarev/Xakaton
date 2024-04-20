import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./userProvider";
import { useContext, useEffect, useRef } from "react";

export const Auth = () => {
    const {logIn, user} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        logIn(event.target.login.value, () => {
            navigate(location.state.pathname, {replace: true})
        })
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input type="text" name="login" />
                </label>
                <button type="submit">Authorize</button>
            </form>
        </div>
    )
}
