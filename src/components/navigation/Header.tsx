import React, { FC } from 'react'
import { AppBar, Box, Button, Toolbar } from '@material-ui/core'

import { UploadForm } from '../upload/Upload.form'
import { UserAvatar } from '../profile/User.avatar'

import { useAuth } from '../../hooks/auth/useAuth'

import useStyles from './styles'

export const Header: FC = () => {

    const styles = useStyles()
    const { logout } = useAuth()

    return (
        <AppBar position="static" color='transparent' >
            <Toolbar className={styles.toolbar}>
                <Box 
                    display='flex' 
                    justifyContent='space-between' 
                    width='300px'
                >
                    <UserAvatar />
                    <UploadForm />
                </Box>
                <Button 
                    variant='outlined' 
                    color='secondary'
                    onClick={logout} 
                >
                    Exit
                </Button>
            </Toolbar>
        </AppBar>
    )
}