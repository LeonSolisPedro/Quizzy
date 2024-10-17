import { useMemo, useRef, useState } from "react"
import { quizzFakeData1 } from "../../components/fakeQuizzData"
import QuestionsToDisplay from "../../components/questionstodisplay"
import QuizzHeader from "../../components/quizzheader"

export default function Question() {
  const [quizz, setQuizz] = useState(quizzFakeData1)
  const quizzLength = useMemo(() => quizz.questions.length + 1);

  //Adds a new question
  const addQuestion = () => {
    setQuizz(x => ({...x, questions: [...x.questions, { id: 0, typeOfQuestion: 3, title: `New Question ${quizzLength}`, description: `Description ${quizzLength}`, visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: quizzLength }]}))
  }

  return (
    <div>
      <QuizzHeader />
      <QuestionsToDisplay quizzParam={quizz} onQuizzChange={e => setQuizz(e)} editable={true} />
      <button onClick={addQuestion} className="btn btn-primary">Add Question</button>
    </div>
  )
}