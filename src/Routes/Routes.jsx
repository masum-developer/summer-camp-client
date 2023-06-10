import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import ClassesPage from "../pages/ClassesPage/ClassesPage";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import EnrolledClass from "../pages/Student/EnrolledClass/EnrolledClass";
import AllUser from "../pages/AllUser/AllUser";
import AddClass from "../pages/AddClass/AddClass";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>

            },
            {
                path: 'instructors-page',
                element: <InstructorsPage></InstructorsPage>
            },
            {
                path: 'classes-page',
                element: <ClassesPage></ClassesPage>

            },
            {
                path:'register',
                element:<Registration></Registration>
            },
            {
                path:'login',
                element:<Login></Login>
            }
        ],

    },
    {
        path: '/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            {
                path:'enrolled-class',
                element:<EnrolledClass></EnrolledClass>
            },
            {
                path:'allUser',
                element:<AllUser></AllUser>
            },
            {
                path:'addClass',
                element:<AddClass></AddClass>
            }
        ]
    }
]);