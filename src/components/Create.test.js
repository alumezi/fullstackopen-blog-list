import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Create from './Create'

describe('create test', () => {
  test('calls event handler with right props', async () => {
    const promise = Promise.resolve()
    const createBlog = jest.fn(() => promise)
    const component = render(<Create createBlog={createBlog} />)
    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, { target: { value: 'Arbnor Lumezi' } })
    fireEvent.change(title, { target: { value: 'This is the title' } })
    fireEvent.change(url, { target: { value: 'hey/look/a/url' } })
    fireEvent.submit(form)

    const dataObj = {
      author: author.value,
      title: title.value,
      url: url.value,
    }
    const functionCalls = createBlog.mock.calls[0][0]
    expect(dataObj).toEqual(functionCalls)
    await act(() => promise)
  })
})
