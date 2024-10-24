import { Link, Outlet } from "react-router-dom";
import Nav from "../../components/nav";
import LoginSignup from "../../components/loginsignup";
import { toggleNavBar } from "../../store/user"
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileSignature, faHouse, faSquareCheck, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";


export default function Index() {
  const isLogged = useSelector((state) => state.user.isLogged)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const showNavBar = useSelector((state) => state.user.showNavBar)
  const dispatch = useDispatch()

  return (
    <div>
      <Nav />
      <LoginSignup />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 px-sm-2 px-0 bg-awesome-nav">
            <aside id="awesome-nav" className={showNavBar ? 'active-nav' : ''}>
             <FontAwesomeIcon className="closenav d-lg-none" style={{color: "#D6D6D6"}} icon={faXmark} onClick={() => dispatch(toggleNavBar())} />
              <div className="d-flex flex-column align-items-start px-3 pt-2 text-white min-vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start">
                  <li className="nav-item">
                    <Link to={`/`} className="nav-link align-middle px-0" onClick={() => dispatch(toggleNavBar())}>
                      <FontAwesomeIcon icon={faHouse} /> <span className="ms-1">Welcome</span>
                    </Link>
                  </li>
                  {isLogged && (
                    <>
                      <li>
                        <Link to={`/myquizzes`} className="nav-link px-0 align-middle" onClick={() => dispatch(toggleNavBar())}>
                          <FontAwesomeIcon icon={faFileSignature} /> <span className="ms-1">Quizzes</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/myanswers`} className="nav-link px-0 align-middle" onClick={() => dispatch(toggleNavBar())}>
                          <FontAwesomeIcon icon={faCheck} /> <span className="ms-1">My answers</span>
                        </Link>
                      </li>
                    </>
                  )}
                  {isAdmin && (
                    <li>
                      <Link to={`/admin`} className="nav-link px-0 align-middle" onClick={() => dispatch(toggleNavBar())}>
                        <FontAwesomeIcon icon={faUser} /> <span className="ms-1">Admin</span>
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