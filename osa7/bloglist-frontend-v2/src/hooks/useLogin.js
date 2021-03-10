import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'

const useLogin = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.loggedInUser)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }, [dispatch])

    return user
}

export default useLogin