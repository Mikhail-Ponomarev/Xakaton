import React, { Suspense, lazy } from "react";
import {Routes, Route, Link, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import '../index.css'
// import { Page1 } from "./Page1";
const Page1 = lazy(() => import('./Page1'))
import { Page2, page2Loader } from "./Page2";
import { Page3 } from "./Page3";
import { Header } from "./Header";
import { SinglePage, postLoader } from "./SinglePage";
import { EditPage, editPostAction, getPostById } from "./EditPost";
import { UserProvider } from "./userProvider";
import { CheckAuth } from "./CheckAuth";
import { Auth } from "./Auth";
import { ErrorPage, ErrorPage2 } from "./ErrorPage";
import { NewPost, addNewPostAction } from "./NewPost";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Header />}>
        <Route index element={<Suspense fallback={<h1>Loading...</h1>}><Page1 /></Suspense>} />
        <Route path="SecondPage" element={<Page2 />} loader={page2Loader} errorElement={<ErrorPage />} />
        {/* переадресация с Page2 на SecondPage, если replace указан, то нет запоминания в историю */}
        <Route path="SecondPage/:id" element={<SinglePage />} loader={postLoader} errorElement={<ErrorPage2 />}/>
        <Route path="SecondPage/:id/edit" element={<CheckAuth>
            <EditPage />
        </CheckAuth>} loader={getPostById} action={editPostAction}/>
        <Route path="SecondPage/new" element={<NewPost />} action={addNewPostAction} />
        <Route path="Page2" element={<Navigate to='/SecondPage' replace/> } />
        <Route path="ThirdPage/*" element={<Page3 />} />
        <Route path="auth"  element={<Auth />}/>
    </Route>
))

const Main = () => {
    return(
        <div className="main">
            {/* <header className="header">
                <Link to="/" className="headerElem">Page 1</Link>
                <Link to="/SecondPage" className="headerElem">Page 2</Link>
                <Link to="/ThirdPage" className="headerElem">Page 3</Link>
            </header> */}
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </div>
    )
}

export {Main}

            // <Routes>
            //         <Route path="/" element={<Header />}>
            //             <Route index element={<Page1 />} />
            //             <Route path="SecondPage" element={<Page2 />} />
            //             {/* переадресация с Page2 на SecondPage, если replace указан, то нет запоминания в историю */}
            //             <Route path="SecondPage/:id" element={<SinglePage />} />
            //             <Route path="SecondPage/:id/edit" element={<CheckAuth>
            //                 <EditPage />
            //             </CheckAuth>} />
            //             <Route path="Page2" element={<Navigate to='/SecondPage' replace/>} />
            //             <Route path="ThirdPage/*" element={<Page3 />} />
            //             <Route path="auth"  element={<Auth />}/>
            //         </Route>
            //         {/* <Route index element={<Page1 />} />
            //         <Route path="/SecondPage" element={<Page2 />} />
            //         <Route path="/ThirdPage" element={<Page3 />} /> */}
            //     </Routes>