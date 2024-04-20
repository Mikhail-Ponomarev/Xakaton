import React from "react";
import { Link, useMatch } from "react-router-dom";
import '../index.css'

const CustomLink = ({children, to, ...props}) => {
    const match = useMatch({
        path: to,
        end: to.length === 1
    })
    return(
        <Link to={to}
            style={{color: match ? 'blue' : 'black' }}
            className="headerElem"
        >
            {children}
        </Link>
    )
}

export {CustomLink}