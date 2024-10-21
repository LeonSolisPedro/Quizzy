import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../store/user"
import Modal from "bootstrap/js/src/modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Toast from "../sweetalert";
import axios from "axios";


export default function LoginSignup() {


  //Handles modal stuff
  const isLogged = useSelector((state) => state.user.isLogged)
  const [pageType, setPageType] = useState("login")
  useEffect(() => {
    if (isLogged == false) {
      const userModal = document.querySelector("#userLoginModal");
      const modal = Modal.getOrCreateInstance(userModal)
      modal.show();
      setPageType("login")
    }
  }, []);


  //Handles user creation form and login
  const [disableForm, setDisableForm] = useState(false);
  const [user, setUser] = useState({ name: "", URLImage: "", email: "", password: "" })
  const updateUser = (newProperty, value) => {
    const newUser = { ...user, [newProperty]: value }
    setUser(newUser)
  }
  const resetForm = () => {
    setDisableForm(false)
    setUser({ id: 0, name: "", URLImage: "", email: "", password: "" })
    setImage("https://i.ibb.co/NmMYhQN/i.jpg")
    setImageBase64(null)
  }


  //Login
  const [showAlert, setShowAlert] = useState("");
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault();
    setDisableForm(true);
    try {
      const response = await axios.post("/api/login", { email: user.email, password: user.password })
      setupRedux(response)
      const userModal = document.querySelector("#userLoginModal");
      const modal = Modal.getOrCreateInstance(userModal)
      modal.hide();
    } catch (error) {
      setShowAlert(error.response.data.message)
    } finally {
      setDisableForm(false);
    }
  }
  const setupRedux = (response) => {
    resetForm()
    setShowAlert("")
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common = { 'Authorization': `bearer ${response.data.token}` }
    dispatch(login(response.data.user))
  }

  //Register
  const name = useSelector((state) => state.user.name)
  const URLImage = useSelector((state) => state.user.URLImage)
  const handleSignUp = async (event) => {
    event.preventDefault();
    setDisableForm(true);
    try {
      let urlImage = "https://i.ibb.co/NmMYhQN/i.jpg"
      if (imageBase64) {
        const formData = new FormData();
        formData.append("image", imageBase64)
        const result = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGKEY}`, formData)
        urlImage = result.data.data.display_url
      }
      const newUser = { ...user, URLImage: urlImage }
      await axios.post("/api/register", newUser)
      const response = await axios.post("/api/login", { email: user.email, password: user.password })
      setupRedux(response)
      setPageType("welcome")
    } catch (error) {
      Toast.fire({ icon: "error", title: error.response.data.message })
    } finally {
      setDisableForm(false);
    }
  }


  //Image stuff
  const [image, setImage] = useState("https://i.ibb.co/NmMYhQN/i.jpg")
  const [imageBase64, setImageBase64] = useState(null)
  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageBase64(await toBase64(event.target.files[0]))
    }
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
  });

  return (
    <div class="modal" id="userLoginModal" tabIndex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            {pageType === "login" && (
              <>
                <h4 className="text-center mt-3 mb-4">Please login to continue</h4>
                {showAlert && (
                  <div className="alert card-maximum-500 alert-danger alert-dismissible" role="danger">
                    <div>{showAlert}</div>
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="example@example.com" value={user.email} onChange={e => updateUser("email", e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={user.password} onChange={e => updateUser("password", e.target.value)} required />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={disableForm}>Login</button>
                  </div>
                </form>
                <p className="mt-3 text-center mb-1">Don't have an account? <span className="logincolor" onClick={() => setPageType("signup")}>Sign Up Here</span></p>
                <p data-bs-dismiss="modal" className="text-center mb-0" style={{ fontSize: "13px", cursor: "pointer" }}><small>Continue without an account</small></p>
              </>
            )}
            {pageType === "signup" && (
              <>
                <h4 className="text-center mt-3 mb-4">Register your account</h4>
                <form onSubmit={handleSignUp}>
                  <div className="text-center mb-3">
                    <label className="imagelabelsignup" for="file-upload">
                      <img class="image-pedro-settings rounded" src={image} />
                      <button className="btn btn-light btn-sm"><FontAwesomeIcon icon={faPen} /></button>
                    </label>
                  </div>
                  <input id="file-upload" onChange={onImageChange} type="file" accept="image/png, image/jpeg" hidden />
                  <div className="mb-3">
                    <label className="form-label">Enter your name</label>
                    <input type="text" className="form-control" placeholder="Name" value={user.name} onChange={e => updateUser("name", e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="example@example.com" value={user.email} onChange={e => updateUser("email", e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={user.password} onChange={e => updateUser("password", e.target.value)} required />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={disableForm}>Register</button>
                  </div>
                </form>
                <p className="mt-3 text-center mb-1">Already have an account? <span className="logincolor" onClick={() => setPageType("login")}>Login here</span></p>
              </>
            )}

            {pageType === "welcome" && (
              <>
              <h4 className="mt-5 mb-4 text-center">Welcome {name}!</h4>
              <img class="image-pedro-settings rounded d-block mx-auto" src={URLImage} />
              <p className="text-center mt-4">Explore and create any quizzes<br /> you want</p>
              <button data-bs-dismiss="modal" className="btn btn-sm btn-light d-block mx-auto mb-3">Continue</button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}