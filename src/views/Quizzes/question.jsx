import { useMemo, useState } from "react"
import { quizzFakeData2 } from "../../components/fakeQuizzData"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { v4 as uuidv4 } from 'uuid';

export default function Question() {
  const [quizz, setQuizz] = useState(quizzFakeData2)
  const length = useMemo(() => quizz.questions.length + 1);

  //Adds a new question
  const addQuestion = () => {
    setQuizz(x => ({...x, questions: [...x.questions, { id: 0, reactId: uuidv4(),typeOfQuestion: 3, title: `New Question ${length}`, description: `Description ${length}`, visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: length }]}))
  }

  return (
    <div>
      <QuestionsToDisplay quizzParam={quizz} onQuizzChange={e => setQuizz(e)} editable={true} />
      <button onClick={addQuestion} className="btn btn-primary">Add Question</button>
    </div>
  )
}