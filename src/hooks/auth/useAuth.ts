import { useEffect, useState } from 'react'

import { useAuthDispatch } from '../../context/auth.context'

export const useAuth = () => {

    const [loading, setLoading] = useState(true)

    const dispatch = useAuthDispatch()
    
    const saveToken = (jwt: string) => localStorage.setItem('authData', jwt)

    const removeToken = () => localStorage.removeItem('authData')

    const getToken = () => localStorage.getItem('authData')

    const logout = () => {
        removeToken()
        dispatch({
            type:'auth_fail'
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('authData')

        token && dispatch({
            type: 'auth_success'
        })

        setLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return {
        saveToken,
        removeToken,
        logout,
        getToken,
        loading
    }
}