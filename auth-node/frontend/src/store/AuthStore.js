import {create} from 'zustand'
import axios from 'axios'

const API_URL="http://localhost:5000/api/auth"

axios.defaults.withCredentials=true

export const useAuthStore=create((set)=>({
  user:null,
  isAuthenticated:false,
  error:null,
  isLoading:false,
  isCheckingAuth:true,
  message:null,

  signup : async (email,password,name)=>{
    set({isLoading:true , error:null})
    try{
      const response=await axios.post(`${API_URL}/signup`,{email,password,name})
      set({user:response.data.user,isAuthenticated:true,isLoading:false});
    }catch(error ){
      set({error:error.response.data.msg || "Error signing up",isLoading:false})
      throw error
    }
  },

  verifyEmail: async (code)=>{
    set({isLoading:true,error:null})
    try{
      const response=await axios.post(`${API_URL}/verify-email`,{code});
      set({user:response.data.user,isAuthenticated:true,isLoading:false})
      return response.data
    }catch(err){
      set({isLoading:false,error:err.response.data.msg || "error verifying email"})
      throw err      
    }
  },

  checkAuth: async()=>{
    set({isCheckingAuth:true, error:null})
    try{
      const response=await axios.get(`${API_URL}/check-auth`)
      set({isCheckingAuth:false,isAuthenticated:true,user:response.data.user})
    }catch(err){
      set({isAuthenticated:false,isCheckingAuth:false,error:null})
    }
  },

  login: async(email,password)=>{
    set({isLoading:true,error:null})
    try{
      const response=await axios.post(`${API_URL}/login`,{email,password})
      set({user:response.data.user,isAuthenticated:true,isLoading:false})
    }catch(err){
      set({error:err.response.data.msg || "login error",isLoading:false})
      throw err
    }
  },

  logout: async()=>{
    set({isLoading:true,error:null})
    try{
      const response=await axios.get(`${API_URL}/logout`)
      set({user:null,isAuthenticated:false,error:null,isLoading:false})
    }catch(err){
      set({error:null,isLoading:false,isAuthenticated:false})
      throw err
    }
  },

  forgotPassword: async(email)=>{
    set({isLoading:true,error:null})
    try{
      const response=await axios.post(`${API_URL}/forgot-password`,{email})
      set({isLoading:false,error:null,message:response.data.msg})
    }catch(err){
      console.log(err);
      set({error:err.response.data.msg,message:err.response.data.msg,isLoading:false})
      throw err
    }
  },

  resetPassword :async(password,confirmPassword,token)=>{
    set({isLoading:true,error:null})
    if(password !== confirmPassword) throw new Error("password does match with confirm password");
    try{
      const response=await axios.post(`${API_URL}/reset-password/${token}`,{password})
      set({message:response.data.msg,isLoading:false,error:null})
    }catch(err){
      set({isLoading:false,error:err.response.data.msg || err.message})
      throw err
    }
  }



}))