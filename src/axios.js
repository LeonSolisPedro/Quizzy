import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API

const token = localStorage.getItem("token")
if(token)
  axios.defaults.headers.common = {'Authorization': `bearer ${token}`}