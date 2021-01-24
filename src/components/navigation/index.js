import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../app/reducers/user'

const Login = ({ name }) => {
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }
  return (
    <div>
      <span>{name} logged in</span>
      <button onClick={(event) => handleLogout(event)}>Logout</button>
    </div>
  )
}

export default Login
