import React from 'react'
import { LuLayoutGrid } from "react-icons/lu";
import {ListTodo,ClockArrowDown,TimerOff} from 'lucide-react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function MiniSideBar() {
  const [color,setColor]=useState({
    myTask:true,
    completedTask:false,
    progressTask:false,
    dueTask:false
  })


  const handletextColor=(task)=>{
    setColor({
      myTask:false,
      completedTask:false,
      progressTask:false,
      dueTask:false,
      [task]:true
    })

  }
  return (
    <div className='w-24 bg-white flex flex-col items-center space-y-10 pt-10'>
      <Link onClick={()=>handletextColor("myTask")} to={'/mytask'}><LuLayoutGrid className={`${color.myTask===true && "text-green-400"} h-6 w-6 hover:cursor-pointer hover:text-green-400 `}/> </Link>

      <Link onClick={()=>handletextColor("progressTask")} to={'on-progress-task'}> <ClockArrowDown className={`hover:cursor-pointer hover:text-green-400 ${color.progressTask===true && "text-green-400"}`}  size={27}/>  </Link>

      <Link onClick={()=>handletextColor("completedTask")} to={'completed-task'}> <ListTodo className={`hover:cursor-pointer $ hover:text-green-400 ${color.completedTask===true && "text-green-400"} ` }size={27}/>         </Link>
      
      <Link onClick={()=>handletextColor("dueTask")} to={"due-exceded"}> <TimerOff className={`${color.dueTask===true && "text-green-400"}  hover:cursor-pointer hover:text-green-400 `} size={27}/> </Link>
      
    

      
    </div>
  )
}
