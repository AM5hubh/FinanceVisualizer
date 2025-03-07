import { LoginForm } from '@/components/loginform'
import { SignupForm } from '@/components/signupform'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <LoginForm />
    </div>
  )
}

export default page