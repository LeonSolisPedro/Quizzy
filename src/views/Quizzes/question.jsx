import { useMemo, useRef, useState } from "react"
import { quizzFakeData1 } from "../../components/fakeQuizzData"
import QuestionsToDisplay from "../../components/questionstodisplay"

export default function Question() {
  const [quizz, setQuizz] = useState(quizzFakeData1)

  //Adds a new question
  const addQuestion = () => {
    setQuizz(x => ({...x, questions: [...x.questions, { id: 0, typeOfQuestion: 0, title: 'New Question 4', description: 'Description', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 4 }]}))
  }

  return (
    <div>
      <QuestionsToDisplay quizzParam={quizz} onQuizzChange={e => setQuizz(e)} editable={true} />
      <button onClick={addQuestion} className="btn btn-primary">Add Question</button>
    </div>
  )
}