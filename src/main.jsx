import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./views/Index/index"
import Welcome from "./views/Welcome/index"
import Quizzes from "./views/Quizzes/index"
import Answer from "./views/Answer/index"
import Admin from "./views/Admin/index"
import "./axios"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Welcome />
      },
      {
        path: "/quizzes",
        element: <Quizzes />
      },
      {
        path: "/myanswers",
        element: <Answer />
      },
      {
        path: "/admin",
        element: <Admin />
      },
    ]
  }
]);

//Bootstrap
import "./customStyle.scss"


//Sweetalert
import "./sweetalert"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
