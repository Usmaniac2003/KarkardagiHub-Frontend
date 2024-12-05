import React from 'react'
import Logo from "../../assets/Logo KH.png"
import { useAuth } from '../../context/Auth'
import { capitalize } from '@mui/material'
function Navbar() {
    const { user } = useAuth()
  return (
    <div className='h-[14vh] py-4 px-8 bg-[#256CC2] flex justify-between items-center'>
      <img src={Logo} alt="" className='w-48' />
      <h1 className='text-white text-2xl'>{ capitalize(user?.username)}</h1>
    </div>
  )
}

export default Navbar
