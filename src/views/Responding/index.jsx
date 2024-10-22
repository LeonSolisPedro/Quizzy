import Nav from "../../components/nav";
import LoginSignup from "../../components/loginsignup";
import QuizzHeader from "../../components/quizzheader"
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'
import { ScrollRestoration } from 'react-router-dom';
import Swal from "sweetalert2";
import Toast from "../../sweetalert";

export async function loader({ params }) {
  const quizz = await axios.get(`api/responding/getQuizz/${params.quizzId}`)
  if(!quizz.data.eligible.permission)
    throw new Response('', { status: 404 });
  quizz.data.quizz.questions = quizz.data.quizz.questions.map(x => ({...x, reactId: uuidv4() }));
  return quizz.data
}

export default function Responding() {
  const loader = useLoaderData();
  const isLogged = useSelector((state) => state.user.isLogged)
  const [quizz, setQuizz] = useState(loader.quizz)
  const [eligible, setEligible] = useState(loader.eligible)
  const [disableForm, setDisableForm] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(eligible.responded) sayThanks()
  }, []);

  //On submit
  const onSubmit = async (event) => {
    event.preventDefault();
    setDisableForm(true)
    try {
      const answers = quizz.questions.map(x => x.answer)
      await axios.post(`/api/responding/quizz/${quizz.id}`, {answers})
      await sayThanks()
    } catch (error) {
      Toast.fire({ icon: "error", title: error.response.data.message })
      setDisableForm(false);
    }
  }
  const sayThanks = async () => {
    await Swal.fire({
      title: 'Thank you',
      icon: 'success',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Continue'
    });
    navigate("/")
  }

  return (
    <div>
      <Nav />
      <LoginSignup />
      <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
        <div className="col-xl-10 col-12">
          <div class="card mt-4">
            <div className="card-body mt-5">
              <div className="row d-flex justify-content-center">
                <div className="col-xl-10 col-12">
                  <ScrollRestoration />
                  <QuizzHeader respondingView={true} quizzParam={quizz} />
                  <form onSubmit={onSubmit}>
                    <h6 className="text-center mb-4">Please fill out the form below and click the send button</h6>
                    <QuestionsToDisplay onQuizzChange={e => setQuizz(e)} quizzParam={quizz} editAnswers={isLogged} respondingView={true} />
                    <button className="btn btn-primary d-block mx-auto" type="submit" disabled={!isLogged || disableForm}>Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
      

    </div>
  )
}