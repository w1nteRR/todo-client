import { ITask } from '../interfaces/ITask'
import { api } from './api'

export const todoApi = {
    create: async (name: string, token: string) => {
        try {

            await api.post('/todo/create', 
            {
                name
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (err) {
            throw err
        }
    },
    getMy: async (token: string) => {
        try {

            const res = await api.post('/todo/getMy', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.data

        } catch (err) {
            throw err
        }
    },
    remove: async (_id: string, token: string) => {
        try {

            const res = await api.post('/todo/remove', 
            {
                _id
            }, 
            {  
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.status

        } catch (err) {
            throw err
        }
    },
    edit: async (task: ITask, token: string) => {
        try {

            await api.put('/todo/edit', 
            {
                ...task
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (err) {
            throw err
        }
    }
}