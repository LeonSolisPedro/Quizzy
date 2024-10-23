import { Link, Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import LoginSignup from "../../components/loginsignup";
import { useSelector } from 'react-redux'


export default function Index() {
  const isLogged = useSelector((state) => state.user.isLogged)
  const isAdmin = useSelector((state) => state.user.isAdmin)

  return (
    <div>
      <Nav />
      <LoginSignup />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 px-sm-2 px-0 bg-dark">
            <aside id="awesome-nav">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
                <li className="nav-item">
                  <Link to={`/`} className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Welcome</span>
                  </Link>
                </li>
                {isLogged && (
                  <>
                    <li>
                      <Link to={`/myquizzes`} className="nav-link px-0 align-middle">
                        <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Quizzes</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/myanswers`} className="nav-link px-0 align-middle">
                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">My answers</span>
                      </Link>
                    </li>
                  </>
                )}
                {isAdmin && (
                  <li>
                    <Link to={`/admin`} className="nav-link px-0 align-middle">
                      <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Admin</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            </aside>
            
          </div>
          <div className="col-lg-10 p-3 p-sm-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}