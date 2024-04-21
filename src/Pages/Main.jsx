import React, { Suspense, lazy } from "react";
import { Route, Outlet , RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import {Header, HeaderLoader} from "./FirstPage/Header/Header"
import {FirstPageLoader} from '../Pages/FirstPage/FirstPage'
const FirstPage = lazy(() => import('./FirstPage/FirstPage'))
const Auth = lazy(() => import('./Auth/Auth'))
const Reg = lazy(() => import('./Register/Register'))
const Reg2 = lazy(() => import('./Register/Register2'))

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" >
        <Route index  element={<Suspense fallback={<h1>Loading...</h1>}><Auth /></Suspense>}/>
        <Route path="Reg2" element={<Suspense fallback={<h1>Loading...</h1>}>
                    <Reg />
                </Suspense>
        }/>
        <Route path="Reg" element={<Suspense fallback={<h1>Loading...</h1>}>
                    <Reg2 />
                </Suspense>
        }/>
        <Route path="App" element={<Layout />} loader={HeaderLoader}>
            <Route path="FirstPage" element={
                <Suspense fallback={<h1>Loading...</h1>}>
                    <FirstPage />
                </Suspense>
            } loader={FirstPageLoader}/>  
        </Route> 
    </Route>
))

const Main = () => {
    return(
        <div className="main">
            <RouterProvider router={router} />
        </div>
    )
}

export {Main}






