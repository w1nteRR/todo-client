import React, { FC, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Container, TextField, Typography } from '@material-ui/core'

import useStyles from '../../components/auth/styles'

import { authApi } from '../../api/auth.api'
import { IUserSignUp } from '../../interfaces/IAuth'

export const SignUp: FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState({
        message: '',
        key: ''
    })

    const styles = useStyles()
    const history = useHistory()

    const _submitSignUp = async () => {
        try {
            
            await authApi.signUp({ email, password, confirmPassword } as IUserSignUp)

            history.push('/auth/signin')

        } catch (err) {
            setError({
                ...error,
                message: err.response.data.details[0].message,
                key: err.response.data.details[0].context.key
            })
        }
    }
    
    return (
        <Container 
            maxWidth="sm" 
            className={styles.container}
        >
            <Typography variant='h6'>Sign Up</Typography>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <TextField  
                        variant="outlined"
                        required
                        error={error.key === 'email'}
                        helperText={error.key === 'email' && error.message}
                        type='email'
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
                     <TextField  
                        variant="outlined"
                        required
                        error={error.key === 'confirmPassword'}
                        helperText={error.key === 'confirmPassword' && error.message}
                        label='Confirm password'
                        name='confirmPassword'
                        type='password'
                        className={styles.input}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={_submitSignUp}
                >
                    Confirm
                </Button>
            </form>
            <Button 
                onClick={() => history.goBack()}
            >
                Back
            </Button>
        </Container>
    )
}
