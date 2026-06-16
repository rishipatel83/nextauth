'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    // const [buttonDisabled, setButtonDisabled] = useState(true)
    
    const [loading, setLoading] = useState(false)

    const onSignup = async () =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success ", response)

            router.push('/login')

        } catch (error: any) {
            console.log("Signup Failed")
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    // useEffect(()=>{
    //     if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) setButtonDisabled(false)
    //     else setButtonDisabled(true)
    // },[user])

    const buttonDisabled = !(user.email.length > 0 && user.password.length > 0 && user.username.length > 0);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='mb-4 text-2xl'>{loading ? "Processing" : "Sign up"}</h1>
            <hr />
            <label htmlFor="username"></label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
                id='username'
                value = {user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                type="text" 
                placeholder='username'

            />
            <label htmlFor="email"></label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
                id='email'
                value = {user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                type="text" 
                placeholder='email'
            />
            <label htmlFor="password"></label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
                id='password'
                value = {user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                type="password"
                placeholder='password'
            />

            <button
                className= {`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled = {buttonDisabled}
                onClick={onSignup}
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href='/login' className='underline text-blue-400'>Login Instead</Link>
        </div>
    )
}