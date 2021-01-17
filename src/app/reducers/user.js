export const userData = (
  state = {
    user: {},
    username: '',
    password: '',
  },
  action
) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.data }
    case 'REMOVE_USER':
      return { ...state, user: {} }
    case 'SET_USERNAME':
      return { ...state, username: action.data }
    case 'SET_PASSWORD':
      return { ...state, password: action.data }
    case 'REMOVE_LOGIN_DATA':
      return { ...state, username: '', password: '' }
    default:
      return state
  }
}

export const setUser = (data) => {
  return {
    type: 'SET_USER',
    data,
  }
}

export const setUserName = (data) => {
  return {
    type: 'SET_USERNAME',
    data,
  }
}

export const setPassword = (data) => {
  return {
    type: 'SET_PASSWORD',
    data,
  }
}

export const removeLoginData = () => {
  return {
    type: 'REMOVE_LOGIN_DATA',
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  }
}
