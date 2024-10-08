import { Link, Outlet } from "react-router-dom";


export default function Builder(){
  return (
    <div>
      <p>This is the builder view where the quizz is created</p>
      <ul>
        <li><Link to={``}>Settings</Link></li>
        <li><Link to={`questions`}>Questions</Link></li>
        <li><Link to={`results`}>Results</Link></li>
        <li><Link to={`comments`}>Comments</Link></li>
      </ul>
      <Outlet />
    </div>
  )
}