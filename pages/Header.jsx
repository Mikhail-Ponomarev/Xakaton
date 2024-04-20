import React from "react";
import '../index.css'
import {Link, Outlet, NavLink} from 'react-router-dom'
import { CustomLink } from "./CustomLink";

const style1 = ({isActive}) => isActive ? 'active-link' : 'passive-link'
const style2 = ({isActive}) => ({color: isActive ? 'blue' : 'black'})

const Header = () => {
    return(
        <>
            <header className="header">
                {/* <Link to="/" className="headerElem">Page 1</Link> */}
                <NavLink to="/" end className={style1}>Page 1</NavLink>
                <NavLink to="/SecondPage" className="headerElem" style={style2}>Page 2</NavLink>
                {/* <NavLink to="/ThirdPage" className={style1}>Page 3</NavLink> */}
                <CustomLink to="/ThirdPage" >Page 3</CustomLink>
            </header>
            <Outlet />
            <footer className="footer">Footer</footer>
        </>
    )
}

export {Header}