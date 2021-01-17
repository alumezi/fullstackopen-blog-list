let oldTimeouts

export const notification = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return {}
    default:
      return state
  }
}

export const setNotification = (data, time = 3000) => {
  return async (dispatch) => {
    clearTimeout(oldTimeouts)
    dispatch({
      type: 'SET_NOTIFICATION',
      data,
    })
    oldTimeouts = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, time)
  }
}
