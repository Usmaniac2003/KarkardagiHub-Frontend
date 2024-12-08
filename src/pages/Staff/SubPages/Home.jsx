import React from 'react'
import { useAuth } from '../../../context/Auth'

function Home() {
    const { user } = useAuth()
    console.log(user)
  return (
    <div>
      {user.id}
    </div>
  )
}

export default Home
