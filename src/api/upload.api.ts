import { api } from './api'

export const uploadApi = {
    upload: async (formData: FormData, token: string) => {
        try {

            await api.post('/file/upload', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (err) {
            throw err
        }
    }
}