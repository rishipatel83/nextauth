'use client'
import { useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    // const [buttonDisabled, setButtonDisabled] = useState(true)
    
    const [loading, setLoading] = useState(false)

    const onLogin = async () =>{
        let toastId
        try {
            setLoading(true)
            toastId = toast.loading('Processing...')
            const response = await axios.post("/api/users/login", user)
            console.log("Login success ", response)
            console.log(response.data.message)
            toast.success("Login Successfully", { id: toastId })
            // router.push('/login')
            setTimeout(() => {
                router.push('/profile')
            }, 1000);

        } catch (error: any) {
            console.log("Login Failed")
            console.log(error.response.data.error)
            toast.error(error.response?.data?.error || "Something went wrong!", { id: toastId });
        } finally {
            setLoading(false)
        }
    }
    
    // useEffect(()=>{
    //     if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) setButtonDisabled(false)
    //     else setButtonDisabled(true)
    // },[user])

    const buttonDisabled = loading || !(user.email.length > 0 && user.password.length > 0);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <Toaster/>
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
                className= {`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                disabled = {buttonDisabled}
                onClick={onLogin}
            >
                {loading ? "Processing..." : "Login"}
            </button>
            <Link href='/signup' className='underline text-blue-400'>Signup Instead</Link>
        </div>
    )
}