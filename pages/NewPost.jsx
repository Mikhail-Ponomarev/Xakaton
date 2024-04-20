import { redirect, useNavigation } from 'react-router-dom'
import { FormNewPost } from './Form'

export {FormNewPost} from './Form'

const NewPost = () => {
    const navigation = useNavigation()
    console.log(navigation)
    return(
        <div>
            <p>Add new post</p>
            <FormNewPost submitting={navigation.state === 'submitting'}/>
        </div>
    )
}

const addNewPostAction = async ({request}) => {
    const formData = await request.formData()
    console.log(formData)
    const title = formData.get('title')
    const body = formData.get('body')
    const userId = 1
    const responce = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({title, body, userId})
    })
    const post = await responce.json()
    return redirect('/SecondPage/' + post.id)
}

export {NewPost, addNewPostAction}