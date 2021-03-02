import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'ADD_BLOG':
        return [...state, action.data]
    case 'LIKE_BLOG': {
        const blogId = action.data.id
        const blogToChange = state.find(blog => blog.id === blogId)
        const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
        return state.map(blog => blog.id !== blogId ? blog : changedBlog)
    }
    case 'REMOVE_BLOG': {
        const blogId = action.data.id
        return state.filter(blog => blog.id !== blogId)
    }
    default: return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogService.update(blog.id, blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: blog
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        })
    }
}

export default blogReducer