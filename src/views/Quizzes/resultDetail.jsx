import { quizzFakeData3, userResponse1 } from "../../components/fakeQuizzData"
import QuizzReponseHeader from "../../components/quizzresponseheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState, useEffect } from "react"

export default function ResultDetail() {
  const [quizz, setQuizz] = useState(quizzFakeData3)
  const [userResponse, setUserResponse] = useState(userResponse1)

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
      <QuestionsToDisplay quizzParam={quizz} />
    </div>
  )
}