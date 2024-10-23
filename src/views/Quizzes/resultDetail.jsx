// import { quizzFakeData3, userResponse1 } from "../../components/fakeQuizzData"
import QuizzReponseHeader from "../../components/quizzresponseheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { useLoaderData, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFloppyDisk, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import Toast from "../../sweetalert";

export async function loader({ params }) {
  const response = await axios.get(`/api/myquizzes/${params.quizzId}/results/${params.userResponseId}`)
  response.data.quizz.questions = response.data.quizz.questions.map(x => ({ ...x, reactId: uuidv4() }));
  return response.data
}

export default function ResultDetail() {
  const loader = useLoaderData();
  const { quizzId } = useParams();
  const [quizz, setQuizz] = useState(loader.quizz)
  const [userResponse, setUserResponse] = useState(loader)
  const [editAnswers, setEditAnswers] = useState(false)
  const [deletedIds, setDeletedIds] = useState([])


  //Handle deleted ids
  const handleDelete = (e) => {
    if(e === 0) return
    setDeletedIds(x => [...x, e])
  }


  const save = async () => {
    try {
      let answers = quizz.questions.map(x => x.answer ?? null)
      answers = answers.filter(x => x !== null);
      answers = answers.map(x => ({...x, userResponseId: userResponse.id}))
      const response = await axios.post(`/api/myquizzes/${quizzId}/updateAnswers`, {answers, deletedIds})
      setQuizz(x => ({
        ...x,
        questions: x.questions.map(question => ({...question,  answer: response.data.find(x => x.questionId == question.id) ?? null}))
      }));
      setDeletedIds([])
      Toast.fire({ icon: "success", title: "Sucessfully saved" })
    } catch (error) {
      Toast.fire({ icon: "error", title: "An error ocurred" })
    }
  }

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
      <QuestionsToDisplay quizzParam={quizz} onQuizzChange={e => setQuizz(e)} editAnswers={editAnswers} onDeleted={handleDelete} />
      <div className="d-flex justify-content-center flex-wrap mb-2" style={{ marginTop: "-22px" }}>
        <button onClick={() => setEditAnswers(answer => !answer)} className="btn btn-primary me-2">
          {editAnswers == true && (
            <>
              <FontAwesomeIcon icon={faXmark} /> Stop
            </>
          )}
          {editAnswers == false && (
            <>
              <FontAwesomeIcon icon={faPen} /> Edit
            </>
          )}
        </button>
        <button onClick={save} disabled={!editAnswers} className="btn btn-primary me-2"><FontAwesomeIcon icon={faFloppyDisk} /> Save</button>
      </div>
    </div>
  )
}