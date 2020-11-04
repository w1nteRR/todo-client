import React, { FC, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import useStyles from '../../components/auth/styles'

import { authApi } from '../../api/auth.api'

import { useAuth } from '../../hooks/auth/useAuth'

import { useAuthDispatch } from '../../context/auth.context'

import { IUserSignIn } from '../../interfaces/IAuth'

export const SignIn: FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({
        message: '',
        key: '',
        alert: ''
    })

    const styles = useStyles()
    const history = useHistory()
    
    const { saveToken } = useAuth()
    const dispatch = useAuthDispatch()

    const _submitSignIn = async () => {
        try {

            const token = await authApi.signIn({ email, password } as IUserSignIn)
            saveToken(token)
            dispatch({
                type: 'auth_success'
            })
            history.push('/profile')
            
        } catch (err) {

            if(!err.response.data.details) {
                return setError({
                    ...error,
                    key: '',
                    message: '',
                    alert: err.response.data
                })
            }

            setError({
                ...error,
                message: err.response.data.details[0].message,
                key: err.response.data.details[0].context.key,
                alert: ''
            })
        }
    }
    
    return (
        <Container 
            maxWidth="sm" 
            className={styles.container}
        >
            <Typography variant='h6'>Sign In</Typography>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <TextField  
                        variant="outlined"
                        required
                        error={error.key === 'email'}
                        helperText={error.key === 'email' && error.message}
                        label='Email'
                        name='email'
                        className={styles.input}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField  
                        variant="outlined"
                        required
                        error={error.key === 'password'}
                        helperText={error.key === 'password' && error.message}
                        label='Password'
                        name='password'
                        type='password'
                        className={styles.input}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {
                        error.alert && <Alert severity="error">{error.alert}</Alert>
                    }
                </div>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={_submitSignIn}
                >
                    Sign In
                </Button>
            </form>
            <Button 
                onClick={() => history.push('/auth/signup')}
            >
                Sign Up
            </Button>
        </Container>
    )
}
