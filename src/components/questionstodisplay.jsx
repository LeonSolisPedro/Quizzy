import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react"

export default function QuestionsToDisplay({ quizzParam, onQuizzChange, editable = false, editAnswers = false }) {
  const [quizz, setQuizz] = useState(quizzParam)
  const yourUserId = 1;
  const isAdminEditing = useMemo(() => yourUserId !== quizz.userId);

  //Sync from parent
  useEffect(() => {
    setQuizz(quizzParam);
  }, [quizzParam]);

  // Update the description
  const updateDescription = (id, newDescription) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.id === id ? { ...question, description: newDescription, lastEditedAdminId: isAdminEditing ? yourUserId : null } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  };

  //Update the title
  const updateTitle = (id, newTitle) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.id === id ? { ...question, title: newTitle, lastEditedAdminId: isAdminEditing ? yourUserId : null } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  //Update visible
  const updateVisible = (id, newVisible) => {
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.id === id ? { ...question, visibleAtTable: newVisible } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  //Delete a question
  const deleteQuestion = (id) => {
    const newQuizz = { ...quizz, questions: quizz.questions.filter(question => question.id !== id) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
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
    const newQuizz = { ...quizz, questions: quizz.questions.map(question => question.id === id ? { ...question, answer: {...question.answer, answer: newAnswer, lastEditedAdminId: isAdminEditing ? yourUserId : null } } : question) }
    setQuizz(newQuizz)
    if (onQuizzChange) onQuizzChange(newQuizz)
  }

  return (
    <div>
      {quizz.questions.map((question, index) => (
        <div className="container-fluid card border-0 cardglobalquestion-quizz p-4 shadow-none mb-5"
          draggable={editable}
          onDragStart={() => (dragQ.current = index)}
          onDragEnter={() => (draggedOverQ.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >

          <div className="toolbarquestion-quizz">
            {question.lastEditedAdmin ? <p className="editedquestion-quizz webkit-line-2 mb-0"><small><i>(Edited by {question.lastEditedAdmin.name})</i></small></p> : ''}
            {editable ? <button onClick={() => deleteQuestion(question.id)} className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrash} /></button> : ''}
          </div>

          {editable == true && (
            <>
              <h6 className="editabletitlequestion-quizz toolbartitlequestion-quizz">
                {question.order}.- <input className="form-control" value={question.title} onChange={e => updateTitle(question.id, e.target.value)} />
              </h6>
              <textarea className="form-control editabledescquestion-quizz" value={question.description} onChange={e => updateDescription(question.id, e.target.value)}></textarea>
            </>
          )}

          {editable == false && (
            <>
              <h6 className="toolbartitlequestion-quizz">{question.order}.- {question.title}</h6>
              <p>{question.description}</p>
            </>
          )}

          {question.typeOfQuestion === 0 && (
            <input type="text" className="form-control formcontrolquestion-quizz" disabled={!editAnswers} value={question?.answer?.answer} onChange={e => updateAnswer(question.id, e.target.value)} />
          )}

          {question.typeOfQuestion === 1 && (
            <textarea className="form-control formcontrolquestion-quizz" disabled={!editAnswers} value={question?.answer?.answer} onChange={e => updateAnswer(question.id, e.target.value)}></textarea>
          )}

          {question.typeOfQuestion === 2 && (
            <input type="number" className="form-control formcontrolquestion-quizz" disabled={!editAnswers} value={question?.answer?.answer} onChange={e => updateAnswer(question.id, e.target.value)} />
          )}

          {question.typeOfQuestion === 3 && (
            <div className="topic-settings-pedro">
              <div className="form-check">
                <input className="form-check-input" type="radio" disabled={!editAnswers} value={question?.answer?.answerCheckbox} />
                <label className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" disabled={!editAnswers} value={question?.answer?.answerCheckbox} />
                <label className="form-check-label">
                  No
                </label>
              </div>
            </div>
          )}

          {question?.answer?.lastEditedAdmin && (
            <p className="editedanswer-quizz webkit-line-2 mb-0"><small><i>(Edited by {question.answer.lastEditedAdmin.name})</i></small></p>
          )}

          {editable == true && (
            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" checked={question.visibleAtTable} onChange={e => updateVisible(question.id, e.target.checked)} />
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