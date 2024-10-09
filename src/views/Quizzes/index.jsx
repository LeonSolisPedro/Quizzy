import { Link } from "react-router-dom";


export default function Index() {
  return (
    <div>
       <p>This is the index of Quizzes</p>
      <Link to={`1`}>Go to quizz 1</Link>
    </div>
  )
}