import { Link } from "react-router-dom";


export default function Index() {
  return (
    <div class="card">
      <div class="card-header">
          <h2 className="card-title">List of users</h2>
          <button className="btn btn-primary">Add User</button>
      </div>
      <div className="card-body">
        <p className="supercolor">Hello there</p>
      </div>
    </div>
  )
}