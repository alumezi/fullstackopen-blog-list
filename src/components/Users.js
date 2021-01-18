import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../app/reducers/users'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector((state) => state.users)
  return (
    <>
      <h2>Users</h2>
      <div>
        <span></span>
        <span>blogs created</span>
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <span>{user.blogs.length}</span>
        </div>
      ))}
    </>
  )
}

export default Users
