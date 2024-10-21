import { Link } from "react-router-dom";


export default function Nav() {

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/`}>Logo</Link>
        <p data-bs-toggle="modal" data-bs-target="#userLoginModal">Hello there</p>
      </div>
    </nav>
  )
}