import { Link } from "react-router-dom";
import image from "../assets/quizzy.png"
import "./nav.css"


export default function Nav() {

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={image} alt="Logo" width="45" height="45" class="d-inline-block align-text-top logo-navbar-pedrito" />
          Quizzy
        </a>
        <p data-bs-toggle="modal" data-bs-target="#userLoginModal">Hello there</p>
      </div>
    </nav>
  )
}