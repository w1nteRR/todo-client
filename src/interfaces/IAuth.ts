export interface IUserSignIn {
    email: string
    password: string
}

export interface IUserSignUp extends IUserSignIn {
    confirmPassword: string
}

export interface IUser {
    email: string
    img: string
}