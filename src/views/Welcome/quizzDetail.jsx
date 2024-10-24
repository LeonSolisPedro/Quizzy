import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


export async function loader({params}) {
  const quizz = await axios.get(`api/welcome/getQuizz/${params.quizzId}`)
  quizz.data.questions = quizz.data.questions.map(x => ({...x, reactId: uuidv4() }));
  return quizz.data
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
            <div className="floating-button">
              <Link to={`/responding/${quizz.id}`} className="btn btn-primary"><FontAwesomeIcon icon={faPenToSquare} /> Answer now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}