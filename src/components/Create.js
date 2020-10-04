import React from 'react'
const Create = ({ handleCreate, title, author, url, setTitle, setAuthor, setUrl }) => (
    <form onSubmit={handleCreate}>
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
)

export default Create
