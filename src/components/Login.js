import React from 'react'
const Login = ({ handleLogin, username, password, setUsername, setPassword }) => (
    <form onSubmit={handleLogin}>
        <h2>log in to the application</h2>
        <div>
            <label htmlFor="username">username</label>
            <input type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
)

export default Login
