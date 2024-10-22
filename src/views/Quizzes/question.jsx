import { useMemo, useState } from "react"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useLoaderData } from "react-router-dom";


export async function loader({params}){
  const quizz = await axios.get(`/api/myquizzes/${params.quizzId}/questions`)
  quizz.data.questions = quizz.data.questions.map(x => ({...x, reactId: uuidv4() }));
  return quizz.data;
}

export default function Question() {
  const loader = useLoaderData();
  const [quizz, setQuizz] = useState(loader)
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