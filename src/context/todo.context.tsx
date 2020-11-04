import React, { createContext, FC, useContext, useReducer } from 'react'

interface TodoState {
    refreshFeed: boolean
}

type Action = { type: 'refresh_feed' }
type Dispatch = (action: Action) => void

const TodoStateContext = createContext<TodoState | null>(null)
const TodoDispatchContext = createContext<Dispatch | null>(null)

const reducer = (state: TodoState, action: Action) => {
    switch(action.type) {
        case 'refresh_feed':
            return {
                ...state,
                refreshFeed: !state.refreshFeed 
            }
        default:
            throw new Error('Wrong action')
    }
}

export const TodoProvider: FC = ({
    children
}) => {

    const [state, dispatch] = useReducer(reducer, {
        refreshFeed: false,
    })

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}

export const useTodoState = () => {
    const state = useContext(TodoStateContext)

    return state as TodoState
}

export const useTodoDispatch = () => {
    const dispatch = useContext(TodoDispatchContext)

    if(!dispatch) throw new Error('No provider')

    return dispatch
}