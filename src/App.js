import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(loggedInUser)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
      console.error("Wrong credentials")
    }
  }

  if (user === null) {
    return <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App