import { api } from './api'

export const userApi = {
    me: async (token: string) => {
        try {

            const res = await api.post('/user/me', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.data

        } catch (err) {
            throw err
        }
    }
}