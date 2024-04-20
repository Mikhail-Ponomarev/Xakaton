import { Form } from "react-router-dom"

const FormNewPost = ({submitting}) => {
    return(
        <Form action="/SecondPage/new" method="post">
            <label>
                Title : <input type="text" name="title" />
            </label>
            <label>
                Body : <input type="text" name="body" />
            </label>
            <input type="submit" value='Add new post' disabled={submitting} />
        </Form>
    )
}

export {FormNewPost}