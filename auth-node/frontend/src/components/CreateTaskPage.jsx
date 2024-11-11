import React, { useEffect, useRef, useState } from 'react'
import { useTaskStore } from '../store/taskStore'
import toast from 'react-hot-toast'

export default function CreateTaskPage({setCreatePopUp}) {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [priority,setPriority]=useState("low")
  const [dueDate,setDuedate]=useState("")
  const {createTask}=useTaskStore()

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setCreatePopUp(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      await createTask(title,description,dueDate,priority)
      setTitle("")
      setDescription("")
      setDuedate("")
      setPriority("low")
      toast.success("task created")
    }catch(err){
      console.log(err);  
    }
  }

 

  return (
    <div className='fixed  inset-0 bg-opacity-50  bg-gray-600 flex justify-center items-center'>
      <div ref={modalRef} className='w-2/6 bg-white shadow-md border rounded-lg p-4  flex flex-col' onClick={(e)=>e.stopPropagation()}>
         <h1 className='text-3xl font-bold text-center mb-4'>Create Task</h1>
         <form action="handleSubmit" className='flex flex-col space-y-4'>
          <input onChange={(e)=>setTitle(e.target.value)} type='text' name='title' placeholder='Enter Title' value={title}  className='text-black border-2 bg-gray-100 border-gray-300 p-2 rounded-md placeholder:text-lg placeholder:text-gray-500 placeholder:pl-2' />

          <input onChange={(e)=>setDescription(e.target.value)} type='text' name='description' placeholder='Enter description' value={description} className='h-28 border-2 bg-gray-100 border-gray-300 p-2 rounded-md placeholder:text-lg placeholder:text-gray-500 placeholder:pl-2 '/>

          <div className='flex space-y-1 flex-col'>
          <label  className='text-lg'>Priority</label>
          <select onChange={(e)=>setPriority(e.target.value)} value={priority} className='border-2 w-full bg-gray-100 border-gray-300 p-2 rounded-md placeholder:text-lg placeholder:text-gray-500 placeholder:pl-2'>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          </div>

          <div className='flex flex-col space-y-1'>
          <label className='text-lg'>Due Date</label>
          <input type='date' value={dueDate} onChange={(e)=>setDuedate(e.target.value)} className='w-full border-2 bg-gray-100 border-gray-300 p-2 rounded-md placeholder:text-lg placeholder:text-gray-500 placeholder:pl-2'/>
          </div>
          <button className='bg-green-400 p-2 rounded-lg text-white font-semibold text-lg' onClick={handleSubmit}>Create Task</button>
         </form>
      </div>

    </div>
  )
}
