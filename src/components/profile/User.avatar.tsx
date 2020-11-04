import React, { FC, useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'

import { userApi } from '../../api/user.api'

import { IUser } from '../../interfaces/IAuth'

export const UserAvatar: FC = () => {

    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState('')
    
    const token = localStorage.getItem('authData')

    useEffect(() => {
        const getImage = async () => {

            if(!token) return

            try {

                const user: IUser = await userApi.me(token)

                setImg(user.img)
                setLoading(false)

            } catch (err) {
                console.log(err)
            }
        }
        
        getImage()



    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(loading) return <CircularProgress />
    
    return (
        <>
        {
            img
            ?  <img  
                    width='50px' 
                    height='50px' 
                    src={img} 
                    alt=""
                    style={{
                        borderRadius: '50%'
                    }}
                /> 
            :   <PersonIcon />
        }
        </>
        
    )
}