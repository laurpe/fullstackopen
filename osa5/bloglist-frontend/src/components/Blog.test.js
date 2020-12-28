import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


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

test('Component renders title and author but not url and likes by default', () => {

    const component = render(
        <Blog {...propsForComponent} />
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

    const component = render(
        <Blog {...propsForComponent} />
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