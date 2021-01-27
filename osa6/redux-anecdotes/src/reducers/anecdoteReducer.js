
export const createAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_VOTE':
      const anecdoteId = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === anecdoteId)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(anecdote => anecdote.id !== anecdoteId ? anecdote : changedAnecdote)
    case 'ADD_ANECDOTE':
      return [...state, action.anecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default anecdoteReducer