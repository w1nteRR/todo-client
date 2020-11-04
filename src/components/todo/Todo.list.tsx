import React, { FC, useEffect, useState } from 'react'
import { Container, Box, LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import { TodoItem } from './todoItem/Todo.item'

import { todoApi } from '../../api/todo.api'

import { ITask } from '../../interfaces/ITask'
import { useTodoState } from '../../context/todo.context'

export const TodoList: FC = () => {
    
    const [tasks, setTasks] = useState<Array<ITask>>([])
    const [loading, setLoading] = useState(true)

    const { refreshFeed } = useTodoState()

    const token = localStorage.getItem('authData')

    useEffect(() => {
       
        let cleanUp = false
        
        const fetch = async () =>{
            try {

                const tasks = await todoApi.getMy(token!)

                if(!cleanUp) {
                    setTasks(tasks)
                    setLoading(false)
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetch()
        setLoading(true)

        return () => {
            cleanUp = true
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshFeed])

    const _removeTask = async (taskId: string) => {
        try {

            await todoApi.remove(taskId, token!)

            const newTasks = tasks.filter(task => task._id !== taskId)

            setTasks(newTasks)

        } catch (err) {
            console.log(err)
        }
    }

    const _updateTask = async (_id: string, name: string) => {
        try {

            await todoApi.edit({ _id, name }, token!)

            const newTasks = tasks.map(task => task._id === _id ? {...task, name} : task)

            setTasks(newTasks)

        } catch (err) {
            console.log(err)
        }        
    }

    if(loading) return (
        <Box m={10}>
            <LinearProgress />
        </Box>
    )

    if(!tasks.length) return (
        <Box m={10}>
            <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                <strong>No tasks</strong>
            </Alert>
        </Box>
    )
    
    return (
        <Container maxWidth='sm'>
            {
                tasks.map(task => 
                    <TodoItem 
                        name={task.name} 
                        key={task._id} 
                        onDeleteClick={() => _removeTask(task._id)}
                        onUpdateClick={name => _updateTask(task._id, name)}
                    />
                )
            }   
        </Container>
    )
}