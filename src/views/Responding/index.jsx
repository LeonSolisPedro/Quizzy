import Nav from "../../components/nav";
import LoginSignup from "../../components/loginsignup";
import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'

export async function loader({params}) {
  const quizz = await axios.get(`api/getRespondingQuizz/${params.quizzId}`)
  quizz.data.quizz.questions = quizz.data.quizz.questions.map(x => ({...x, reactId: uuidv4() }));
  return quizz.data.quizz
}

export default function Responding(){
  const loader = useLoaderData();
  const isLogged = useSelector((state) => state.user.isLogged)
  const [quizz, setQuizz] = useState(loader);

  return (
    <div>
      <Nav />
      <LoginSignup />
      <QuizzHeader quizzParam={quizz} />
      <QuestionsToDisplay onQuizzChange={e => setQuizz(e)} quizzParam={quizz} editAnswers={isLogged} />
    </div>
  )
}