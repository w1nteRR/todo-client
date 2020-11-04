import React, { FC } from 'react'
import { Box } from '@material-ui/core'

import { FormDialog } from '../../components/todo/Form.dialog'
import { TodoList } from '../../components/todo/Todo.list'

import { TodoProvider } from '../../context/todo.context'

export const Profile: FC = () => {

    return (
        <TodoProvider>
            <Box p={3} >
                <FormDialog />
                <TodoList />
            </Box>
        </TodoProvider>
    )
}