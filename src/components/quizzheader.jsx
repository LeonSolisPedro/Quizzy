import { useState } from "react"
import { Link } from "react-router-dom"


export default function QuizzHeader({quizzParam, respondingView = false}) {
  const [quizz, setQuizz] = useState(quizzParam)

  return (
    <div>
      <div className="container-fluid card border-0 cardglobal-quizz p-4 shadow-none mb-5">
        <div className="row">
          <div className="col-xl-3 d-flex justify-content-center align-items-center">
            <img className="globalimage-quizz rounded mb-4 mb-xl-0" src={quizz.imageURL}></img>
          </div>
          <div className="col-xl-9">
            <div className="mb-3">
              <h3 className="webkit-line-2">{quizz.title}</h3>
              <p className="webkit-line-2 mb-0">{quizz.descriptionPlain}</p>
              <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="text-decoration-none">Read more...</a>
            </div>
            <div>
              <p className="mb-0">
                <span className="me-2">Tags:</span>
                {quizz.quizzTags.map(quizzTag => (
                  respondingView ?
                  ( <button to={`/welcome/tag/${quizzTag.tag.id}`} className="btn btn-sm btn-light me-1 mb-1"> {quizzTag.tag.name} </button>) :
                  ( <Link to={`/welcome/tag/${quizzTag.tag.id}`} className="btn btn-sm btn-light me-1 mb-1"> {quizzTag.tag.name} </Link> )
                ))}
              </p>
              <p>Topic: <span className="ms-2">{quizz.topic.name}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{quizz.title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: quizz.description }}>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}