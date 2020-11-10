import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


describe('blog test', () => {
  let testBlog
  beforeEach(() => {
    testBlog = {
      id: '123',
      title: 'title',
      author: 'author',
      likes: 1111,
      url: '/url',
      user: { id: '1231' }
    }
  })

  test('renders the title & author but not details', () => {
    const component = render(<Blog blog={testBlog} addLike={() => { }} removeBlog={() => { }} userID="1231" />)

    let title = component.findByText('title')
    let author = component.findByText('author')
    let container = component.container.querySelector('.detail-container')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(container).toHaveStyle('display: none;')
  })
})