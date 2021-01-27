import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    const initialState = [
        {
            content: 'If it hurts, do it more often',
            id: 1,
            votes: 0
        },
        {
            content: 'Adding manpower to a late software project makes it later!',
            id: 2,
            votes: 0
        }
    ]
    test('anecdote can be voted', () => {
        const action = {
            type: 'ADD_VOTE',
            data: {
                id: 1
            }
        }

        const state = initialState

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(
            {
                content: 'If it hurts, do it more often',
                id: 1,
                votes: 1
            }
        )
    })
    test('new anecdote can be added', () => {
        const state = initialState
        expect(state).toHaveLength(2)

        const action = {
            type: 'ADD_ANECDOTE',
            data: {
                content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
                id: 3,
                votes: 0
            }

        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(3)
        expect(newState).toContainEqual(action.data)
    })
})