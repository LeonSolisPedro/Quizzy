import { Link } from "react-router-dom";
import image from "../assets/quizzy.png"
import { useDispatch } from 'react-redux'
import { toggleNavBar } from "../store/user"
import "./nav.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


export default function Nav() {
  const dispatch = useDispatch()

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="cutehamburger" onClick={() => dispatch(toggleNavBar())}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <Link to={`/`} class="navbar-brand d-flex align-items-center gap-2">
            <img src={image} alt="Logo" width="45" height="45" class="d-inline-block align-text-top logo-navbar-pedrito" />
            Quizzy
          </Link>
        </div>

        <p data-bs-toggle="modal" data-bs-target="#userLoginModal">Hello there</p>
      </div>
    </nav>
  )
}