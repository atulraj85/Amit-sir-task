"use client"

import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-slate-800 px-8 py-3'>
        <Link className='text-white font-bold text-xl' href = {'/'}>Aman Code</Link>
        <Link className='bg-white p-2 rounded-xl hover:bg-slate-600 hover:text-white transition duration-400 hover:scale-105' href = {'/addTopic'}>Add Topic</Link>
    </nav>
  )
}

export default Navbar