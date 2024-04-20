import { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./userProvider";


const CheckAuth = ({children}) => {
    const location = useLocation()
    const {user} = useContext(AuthContext) 
    if(!user) {
        return <Navigate to='/auth' replace state={location} />
    }
    return children
}

export {CheckAuth}