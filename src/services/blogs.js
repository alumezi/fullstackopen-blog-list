import axios from 'axios'
const baseUrl = '/api/blogs'
const tokenType = 'bearer '

const getAll = async (token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blog, token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const removeBlog = async (id, token) => {
  const config = {
    headers: { Authorization: tokenType + token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export { getAll, create, update, removeBlog }
