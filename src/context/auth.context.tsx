import React, { createContext, FC, useContext, useReducer } from 'react'

interface AuthState {
    isAuth: boolean
}

type Action = { type: 'auth_success' } | { type: 'auth_fail' }
type Dispatch = (action: Action) => void

const AuthStateContext = createContext<AuthState | null>(null)
const AuthDispatchContext = createContext<Dispatch | null>(null)

const reducer = (state: AuthState, action: Action) => {
    switch(action.type) {
        case 'auth_success': 
            return {
                ...state,
                isAuth: state.isAuth = true
            }
        case 'auth_fail':
            return {
                ...state,
                isAuth: state.isAuth = false
            }
        default:
            throw new Error('Wrong action')
    }
}

export const AuthProvider: FC = ({
    children
}) => {

    const [state, dispatch] = useReducer(reducer, {
        isAuth: false
    })

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => {
    const state = useContext(AuthStateContext)

    return state as AuthState
}

export const useAuthDispatch = () => {
    const dispatch = useContext(AuthDispatchContext)

    if(!dispatch) throw new Error('No provider')

    return dispatch
}