"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const AddTopic = () => {
  const [title, setTitle] = useState('');
  const [description, setDescripiton] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !description) {
      alert('Please enter both the values.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({title, description}),
      });

      if(res.ok) {
        router.push('/');
      }
      else {
        throw new Error("Failed to create Topic");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input onChange={(e) => {setTitle(e.target.value)}} value={title}className='border border-slate-500 px-8 py-2' type="text" placeholder='Title'/>

        <input onChange={(e) => {setDescripiton(e.target.value)}} value={description} className='border border-slate-500 px-8 py-2' type="text" placeholder='Topic Description'/>

        <button type='submit' className='bg-green-600 font-bold text-white py-2 px-6 w-fit rounded-md hover:bg-green-700 transition duration-300'>Add Topic</button>
    </form>
  )
}

export default AddTopic