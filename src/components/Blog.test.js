import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


describe('blog test', () => {
  let component
  let addLikeFunction
  let removeBlogFunction

  beforeEach(() => {
    const testBlog = {
      id: '123',
      title: 'title',
      author: 'author',
      likes: 1111,
      url: '/url',
      user: { id: '1231' }
    }
    addLikeFunction = jest.fn()
    removeBlogFunction = jest.fn()

    component = render(<Blog blog={testBlog} addLike={addLikeFunction} removeBlog={removeBlogFunction} userID="1231" />)
  })

  test('renders the title & author but not details', () => {
    const title = component.findByText('title')
    const author = component.findByText('author')
    const container = component.container.querySelector('.detail-container')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(container).toHaveStyle('display: none;')
  })

  test('show details after clicking view', () => {
    const viewDetailsButton = component.getByTestId('view-btn')
    const container = component.container.querySelector('.detail-container')
    expect(container).toHaveStyle('display: none;')
    fireEvent.click(viewDetailsButton)
    expect(container).not.toHaveStyle('display: none;')
  })

  test('2 likes are 2 likes', () => {
    const likeButton = component.getByTestId('like-btn')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(addLikeFunction.mock.calls.length).toBe(2)
  })

})