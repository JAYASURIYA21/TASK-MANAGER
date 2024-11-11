import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'
axios.defaults.withCredentials=true
import moment from 'moment'

const API_URL="http://localhost:5000/api/task"

export const useTaskStore=create((set,get)=>({
  Alltask:[],
  isLoading:false,
  error:null,
  message:null,
  currentTaskId:null,
  currentTask:null,
  totalTask:null,
  inprogressTask:null,
  completedtask:null,
  dueexcededtask:null,
  statsLoader:false,  

  getAllTask:async()=>{
    set({isLoading:true,error:null,Alltask:null})
    try{
    const response=await axios.get(`${API_URL}/get-alltask`)
    set({Alltask:response.data.tasks,isLoading:false,error:null})
    get().getStats()
    }catch(err){
      set({isLoading:false,error:err.response.data.msg})
      console.log(err);
      throw err
    }
  },

  handleTaskStatus:async(taskId,completedStatus)=>{
    set({message:null,error:null})
    try{
      completedStatus=!completedStatus
      const response=await axios.put(`${API_URL}/update-task/${taskId}`,{completed:completedStatus})
      set((state)=>({
        Alltask:state.Alltask.map(task=>task._id===taskId?{...task,completed:completedStatus}:task),
        message:"task completed"
      }))
      get().getStats()
      
    }catch(err){
      console.log(err);
    }
  },

  deleteTask:async(taskId)=>{
    set({error:null,message:null})
    try{
      await axios.delete(`${API_URL}/delete-task/${taskId}`)
      set((state)=>({
        Alltask:state.Alltask.filter(task=>task._id !==taskId),
        message:"task deleted"
      }))
      toast.success("task deleted")
      get().getState()
      
    }catch(err){
      console.log(err);
      set({error:err.message})
    }
  },

  createTask:async(title,description,dueDate,priority)=>{
    set({message:null,error:null})
    try{
    const response=await axios.post(`${API_URL}/create-task`,{title,description,dueDate,priority})
    set((state)=>({
      Alltask:[...state.Alltask,response.data.task],
      message:"task created "
      })
    )
    get().getStats()
  }catch(err){
    set({error:err.response.data.message})
    console.log(err);
    throw err
  }
  },

  setCurrentId:(id)=>set({currentTaskId:id}),

  getOneTask:async(id)=>{
    try{
    const response=await axios.get(`${API_URL}/get-one-task/${id}`)
    set({currentTask:response.data.task})
    }catch(err){
      console.log(err);
      throw err
      
    }

  },

  updateTask: async(title,description,dueDate,priority,currentTaskId)=>{
    set({error:null,message:null})
    try{
      const response=await axios.put(`${API_URL}/update-task/${currentTaskId}`,{title,description,dueDate,priority})
      console.log(response);
      
      set((state)=>({
        Alltask:state.Alltask.map((task)=>task._id===currentTaskId?response.data.updatedTask:task),
        currentTaskId:null,
        currentTask:null,
        message:"task updated"
      }))
      get().getStats()

    }catch(err){
      set({error:err.data})
      console.log(err);
      throw err
    }

  },


  getStats:()=>{
    
    set({statsLoader:true})
    const {Alltask}=get()
    const totalTask=Alltask.length
    
    
    const completedtask=Alltask.filter((task)=>task.completed).length
    const inprogressTask=totalTask-completedtask
    const dueexcededtask=Alltask.filter((task)=>{
        const dueExceded=(moment().isAfter(task.dueDate) && task.completed===false)?true:false
        if(dueExceded) return(task)
        return null
      }).length

      set({totalTask,completedtask,inprogressTask,dueexcededtask,statsLoader:false}) 

  }


})) 