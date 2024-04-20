import { isRouteErrorResponse, useRouteError } from "react-router-dom"


const ErrorPage = () => {
    const error = useRouteError()
    // console.log(error)

    if(isRouteErrorResponse(error)) {
        console.log(error)
    }
    return (
        <div>
            <h1>{error.status}</h1>
            <h2>{error.statusText}</h2>
        </div>
    )

}


const ErrorPage2 = () => {
    const error = useRouteError()
    return(
        <div>
            <h1>{error.status}</h1>
            <h2>{error.statusText}</h2> 
            <h3>{error.data.message}</h3>
        </div>
    )
}

export {ErrorPage, ErrorPage2}
