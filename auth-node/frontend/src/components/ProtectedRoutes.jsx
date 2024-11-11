

import React from 'react'
import { useAuthStore } from '../store/AuthStore'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children}) {
    
   const {isAuthenticated,user}=useAuthStore()
   
   if(!isAuthenticated) return <Navigate to={'/login'} replace/>
   if(!user?.isVerified) return <Navigate to={'/verify-email'} />
    return children
}
