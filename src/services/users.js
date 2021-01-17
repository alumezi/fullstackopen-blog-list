import axios from 'axios'

const baseUrl = '/api/users'
const tokenType = 'bearer '

const getAllUsers = async (token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

export { getAllUsers }
