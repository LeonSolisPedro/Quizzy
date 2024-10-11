import { Link } from "react-router-dom";


export default function Index() {
  return (
    <div class="card">
      <div class="card-header">
          <h2 className="card-title">You quizzes</h2>
          <button className="btn btn-primary">Add Quizz</button>
      </div>
      <div className="card-body">
        <Link to={`1`}>Go to quizz 1</Link>
      </div>
    </div>
  )
}