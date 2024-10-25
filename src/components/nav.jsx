import { Link, useNavigate } from "react-router-dom";
import image from "../assets/quizzy.png"
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavBar, logout as logoutAction } from "../store/user"
import "./nav.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";


export default function Nav() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const URLImage = useSelector((state) => state.user.URLImage)
  const isLogged = useSelector((state) => state.user.isLogged)


  const logout = () => {
    dispatch(logoutAction())
    localStorage.removeItem("token")
    delete axios.defaults.headers.common['Authorization'];
    navigate("/")
  }


  //Suggestions
  const [suggestionList, setSuggestionList] = useState([]);
  const search = async (event) => {
    await new Promise(r => setTimeout(r, 1000));
    setSuggestionList([{id:1, name: "Results are here..."}])
  };

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

        <AutoComplete
        field="name"
        suggestions={suggestionList}
        completeMethod={search}
        className="awesomefinder"
         />
        


        <div class="dropstart pointer" data-bs-toggle="dropdown" >
          <img className="image-50" src={URLImage} />
          <ul class="dropdown-menu">
            {isLogged == true &&(
              <li><button onClick={logout} class="dropdown-item">Logout</button></li>
            )}
            {isLogged == false &&(
              <li><button data-bs-toggle="modal" data-bs-target="#userLoginModal" class="dropdown-item">Login</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}