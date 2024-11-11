import {  useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from './store/AuthStore'
import LoadingSpinner from './components/LoadingSpinner'


function App() {
  const [count, setCount] = useState(0)
  const{isAuthenticated,user,checkAuth,isCheckingAuth}=useAuthStore()
  const navigate=useNavigate()
  useEffect(()=>{
      fetchData()
  },[checkAuth,isAuthenticated])

  const fetchData=async()=>{
    await checkAuth()
    navigate("/mytask")
  }



  console.log(user,"isAuthencate--",isAuthenticated,"is checking Auth",isCheckingAuth);

  if(isCheckingAuth) return <LoadingSpinner/>
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative  overflow-hidden'>
      <Toaster/>
      <Outlet/>
    </div>
  )
}

export default App

