import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


test('Component renders title and author but not url and likes by default', () => {
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