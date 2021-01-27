import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../../app/reducers/user'
import { ButtonGroup, Button } from 'shards-react'

const Navigation = ({ name }) => {
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }

  return (
    <>
      <ButtonGroup>
        <Button theme="secondary">
          <Link to="/blogs">blogs</Link>
        </Button>
        <Button theme="secondary">
          <Link to="/users">users</Link>
        </Button>
      </ButtonGroup>
      <span>{name} logged in</span>
      <button onClick={(event) => handleLogout(event)}>Logout</button>
    </>
  )
}

export default Navigation
