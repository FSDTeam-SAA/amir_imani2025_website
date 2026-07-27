import Login from '@/components/auth/login'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  )
}

export default page
