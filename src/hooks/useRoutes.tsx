import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Header } from '../components/navigation/Header'
import { useAuthState } from '../context/auth.context'

import { SignIn } from '../pages/auth/SignIn'
import { SignUp } from '../pages/auth/SignUp'

import { Profile } from '../pages/profile/Profile'

import { useAuth } from './auth/useAuth'

export const useRoutes = () => {

    const { loading } = useAuth()
    const { isAuth } = useAuthState()

    if(loading) return <></>
    
    if(isAuth) return (
        <>
        <Header />
        <Switch>
            <Route path='/' component={Profile} />
            
            <Redirect to='/' />
        </Switch>
        </>
    )

    return (
        <Switch>
            <Route path='/auth/signin' component={SignIn} />
            <Route path='/auth/signup' component={SignUp} />

            <Redirect to='/auth/signin' />
        </Switch>
    )

}