import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../../app/reducers/user'

const Navigation = ({ name }) => {
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }

  const navStyles = {
    background: 'grey',
  }

  return (
    <div style={navStyles}>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <span>{name} logged in</span>
      <button onClick={(event) => handleLogout(event)}>Logout</button>
    </div>
  )
}

export default Navigation
