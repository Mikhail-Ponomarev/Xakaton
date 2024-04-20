import { useNavigate, useParams, Form, useLoaderData, useActionData } from "react-router-dom"
import '../index.css'
import { AuthContext } from "./userProvider"
import { useContext } from "react"

const EditPage = ({to}) => {
    const {id} = useParams(to)
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const {logOut} = useContext(AuthContext)
    const post = useLoaderData()
    const responce = useActionData()
    console.log(responce)
    // console.log(post)
    // replace: false - движение по истории(запоминается), replace: true - переадрессация без запонимания в историю 
    // state - данные, которые можно достать по указаному в navigate адрессу используя useLocation
    const goHome = () => navigate('/', {replace: true, state: 123})
    const leave = () => {
        logOut(() => navigate('/'))
    }
    return(
        <div className="EditPage">
            Edit post {id}
            <button onClick={goBack} className="btn">Go Back</button>
            <button onClick={goHome} className="btn">Go Home</button>
            <button className="btn" onClick={leave}>Log out</button>

            <Form method="post" action={`/SecondPage/${id}/edit`}>
                <label>
                    Title: <input type="text" name="title" defaultValue={post.title} />
                </label>
                <label>
                    Body: <input type="text" name="body" defaultValue={post.body}/>
                </label>
                <input type="submit" value={'Edit post'} />
                <input type="hidden" value='1' name="userId" />
            </Form>
        </div>
    )
}


const editPost = async (id, formData) => {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: formData
    })
    return await responce.json()
}

const editPostAction = async ({request}) => {
    const formData = await request.formData()
    const responce = await editPost(formData.get('userId'), formData)
    return responce
}

const getPostById = async ({params}) => {
    const id = params.id
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return await post.json()
}

export {EditPage, editPostAction, getPostById}