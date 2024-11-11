import React from "react";
import { PiLineVerticalBold } from "react-icons/pi";
import { useTaskStore } from "../store/taskStore";
import logo from '../icons/logo.webp'
import { useAuthStore } from "../store/AuthStore";

export default function TaskSummary() {
  const {
    totalTask,
    inprogressTask,
    completedtask,
    dueexcededtask,
    statsLoader,
  } = useTaskStore();

  const {user}=useAuthStore()
  return (   

      <div className="w-80 bg-gray-60 px-4 py-3  mx-auto overflow-hidden">

        <div className="bg-gray-100 flex justify-start items-center h-28 rounded-xl mb-5 space-x-3 ">

          <div className="bg-custom-blue rounded-full h-fit px-5 py-3 ml-2">
            <img src={logo} />
          </div>

          <div>
            <p className="text-xl font-semibold">Hello, <br/> <span className=" text-2xl font-bold">{user.name}</span></p>
          </div>


        </div>

        <div className="flex flex-col">

          <div className="bg-white overflow-hidden grid grid-cols-2 w-full p-3 rounded-xl gap-y-3">

            <div className="flex flex-col">
              <p className="text-gray-500 text-lg">Total Tasks</p>
              <div className="flex flex-row w-full items-center justify-start">
                <PiLineVerticalBold className="text-purple-600 h-11 w-16 " />
                <h1 className="text-5xl ">{totalTask}</h1>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-lg">In Progress</p>
              <div className="flex flex-row justify-start items-center">
                <PiLineVerticalBold className="text-yellow-600 h-11 w-16 " />
                <h1 className="text-5xl">{inprogressTask}</h1>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-lg">Due Exceeds</p>
              <div className="flex flex-row justify-start items-center">
                <PiLineVerticalBold className="text-red-600 h-11 w-16 " />
                <h1 className="text-5xl">{dueexcededtask}</h1>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-lg">Completed</p>
              <div className="flex flex-row justify-start items-center">
                <PiLineVerticalBold className="text-green-600 h-11 w-16 " />
                <h1 className="text-5xl">{completedtask}</h1>
              </div>
            </div>

          </div>

        </div>

      </div>

  )
}
