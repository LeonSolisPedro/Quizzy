import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./views/Index/index"
import Welcome from "./views/Welcome/index"
import Quizzes from "./views/Quizzes/index"
import QuizzBuilder from "./views/Quizzes/quizzBuilder"
import Question from "./views/Quizzes/question"
import Setting from "./views/Quizzes/setting"
import Result from "./views/Quizzes/result"
import Comment from './views/Quizzes/comment'
import Answer from "./views/Answer/index"
import Admin from "./views/Admin/index"
import AnswerDetail from './views/Answer/answerDetail';
import ResultDetail from './views/Quizzes/resultDetail';
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
        path: "/quizzes/:quizzId",
        element: <QuizzBuilder />,
        children: [
          {
            path: "/quizzes/:quizzId",
            element: <Setting />
          },
          {
            path: "/quizzes/:quizzId/questions",
            element: <Question />
          },
          {
            path: "/quizzes/:quizzId/results",
            element: <Result />
          },
          {
            path: "/quizzes/:quizzId/results/:userResponseId",
            element: <ResultDetail />
          },
          {
            path: "/quizzes/:quizzId/comments",
            element: <Comment />
          }
        ]
      },
      {
        path: "/myanswers",
        element: <Answer />
      },
      {
        path: "/myanswers/:userResponseId",
        element: <AnswerDetail />
      },
      {
        path: "/admin",
        element: <Admin />
      },
    ]
  }
]);

//Bootstrap
import "./estilospedrito.scss"
import "bootstrap/js/src/dropdown"
import "bootstrap/js/src/modal"


//Sweetalert
import "./sweetalert"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
