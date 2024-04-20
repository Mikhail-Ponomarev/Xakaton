import { Link, useParams, useNavigate, useLoaderData, defer, Await, useAsyncValue, json } from "react-router-dom"
import React, {useEffect, useState, Suspense} from "react";
import { EditPage } from "./EditPost";
import '../index.css'


const MakePost = () => {
    const post = useAsyncValue()
    return(
        <li>{post.title}</li>
    )
}

const MakeComments = () => {
    const comment = useAsyncValue()
    // console.log(comments)
    return(
       <>
            <h2>{comment.title}</h2>
            <h3>{comment.body}</h3>
       </>
    )
}

const SinglePage = () => {
    const {id, post, comments} = useLoaderData()
    // const {id} = useParams()
    // const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //         .then(resp => resp.json())
    //         .then(data => setPost(data))
    // }, [id])

    return(
        
        <div className="SinglePage">
            <li>{id}</li>
            <Suspense fallback={<h1>Post loading...</h1>}>
                <Await resolve={post}>
                    <MakePost />
                </Await>         
            </Suspense>
            <Link to={`/SecondPage/${id}/edit`} element={<EditPage />}>Edit post</Link>
            <button onClick={goBack} className="btn">Go Back</button>
            <Suspense fallback={<h1>Comments loading...</h1>}>
                <Await resolve={comments}>
                    <MakeComments />
                </Await>         
            </Suspense>
            {/* {post && (
                <>
                    <li>{id}</li>
                    <li>{post.title}</li>
                    <Link to={`/SecondPage/${id}/edit`} element={<EditPage />}>Edit post</Link>
                    <button onClick={goBack} className="btn">Go Back</button>
                </>
            )} */}
        </div>
    )
}

const getPostById = async (id) => {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return await post.json()
}

const getCommentsById = async (id) => {
    const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return await comments.json()
}

const postLoader = async ({params}) => {
    const id = params.id
    const post = getPostById(id)
    const comments = await getCommentsById(id) 
    if(!comments.userId) {
        throw json({message: 'Maybe wrong url'}, {status: 404, statusText: 'Bad request'})
    }

    return {
        post: post,
        id,
        comments: comments
    }
}

export {SinglePage, postLoader}