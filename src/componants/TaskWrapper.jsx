
import Task from './Task'
import logo from '../assets/stm.png'
import { useState } from 'react'
const TaskWrapper = () => {

  const [search,setSearch] = useState('')
  return (
    <div className='flex flex-row justify-center items-center h-screen'>
      <div style={{ backgroundColor: '#C7FFB9' }} className="bg-transparent border border-solid h-screen border-red-300 p-4 ">
        <div className='w-fit m-auto bg-transparent'>
          <h1 className="text-white text-3xl font-serif py-auto">
            <img src={logo} className='object-cover w-fit h-full shadow-lg' alt="" />
          </h1>
        </div>
        <div className='flex justify-center'>
          <input onChange={(e)=>setSearch(e.target.value)} className='border border-gray-300 rounded-lg  mx-auto my-5 p-1' placeholder='Search here...' type="text" />
        </div>
      </div>
      <div className='w-full'>
        <Task search={search} />
      </div>
    </div>
  )
}

export default TaskWrapper
