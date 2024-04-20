import React, {useState} from "react";
export const AuthContext = React.createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const logIn = (data, cb) => {
        setUser(data)
        cb()
    }
    const logOut = (cb) => {
        setUser(null)
        cb()
    }
    const value = {user, logIn, logOut}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
