import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


test('Component renders title and author but not url and likes by default', () => {
    const initialState = 'hello'
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const propsForComponent = {
        blog: {
            title: 'testi',
            author: 'testaaja',
            url: 'www.testi.fi',
            user: {
                name: 'nimi nimi',
            }
        },
        key: 'id',
        updateBlog: () => {
            console.log('blog updated')
        },
        user: {
            username: 'nimi',
            name: 'nimi nimi',
            password: 'salasana',
        },
        removeBlog: () => {
            console.log('blog removed')
        }
    }

    const component = render(
        <Provider store={store}><Blog {...propsForComponent} /></Provider>
    )

    expect(component.container).toHaveTextContent(
        'testi'
    )

    expect(component.container).toHaveTextContent(
        'testaaja'
    )

    expect(component.container).not.toHaveTextContent(
        'www.testi.fi'
    )

    expect(component.container).not.toHaveTextContent(
        'likes'
    )
})

test('Component renders url and likes when button is pressed', () => {
    const initialState = 'hello'
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const propsForComponent = {
        blog: {
            title: 'testi',
            author: 'testaaja',
            url: 'www.testi.fi',
            user: {
                name: 'nimi nimi',
            }
        },
        key: 'id',
        updateBlog: () => {
            console.log('blog updated')
        },
        user: {
            username: 'nimi',
            name: 'nimi nimi',
            password: 'salasana',
        },
        removeBlog: () => {
            console.log('blog removed')
        }
    }

    const component = render(
        <Provider store={store}><Blog {...propsForComponent} /></Provider>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'testi'
    )

    expect(component.container).toHaveTextContent(
        'testaaja'
    )

    expect(component.container).toHaveTextContent(
        'www.testi.fi'
    )

    expect(component.container).toHaveTextContent(
        'likes'
    )
})

test('Like button works', async () => {
    const initialState = 'hello'
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const mockHandler = jest.fn() //tämä pitäisi mockata niin että kierretään dispatch joka heittää errorin?

    const propsForComponent = {
        blog: {
            title: 'testi',
            author: 'testaaja',
            url: 'www.testi.fi',
            user: {
                name: 'nimi nimi',
            }
        },
        key: 'id',
        handleLike: mockHandler,
        user: {
            username: 'nimi',
            name: 'nimi nimi',
            password: 'salasana',
        },
        handleRemove: () => {
            console.log('blog removed')
        }
    }

    const component = render(
        <Provider store={store}><Blog {...propsForComponent} /></Provider>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})