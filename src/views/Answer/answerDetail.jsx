import { Link } from "react-router-dom";
import { quizzFakeData4, userResponse1 } from "../../components/fakeQuizzData"
import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState } from "react";


export default function AnswerDetail() {
  const [quizz, setQuizz] = useState(quizzFakeData4)


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