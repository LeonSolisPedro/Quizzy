import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./views/Index/index"
import Welcome, {loader as loaderWelcome } from "./views/Welcome/index"
import Quizzes from "./views/Quizzes/index"
import QuizzBuilder from "./views/Quizzes/quizzBuilder"
import Question from "./views/Quizzes/question"
import Setting from "./views/Quizzes/setting"
import Result from "./views/Quizzes/result"
import Comment from './views/Quizzes/comment'
import Answer, {loader as loaderAnswer } from "./views/Answer/index"
import Admin, {loader as loaderAdmin} from "./views/Admin/index"
import AnswerDetail, {loader as loaderAnswerDetail } from './views/Answer/answerDetail';
import ResultDetail from './views/Quizzes/resultDetail';
import QuizzDetail, { loader as loaderQuizzDetail } from './views/Welcome/quizzDetail';
import TagDetail, {loader as loaderTagDetail} from './views/Welcome/tagDetail';
import Responding, { loader as loaderResponding } from './views/Responding';
import { store } from './store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Welcome />,
        loader: loaderWelcome
      },
      {
        path: "/quizz/:quizzId",
        element: <QuizzDetail />,
        loader: loaderQuizzDetail
      },
      {
        path: "/welcome/tag/:tagId",
        element: <TagDetail />,
        loader: loaderTagDetail
      },
      {
        path: "/myquizzes",
        element: <Quizzes />
      },
      {
        path: "/myquizzes/:quizzId",
        element: <QuizzBuilder />,
        children: [
          {
            path: "/myquizzes/:quizzId",
            element: <Setting />
          },
          {
            path: "/myquizzes/:quizzId/questions",
            element: <Question />
          },
          {
            path: "/myquizzes/:quizzId/results",
            element: <Result />
          },
          {
            path: "/myquizzes/:quizzId/results/:userResponseId",
            element: <ResultDetail />
          },
          {
            path: "/myquizzes/:quizzId/comments",
            element: <Comment />
          }
        ]
      },
      {
        path: "/myanswers",
        element: <Answer />,
        loader: loaderAnswer
      },
      {
        path: "/myanswers/:userResponseId",
        element: <AnswerDetail />,
        loader: loaderAnswerDetail
      },
      {
        path: "/admin",
        element: <Admin />,
        loader: loaderAdmin
      },
    ]
  },
  {
    path: "/responding/:quizzId",
    element: <Responding />,
    loader: loaderResponding
  }
]);

//Bootstrap
import "./estilospedrito.scss"
import "bootstrap/js/src/dropdown"
import "bootstrap/js/src/modal"


//Sweetalert
import "./sweetalert"

//Axios
import "./axios"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
