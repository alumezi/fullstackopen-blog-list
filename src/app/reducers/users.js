import { getAllUsers } from '../../services/users'

export const users = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.data
    default:
      return state
  }
}

export const getUsers = () => {
  return async (dispatch, getState) => {
    const token = getState().userData.token
    const data = await getAllUsers(token)
    dispatch({
      type: 'SET_USERS',
      data,
    })
  }
}
