import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react"
import Swal from "sweetalert2";
import { useSelector } from 'react-redux'

export default function QuestionsToDisplay({ quizzParam, onQuizzChange, onDeleted, editable = false, editAnswers = false, respondingView = false }) {
  const [quizz, setQuizz] = useState(quizzParam)
  const yourUserId = useSelector((state) => state.user.id)
  const isAdminEditing = useMemo(() => {
    if(respondingView) return false
    return yourUserId !== quizz.userId
  });

  //Sync from parent
  useEffect(() => {
    setQuizz(quizzParam);
  }, [quizzParam]);

  // Update the description
  const updateDescription = (id, newDescription) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.reactId === id ? { ...question, description: newDescription, lastEditedAdminId: isAdminEditing ? yourUserId : null } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  };

  //Update the title
  const updateTitle = (id, newTitle) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.reactId === id ? { ...question, title: newTitle, lastEditedAdminId: isAdminEditing ? yourUserId : null } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  //Update visible
  const updateVisible = (id, newVisible) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.reactId === id ? { ...question, visibleAtTable: newVisible } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  //Delete a question
  const deleteQuestion = (id, realId) => {
    const newQuizz = { ...quizz, questions: quizz.questions.filter(question => question.reactId !== id) }
    for (const [i, quiz] of newQuizz.questions.entries()) newQuizz.questions.at(i).order = i + 1
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz);
    if (onDeleted) onDeleted(realId)
  }

  //Sorting functionality
  //I copied from here: https://www.youtube.com/watch?v=_nZCvxJOPwU
  const dragQ = useRef(0)
  const draggedOverQ = useRef(0)
  function handleSort() {
    const questionClone = [...quizz.questions]
    handleOrder(questionClone)
    const temp = questionClone[dragQ.current]
    questionClone[dragQ.current] = questionClone[draggedOverQ.current]
    questionClone[draggedOverQ.current] = temp
    setQuizz({ ...quizz, questions: questionClone })
    if (onQuizzChange) onQuizzChange({ ...quizz, questions: questionClone })
  }
  function handleOrder(questionClone) {
    const one = questionClone[dragQ.current].order
    const two = questionClone[draggedOverQ.current].order
    questionClone[dragQ.current].order = two
    questionClone[draggedOverQ.current].order = one
  }

  //Update answer
  const updateAnswer = (id, newAnswer) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.reactId === id ? { ...question, answer: { ...question.answer, answer: newAnswer, answerCheckbox: false, questionId: question.id, lastEditedAdminId: isAdminEditing ? yourUserId : null } } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  //Update Check
  const updateCheck = (id, newAnswer) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.reactId === id ? { ...question, answer: { ...question.answer, answer: "", answerCheckbox: newAnswer, questionId: question.id, lastEditedAdminId: isAdminEditing ? yourUserId : null } } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  //Delete Answer
  const deleteAnswer = async (id, realId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continue'
    });
    if (!result.isConfirmed) return
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.reactId === id ? { ...question, answer: null } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz);
    if (onDeleted) onDeleted(realId)
  }

  return (
    <div>
      {quizz.questions.map((question, index) => (
        <div key={question.reactId} className="container-fluid card border-0 cardglobalquestion-quizz p-4 shadow-none mb-5"
          draggable={editable}
          onDragStart={() => (dragQ.current = index)}
          onDragEnter={() => (draggedOverQ.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >

          <div className="toolbarquestion-quizz">
            {question.lastEditedAdmin ? <p className="editedquestion-quizz webkit-line-2 mb-0"><small><i>(Edited by {question.lastEditedAdmin.name})</i></small></p> : ''}
            {editable ? <button onClick={() => deleteQuestion(question.reactId, question.id)} className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} /></button> : ''}
          </div>

          {editable == true && (
            <>
              <h6 className="editabletitlequestion-quizz toolbartitlequestion-quizz">
                {question.order}.- <input className="form-control" value={question.title} onChange={e => updateTitle(question.reactId, e.target.value)} />
              </h6>
              <textarea className="form-control editabledescquestion-quizz" value={question.description} onChange={e => updateDescription(question.reactId, e.target.value)}></textarea>
            </>
          )}

          {editable == false && (
            <>
              <h6 className="toolbartitlequestion-quizz">{question.order}.- {question.title}</h6>
              <p>{question.description}</p>
            </>
          )}

          {question.typeOfQuestion === 0 && (
            <input type="text" className="form-control formcontrolquestion-quizz" disabled={!editAnswers} value={question?.answer?.answer ?? ""} onChange={e => updateAnswer(question.reactId, e.target.value)} required={respondingView} />
          )}

          {question.typeOfQuestion === 1 && (
            <textarea className="form-control formcontrolquestion-quizz" disabled={!editAnswers} value={question?.answer?.answer ?? ""} onChange={e => updateAnswer(question.reactId, e.target.value)} required={respondingView}></textarea>
          )}

          {question.typeOfQuestion === 2 && (
            <input type="number" className="form-control formcontrolquestion-quizz" disabled={!editAnswers} value={question?.answer?.answer ?? ""} onChange={e => updateAnswer(question.reactId, e.target.value)} required={respondingView} />
          )}

          {question.typeOfQuestion === 3 && (
            <div className="topic-settings-pedro">
              <div className="form-check">
                <input className="form-check-input" type="radio" disabled={!editAnswers} checked={question?.answer?.answerCheckbox === true} onChange={e => updateCheck(question.reactId, true)} required={respondingView} />
                <label className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" disabled={!editAnswers} checked={question?.answer?.answerCheckbox === false} onChange={e => updateCheck(question.reactId, false)} required={respondingView} />
                <label className="form-check-label">
                  No
                </label>
              </div>
            </div>
          )}



          {question?.answer?.lastEditedAdmin && (
            <p className="editedanswer-quizz webkit-line-2 mb-0"><small><i>(Edited by {question.answer.lastEditedAdmin.name})</i></small></p>
          )}

          {editAnswers && respondingView == false && (
            <div className="d-flex justify-content-end">
              <button onClick={() => deleteAnswer(question.reactId, question.answer?.id ?? 0)} className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
          )}



          {editable == true && (
            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" checked={question.visibleAtTable} onChange={e => updateVisible(question.reactId, e.target.checked)} />
              <label class="form-check-label">
                Visible at Table
              </label>
            </div>
          )}




        </div>
      ))}
    </div>
  )
}