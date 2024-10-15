import { useRef, useState } from "react"



export default function Question() {
  const [questions, setQuestion] = useState([
    { id: 1, typeOfQuestion: 0, title: 'Title of Question 1', description: 'Description', visibleAtTable: false, lastEditedAdmin: null, order: 1 },
    { id: 2, typeOfQuestion: 0, title: 'Title of Question 2', description: 'Description', visibleAtTable: false, lastEditedAdmin: null, order: 2 },
    { id: 44, typeOfQuestion: 0, title: 'Title of Question 3', description: 'Description', visibleAtTable: false, lastEditedAdmin: null, order: 3 }
  ])

  //Sorting functionality
  //I copied from here: https://www.youtube.com/watch?v=_nZCvxJOPwU
  const dragQ = useRef(0)
  const draggedOverQ = useRef(0)
  function handleSort() {
    const questionClone = [...questions]
    handleOrder(questionClone)
    const temp = questionClone[dragQ.current]
    questionClone[dragQ.current] = questionClone[draggedOverQ.current]
    questionClone[draggedOverQ.current] = temp
    setQuestion(questionClone)
  }
  function handleOrder(questionClone) {
    const one = questionClone[dragQ.current].order
    const two = questionClone[draggedOverQ.current].order
    questionClone[dragQ.current].order = two
    questionClone[draggedOverQ.current].order = one
  }

  return (
    <div>
      <div className="container-fluid card border-0 cardglobal-quizz p-4 shadow-none mb-5">
        <div className="row">
          <div className="col-xl-3 d-flex justify-content-center align-items-center">
            <img className="globalimage-quizz rounded mb-4 mb-xl-0" src="https://s3.r29static.com/bin/entry/b1c/430x516,85/1558175/image.webp"></img>
          </div>
          <div className="col-xl-9">
            <div className="mb-3">
              <h3 className="webkit-line-2">Quizz that you have to complete because you are an intern</h3>
              <p className="webkit-line-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
              <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="text-decoration-none">Read more...</a>
            </div>
            <div>
              <p className="mb-0">
                <span className="me-2">Tags:</span>
                <button className="btn btn-sm btn-light me-1 mb-1">Temporal</button>
                <button className="btn btn-sm btn-light me-1 mb-1">Temporal</button>
                <button className="btn btn-sm btn-light me-1 mb-1">Temporal</button>
              </p>
              <p>Topic: <span className="ms-2">Education 📚</span></p>
            </div>
          </div>
        </div>
      </div>

      {questions.map((question, index) => (
        <div key={question.id} className="container-fluid card border-0 cardglobalquestion-quizz p-4 shadow-none mb-5"
          draggable
          onDragStart={() => (dragQ.current = index)}
          onDragEnter={() => (draggedOverQ.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <h6>{question.order}.- {question.title}</h6>
        </div>
      ))}


      {/* <div className="text-center">
        <button className="btn btn-primary">Action button</button>
      </div> */}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Quizz that you have to complete because you are an intern</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
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