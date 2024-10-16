import { useEffect, useMemo, useRef, useState } from "react"

export default function QuestionsToDisplay({ quizzParam, onQuizzChange, editable = false, editAnswers = false }) {
  const [quizz, setQuizz] = useState(quizzParam)
  const yourUserId = 1;
  const isAdminEditing = useMemo(() => yourUserId !== quizz.userId);

  //Sync from param
  useEffect(() => {
    setQuizz(quizzParam);
  }, [quizzParam]);

  // Update the description
  const handleDescription = (id, newDescription) => {
    const newQuizz = {...quizz, questions: quizz.questions.map(question => question.id === id ? { ...question, description: newDescription, lastEditedAdminId: isAdminEditing ? yourUserId : null } : question)}
    setQuizz(newQuizz)
    if(onQuizzChange) onQuizzChange(newQuizz)
  };

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
    setQuizz({...quizz, questions: questionClone})
    if(onQuizzChange) onQuizzChange({...quizz, questions: questionClone})
  }
  function handleOrder(questionClone) {
    const one = questionClone[dragQ.current].order
    const two = questionClone[draggedOverQ.current].order
    questionClone[dragQ.current].order = two
    questionClone[draggedOverQ.current].order = one
  }

  return (
    <div>
      {quizz.questions.map((question, index) => (
        <div className="container-fluid card border-0 cardglobalquestion-quizz p-4 shadow-none mb-5"
          draggable
          onDragStart={() => (dragQ.current = index)}
          onDragEnter={() => (draggedOverQ.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <h6>{question.order}.- {question.title}</h6>
          <input type="text" className="form-control" onChange={(e) => handleDescription(question.id, e.target.value)} value={question.description} />
          <p>{question.description}</p>
        </div>
      ))}
    </div>
  )
}