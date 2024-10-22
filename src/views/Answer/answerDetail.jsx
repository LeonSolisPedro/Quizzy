import { Link, useLoaderData } from "react-router-dom";
import { quizzFakeData4, userResponse1 } from "../../components/fakeQuizzData"
import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import axios from "axios";


export async function loader({params}) {
  const quizz = await axios.get(`api/myanswers/${params.userResponseId}`)
  quizz.data.questions = quizz.data.questions.map(x => ({...x, reactId: uuidv4() }));
  return quizz.data
}


export default function AnswerDetail() {
  const loader = useLoaderData();
  const [quizz, setQuizz] = useState(loader);


  return (
    <div class="card">
      <div class="card-header">
        <h2 className="card-title">Details</h2>
        <Link to={`/myanswers`} className="btn btn-secondary">Return</Link>
      </div>
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-10 col-12">
            <QuizzHeader quizzParam={quizz} />
            <QuestionsToDisplay quizzParam={quizz} />
          </div>
        </div>
      </div>
    </div>
  )
}