import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  return (
    <>
      <h2>Users</h2>
      <div>
        <span></span>
        <span>blogs created</span>
      </div>
      {users.map((user) => (
        <Link to={`/users/${user.id}`} key={user.id}>
          <span>{user.name}</span>
          <span>{user.blogs.length}</span>
        </Link>
      ))}
    </>
  )
}

export default Users
