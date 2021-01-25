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
import {
  Form,
  FormInput,
  FormGroup,
  Card,
  CardBody,
  Button,
} from 'shards-react'

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        style={{
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <CardBody>
          <Form onSubmit={handleLogin}>
            <h2>Welcome to the Blog</h2>
            <FormGroup>
              <label htmlFor="username">username</label>
              <FormInput
                type="text"
                id="username"
                value={username}
                onChange={(event) => dispatch(setUserName(event.target.value))}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">password</label>
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(event) => dispatch(setPassword(event.target.value))}
              />
            </FormGroup>
            <Button theme="primary" type="submit" style={{ float: 'right' }}>
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Login
