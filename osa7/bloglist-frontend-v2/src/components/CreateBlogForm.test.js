import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

test('Form has correct info', async () => {
    const initialState = 'hello'
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const mockHandler = jest.fn()

    const component = render(
        <Provider store={store}><CreateBlogForm createBlog={mockHandler} /></Provider>
    )

    userEvent.type(component.container.querySelector('#title'), 'testiblogi')
    userEvent.type(component.container.querySelector('#author'), 'testaaja')
    userEvent.type(component.container.querySelector('#url'), 'www.testiblogi.fi')

    const button = component.getByText('add blog')

    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({ title: 'testiblogi', author: 'testaaja', url: 'www.testiblogi.fi' })
})
