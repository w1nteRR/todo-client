import { api } from './api'

import { IUserSignIn, IUserSignUp } from '../interfaces/IAuth'


export const authApi = {
    signUp: async (candidate: IUserSignUp) => {
        try {

            const res = await api.post('/auth/signup', {
                ...candidate
            })

            return res.data

        } catch (err) {
            throw err
        }
    },
    signIn: async (candidate: IUserSignIn) => {
        try {

            const token = await api.post('/auth/signin', {
                ...candidate
            })

            return token.data

        } catch (err) {
            throw err
        }
    }
}