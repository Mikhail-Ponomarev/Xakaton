import React, { Suspense, useEffect, useState } from "react";
import '../index.css'
import { Link, useLoaderData, useSearchParams, defer, Await } from "react-router-dom";
import { Search } from "./Search";
import { NewPost } from "./NewPost";

const Page2 = () => {
    const {posts} = useLoaderData()
    // posts.push(useLoaderData())
    // const [posts, setPosts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const postQuery = searchParams.get('post') || ''
    const latest = searchParams.has('latest') ? 80 : 1

    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(resp => resp.json())
    //         .then(data => setPosts(data))
    // }, [])

    return(
        <div className="page2">
            <Link to={'/SecondPage/new'} >Add new post</Link>
            <Search postQuery={postQuery} latest={latest} setSearchParams={setSearchParams} />
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={posts}>
                    {
                        // posts
                        //     .filter(post => post.title.includes(postQuery) && post.id >= latest)
                        //     .map(post => (
                        //         <div className="point" key={post.id}>
                        //             <Link to={`/SecondPage/${post.id}`}>
                        //                 <li >{post.title}</li>
                        //             </Link>
                        //         </div>
                        //     ))
                        (resolvedPosts) => (
                            resolvedPosts
                                .filter(post => post.title.includes(postQuery) && post.id >= latest)
                                .map(post => (
                                    <div className="point" key={post.id}>
                                        <Link to={`/SecondPage/${post.id}`}>
                                            <li >{post.title}</li>
                                        </Link>
                                    </div>
                                ))
                        )
                    }
                </Await>
            </Suspense>
            {/* {
                posts
                    .filter(post => post.title.includes(postQuery) && post.id >= latest)
                    .map(post => (
                    <div className="point" key={post.id}>
                        <Link to={`/SecondPage/${post.id}`}>
                            <li >{post.title}</li>
                        </Link>
                    </div>
                ))
            } */}
        </div>
    )
}

const getPosts = async () => {
    const responce = await fetch('https://jsonplaceholder.typicode.com/posts')
    
    if(!responce.ok) {
        throw new Response('', {status: 404, statusText: 'Not found'})
    }

    return responce.json()
}

const page2Loader = () => {
    return defer({
        posts: getPosts()
    })
}

export {Page2, page2Loader}