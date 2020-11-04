import React, { FC, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { todoApi } from '../../api/todo.api'

import { useTodoDispatch } from '../../context/todo.context'

export const FormDialog: FC = () => {

    const [isOpen, setOpen] = useState(false)
    const [input, setInput] = useState('')

    const dispatch = useTodoDispatch()
    
    const _open = () => setOpen(true)
    const _close = () => setOpen(false)

    const token = localStorage.getItem('authData')

    const _send = async () => {
        try {
            
            await todoApi.create(input, token!)
            
            _close()

            dispatch({
                type: 'refresh_feed'
            })

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={_open}
                startIcon={<AddIcon />}
            >
                Add new task
            </Button>
            <Dialog 
                open={isOpen} 
                onClose={_close} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Input task name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Task"
                        type="text"
                        onChange={e => setInput(e.target.value)}
                        style={{
                            width: 200
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={_close} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={_send}>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}