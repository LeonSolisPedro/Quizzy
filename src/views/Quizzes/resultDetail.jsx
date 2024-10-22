// import { quizzFakeData3, userResponse1 } from "../../components/fakeQuizzData"
import QuizzReponseHeader from "../../components/quizzresponseheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { useLoaderData } from "react-router-dom";

export async function loader({params}){
  const response = await axios.get(`/api/myquizzes/${params.quizzId}/results/${params.userResponseId}`)
  response.data.quizz.questions = response.data.quizz.questions.map(x => ({...x, reactId: uuidv4() }));
  return response.data
}

export default function ResultDetail() {
  const loader = useLoaderData();
  const [quizz, setQuizz] = useState(loader.quizz)
  const [userResponse, setUserResponse] = useState(loader)

  useEffect(() => {
    document.querySelector("#return")?.classList?.add("d-none")
    document.querySelector("#returnresults")?.classList?.remove("d-none")
    return () => {
      document.querySelector("#return")?.classList?.remove("d-none")
      document.querySelector("#returnresults")?.classList?.add("d-none")
    };
  }, []);

  return (
    <div>
      <QuizzReponseHeader userResponseParam={userResponse} />
      <QuestionsToDisplay quizzParam={quizz} editAnswers={true} />
    </div>
  )
}