import React, { useEffect, useState } from 'react'
import MiniSideBar from '../components/MiniSideBar'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import TaskSummary from '../components/TaskSummary'
import { useTaskStore } from '../store/taskStore'
import {Outlet} from 'react-router-dom'

export default function MyTask() {
   const {Alltask,isLoading,error,getAllTask}=useTaskStore()

  useEffect(()=>{
    getAllTask()
  },[])

  useEffect(()=>{
    console.log(Alltask);
  },[Alltask])
  return (
    <div className= 'flex flex-col min-h-screen min-w-full w-full h-full bg-white overflow-hidden'>
      <div>
        <Header/>
      </div>
      <div className='flex flex-1 flex-row pb-10'>
        <MiniSideBar/>
        <Outlet/>
        <TaskSummary/>
      </div>

    </div>
  )
}
