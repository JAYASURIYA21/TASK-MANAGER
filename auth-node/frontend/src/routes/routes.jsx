import {createBrowserRouter} from 'react-router-dom'
import Home from '../pages/DashBoardPage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import App from '../App'
import EmailVerificationPage from '../pages/EmailVerificationPage'
import ReDirectAuthenticatedUser from '../components/ReDirectAuthenticatedUser'
import DashBoardPage from '../pages/DashBoardPage'
import ProtectedRoute from '../components/ProtectedRoutes'
import ForgetPassword from '../pages/ForgetPassword'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import MyTask from '../pages/MyTask'
import MainContent from '../components/MainContent'
import CompletedTaskPage from '../components/CompletedTaskPage'
import OnProgressPage from '../components/OnProgressPage'
import DueTimeExceded from '../components/DueTimeExceded'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
      path:"signup",
      element:
        (<ReDirectAuthenticatedUser>
          <SignUpPage/>
        </ReDirectAuthenticatedUser>)
      },
      {
        path:"login",
        element:
        <ReDirectAuthenticatedUser>
          <LoginPage/>
        </ReDirectAuthenticatedUser>
        
      },
      {
        path:"verify-email",
        element:<EmailVerificationPage/>
      },
      {
        path:"forgot-password",
        element:( <ReDirectAuthenticatedUser>
          <ForgetPassword/>
        </ReDirectAuthenticatedUser>)
        
      },
      {
        path:"/reset-password/:token",
        element:(<ReDirectAuthenticatedUser>
          <ResetPasswordPage/>
        </ReDirectAuthenticatedUser>)
      },
      {
        path:"myTask",
        element:(<ProtectedRoute>
          <MyTask/> 
        </ProtectedRoute>)
        ,
        children:[
          {
            path:"",
            element:<MainContent/>
          },
          {
            path:"completed-task",
            element:(<ProtectedRoute>
              <CompletedTaskPage/>
            </ProtectedRoute>)
          },
          {
            path:"on-progress-task",
            element:(<ProtectedRoute>
              <OnProgressPage/>
            </ProtectedRoute>)
          },{
            path:"due-exceded",
            element:(<ProtectedRoute>
              <DueTimeExceded/>
              
            </ProtectedRoute>)
          },{
            path:"dashboard",
            element:<DashBoardPage/>
          }
        ]
      }
  ]

  }
])

export default router

