import { useState } from "react";

const Search = ({postQuery, latest, setSearchParams}) => {
    const [post, setPost] = useState(postQuery)
    const [latestPost, setLatestPost] = useState(latest)

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const queary = form.search.value
        const late = form.latest.checked
        const params = {}
        if(queary.length) params.post = queary
        if(late) params.latest = late 
        setSearchParams(params)
    }

    return(
        <form autoComplete="off" onSubmit={handleSubmit}>
            <input type="search" value={post} onChange={e => setPost(e.target.value)} name="search"/>
            <label style={{padding: '10px'}}>
                Latest 20    <input type="checkbox" checked={latestPost} name="latest" onChange={e => setLatestPost(e.target.checked)} />
            </label>
            <input type="submit" value="Search" />
        </form>
    )
}

export {Search}