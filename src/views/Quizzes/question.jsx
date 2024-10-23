import { useMemo, useState } from "react"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Toast from "../../sweetalert";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";


export async function loader({ params }) {
  const quizz = await axios.get(`/api/myquizzes/${params.quizzId}/questions`)
  quizz.data.questions = quizz.data.questions.map(x => ({ ...x, reactId: uuidv4() }));
  return quizz.data;
}

export default function Question() {
  const loader = useLoaderData();
  const { quizzId } = useParams();
  const [quizz, setQuizz] = useState(loader)
  const [deletedIds, setDeletedIds] = useState([])
  const length = useMemo(() => quizz.questions.length + 1);

  //Adds a new question
  const addQuestion = (typeOfQuestion) => {
    setQuizz(x => ({ ...x, questions: [...x.questions, { id: 0, quizzId: x.id, reactId: uuidv4(), typeOfQuestion, title: `New Question ${length}`, description: `Description ${length}`, visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: length }] }))
  }

  //Handle deleted ids
  const handleDelete = (e) => {
    if(e === 0) return
    setDeletedIds(x => [...x, e])
  }

  const save = async () => {
    try {
      const result = await axios.post(`/api/myquizzes/${quizzId}/questions`, { questions: quizz.questions, deletedIds })
      setQuizz(x => ({ ...x, questions: result.data }))
      setDeletedIds([])
      Toast.fire({ icon: "success", title: "Sucessfully saved" })
    } catch (error) {
      Toast.fire({ icon: "error", title: "An error ocurred" })
    }
  }

  return (
    <div>
      <QuestionsToDisplay quizzParam={quizz} onQuizzChange={e => setQuizz(e)} editable={true} onDeleted={handleDelete} />
      <div className="d-flex justify-content-center flex-wrap mb-2" style={{ marginTop: "-22px" }}>
        <button onClick={save} className="btn btn-primary me-2"><FontAwesomeIcon icon={faFloppyDisk} /> Save</button>
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Add Question
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" onClick={() => addQuestion(0)}>Singleline</button></li>
            <li><button class="dropdown-item" onClick={() => addQuestion(1)}>Multiline</button></li>
            <li><button class="dropdown-item" onClick={() => addQuestion(2)}>Number</button></li>
            <li><button class="dropdown-item" onClick={() => addQuestion(3)}>Yes no</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}