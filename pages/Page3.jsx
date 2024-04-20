import React from "react";
import '../index.css'
import {Route, Routes, Link} from 'react-router-dom'

const Page3 = () => {
    return(
        <div className="page3">
            <ul>
                <li>
                    <Link to='AboutProject'>About Project</Link>
                </li>
                <li>
                    <Link to='AboutTeam'>About Team</Link>
                </li>
            </ul>
            <Routes>
                <Route path="AboutProject" element={<p>About Project</p>}/>
                <Route path="AboutTeam" element={<p>About Team</p>}/>
            </Routes>
        </div>
    )
}

export {Page3}