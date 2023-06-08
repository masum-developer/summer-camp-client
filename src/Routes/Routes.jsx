import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import ClassesPage from "../pages/ClassesPage/ClassesPage";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element:<Home></Home>

        },
        {
            path:'instructors-page',
            element:<InstructorsPage></InstructorsPage>
        },
        {
            path:'classes-page',
            element:<ClassesPage></ClassesPage>

        }
      ]
    },
  ]);