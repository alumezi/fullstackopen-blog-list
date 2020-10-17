import React, { useState } from 'react'
import { create } from '../services/blogs'

const Create = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handleCreate = async event => {
        event.preventDefault()
        const newBlog = await create({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
        onCreate(newBlog)
    }

    return <form onSubmit={handleCreate}>
        <h2>create new</h2>
        <div>
            <label htmlFor="title">title</label>
            <input type="text" id="title" value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
            <label htmlFor="author">author</label>
            <input type="author" id="author" value={author} onChange={event => setAuthor(event.target.value)} />
        </div>
        <div>
            <label htmlFor="url">url</label>
            <input type="url" id="url" value={url} onChange={event => setUrl(event.target.value)} />
        </div>
        <button type="submit">create</button>
    </form>
}

export default Create
