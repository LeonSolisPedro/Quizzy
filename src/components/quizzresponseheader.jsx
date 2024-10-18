import { useState } from "react";


export default function QuizzReponseHeader({userResponseParam}){
  const [userResponse, setUserReponse] = useState(userResponseParam)

  const formatDate = (date) => {
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return (
    <div>
      <div className="container-fluid card border-0 cardglobal-quizz p-4 shadow-none mb-5">
        <div className="row">
          <div className="col-xl-3 d-flex justify-content-center align-items-center">
            <img className="globalimage-quizz rounded mb-4 mb-xl-0" src="https://i.pinimg.com/originals/68/28/4c/68284c53b5f4d7d94cd40fa19c9fd21d.jpg"></img>
          </div>
          <div className="col-xl-9">
            <div className="mb-3">
              <h3 className="webkit-line-2">Results from {userResponse.user.name}</h3>
              
            </div>
            <div>
              <p className="mb-2">Quizz: <span className="ms-2">{userResponse.quizz.title}</span></p>
              <p className="mb-2">Response Date: <span className="ms-2">{formatDate(userResponse.responseDate)}</span></p>
              <p className="mb-2">Score: <span className="ms-2">{userResponse.score}</span></p>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}