import React from 'react'
import { loginWithGoogle } from '../services/firebase'
import { FcGoogle } from "../assets/icons"

const Login = () => {

    const handleLogin = () => {
        loginWithGoogle()
    }

    return (
        <div onClick={handleLogin} className='bg-white h-10 px-4 rounded-lg cursor-pointer flex items-center justify-center font-semibold text-black gap-3'>
            <FcGoogle size={25} />
            <p className='text-sm'>Sign In With Google</p>
        </div>
    )
}

export default Login