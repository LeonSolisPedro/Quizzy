import { Link, Outlet } from "react-router-dom";


export default function Builder() {
  return (
    <div class="card">
      <div class="card-header">
        <h2 className="card-title">Quizz 1</h2>
        <Link id="return" to={`/quizzes`} className="btn btn-secondary">Return</Link>
        <Link id="returnresults" to={`results`} className="btn btn-secondary d-none">Return</Link>
      </div>
      <div className="card-body container">
        <div className="row">
          <div className="col-2">
            <nav class="nav flex-column nav-quizzbuilder">
              <Link class="nav-link" to={``}>Settings</Link>
              <Link class="nav-link" to={`questions`}>Questions</Link>
              <Link class="nav-link" to={`results`}>Results</Link>
              <Link class="nav-link" to={`comments`}>Comments</Link>
            </nav>
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}