import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useLoaderData } from "react-router-dom";


export async function loader({params}) {
  const quizz = await axios.get(`api/welcome/getQuizz/${params.quizzId}`)
  quizz.data.quizz.questions = quizz.data.quizz.questions.map(x => ({...x, reactId: uuidv4() }));
  return quizz.data.quizz
}

export default function AnswerDetail() {
  const loader = useLoaderData();
  const [quizz, setQuizz] = useState(loader);
  const navigate = useNavigate();


  return (
    <div class="card">
      <div class="card-header">
        <h2 className="card-title">Details</h2>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Return
        </button>
      </div>
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-10 col-12">
            <ScrollRestoration />
            <QuizzHeader quizzParam={quizz} />
            <QuestionsToDisplay quizzParam={quizz} />
          </div>
        </div>
      </div>
    </div>
  )
}