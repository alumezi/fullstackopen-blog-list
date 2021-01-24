import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/login'
import {
  setUserName,
  setPassword,
  setUser,
  removeLoginData,
} from '../../app/reducers/user'
import { setNotification } from '../../app/reducers/notification'

const Login = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector((state) => state.userData)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login(username, password)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(removeLoginData())
    } catch (error) {
      dispatch(
        setNotification({ message: error.message, notificationType: 'error' })
      )
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to the application</h2>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => dispatch(setUserName(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => dispatch(setPassword(event.target.value))}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
