import { Link } from "react-router-dom";
import { quizzFakeData1 } from "../../components/fakeQuizzData"
import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';


export default function AnswerDetail() {
  const [quizz, setQuizz] = useState(quizzFakeData1)
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