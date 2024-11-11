import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useTaskStore } from "../store/taskStore";
import moment from 'moment'
import CreateTaskPage from "./CreateTaskPage";
import UpdateTaskPage from "./UpdateTaskPage";

export default function OnProgressPage() {

  const [filter,setFilter]=useState('all')
  const [createPopUp,setCreatePopUp]=useState(false)
  const [updatePopUp,setUpdatePopUp]=useState(false)

  const{Alltask,isLoading,error,handleTaskStatus,deleteTask,setCurrentId}=useTaskStore()

  if(isLoading) return (
    <div className="overflow-hidden max-h-60 max-w-full p-3 text-center border-2 text-gray-500 border-dotted border-black rounded-lg  hover:bg-gray-400 flex items-center justify-center font-medium
    text-xl">
      <div>
        Add new Task
      </div>
    </div>
  )

  if(error) return <Page400/>

  const handleUpdate=(id)=>{
      setCurrentId(id)
      setUpdatePopUp(true)
  }

  return (

    <div className="flex flex-1 flex-col bg-gray-100 border rounded-2xl p-5 space-y-4">
      <div className="flex flex-row justify-between h-fit items-center min-w-full w-full">
        <h2 className="text-2xl font-bold">Due Date exceded Tasks</h2>
        <div className="flex flex-row justify-between border rounded-lg p-2 space-x-8 h-fit items-center text-sm font-medium text-gray-500 bg-white">
          <p className={`hover:text-green-400 hover:cursor-pointer ${filter==='all' && "text-green-400"}`} onClick={()=>setFilter('all')}>All</p>
          <p className={`${filter==='low' && "text-green-400"} hover:text-green-400 hover:cursor-pointer`} onClick={()=>setFilter('low')}>Low</p>
          <p className={`${filter==='medium' && "text-green-400"} hover:text-green-400 hover:cursor-pointer`} onClick={()=>setFilter('medium')}>Medium</p>
          <p className={`${filter==='high' && "text-green-400"} hover:text-green-400 hover:cursor-pointer`} onClick={()=>setFilter('high')}>High</p>
        </div>
      </div>

      <div className=" flex flex-1">
        <div className="grid md:grid-cols-2 mt-5  sm:grid-cols-1 lg:grid-cols-3 grid-cols-1 gap-4  overflow-hidden w-full overflow-y-scroll h-[65vh]">
          {
            Alltask && Alltask.length>0?
             Alltask.map((task,index)=>{

              const filTask=filter
              const completedStatus=task.completed===true?"text-yellow-400":"text-gray-300"
              const priority=task.priority==="high"?"text-red-600":task.priority==="medium"?"text-yellow-400":"text-green-500"
              const date=moment(task.dueDate).format('dddd');
              const dueExceded=(moment().isAfter(task.dueDate) && task.completed===false)?true:false
              const backdrop=dueExceded===true?"bg-red-200":"bg-white"
              
              if(dueExceded){
                if(filter==='all' || filTask===task.priority)
              return(
              <div key={task._id} className={` overflow-hidden lg:h-60 max-w-full  p-3 ${backdrop} border rounded-lg flex flex-col justify-between`}>
              <div >
                <h1 className="text-2xl font-semibold">{task.title}</h1>
                <p>{task.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>{date}</p>
                <p className={`${priority} font-medium`}>{task.priority}</p>
                <div className="flex justify-between gap-3 items-center  ">
                  <FaStar className={`${completedStatus} h-6 w-6 hover:cursor-pointer`} onClick={()=>handleTaskStatus(task._id,task.completed)}/>
                  <FaEdit  className="text-sky-500 h-5 w-5 hover:cursor-pointer" onClick={()=>handleUpdate(task._id)}/>
                  <MdDeleteForever className="text-red-600 w-6 h-6 hover:cursor-pointer" onClick={()=>deleteTask(task._id)}/>
                </div>
              </div>
            </div>)
          else return null  
          }
             return null
             })
            : null
          } 
              <div onClick={()=>setCreatePopUp(!createPopUp)} className="overflow-hidden lg:h-60 max-w-full p-3 text-center border-2 text-gray-500 border-dotted border-black rounded-lg  hover:bg-gray-400 flex items-center justify-center font-medium
              text-xl">
                <div>
                  Add new Task
                </div>
              </div>

              {createPopUp && <CreateTaskPage setCreatePopUp={setCreatePopUp}/>}

              {updatePopUp && <UpdateTaskPage setUpdatePopUp={setUpdatePopUp} />}
            
        </div>
      </div>
    </div>

    
  );
}

