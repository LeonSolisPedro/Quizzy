import { Link, Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import "./index.css"


export default function Index() {

  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                <li className="nav-item">
                  <Link to={`/`} className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Welcome</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/quizzes`} className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Quizzes</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/myanswers`} className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">My answers</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/admin`} className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Admin</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}