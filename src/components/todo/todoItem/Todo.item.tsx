import React, { FC, useState } from 'react'
import { Card, CardContent, Typography, CardActions, IconButton, TextField, Box } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SendIcon from '@material-ui/icons/Send'

import useStyles from './styles'

interface ITodoItemProps {
    name: string
    onDeleteClick: () => void
    onUpdateClick: (inputVal: string) => void
}

export const TodoItem: FC<ITodoItemProps> = ({
    name,
    onDeleteClick,
    onUpdateClick
}) => {

    const [openInput, setOpenInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    
    const styles = useStyles()

    return (
        <Card className={styles.card}>
            <CardContent>
                <Typography 
                    variant='h5' 
                    gutterBottom
                >
                    {name}
                </Typography>
            </CardContent>
            <CardActions className={styles.actions}>
                {
                    openInput 
                    ?   <Box>
                            <TextField 
                                label='New name' 
                                variant='outlined' 
                                onChange={e => setInputValue(e.target.value)} 
                            />
                            <IconButton 
                                color='primary' 
                                onClick={() => onUpdateClick(inputValue)}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    :   <div />
                }
                <div>
                <IconButton 
                    color='primary' 
                    onClick={() => setOpenInput(!openInput)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    color='secondary' 
                    onClick={onDeleteClick}
                >
                    <DeleteIcon />
                </IconButton>
                </div>
            </CardActions>
        </Card>
    )
}