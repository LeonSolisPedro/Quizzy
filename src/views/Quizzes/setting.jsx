import { useEffect, useRef, useState } from "react"
import Tiptap from "../../components/tiptap"
import "./setting.css"

export default function Setting() {
  const [image, setImage] = useState(null)
  const tiptapRef = useRef()
  const topics = useRef()

  //Fake database call
  useEffect(() => {
    topics.current = [{ "id": 1, "name": "Education" }, { "id": 2, "name": "Quizz" }, { "id": 3, "name": "Other" }];
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <form>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input type="email" class="form-control" value={"Quizz 1"} />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <Tiptap ref={tiptapRef} content={"<p>Hello there</p>"} />
      </div>
      <div class="mb-3">
        <label class="form-label">Image</label>
        <div className="div-image-pedro-settings">
          <input type="file" onChange={onImageChange} class="form-control" />
          <img className="image-pedro-settings rounded" alt="preview image" src={image} />
        </div>
      </div>
      <div className="mb-3">
        <label class="form-label">Topic</label>
        <div className="topic-settings-pedro">
          <div class="form-check">
            <input class="form-check-input" type="radio" />
            <label class="form-check-label">
              Default radio
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" />
            <label class="form-check-label">
              Default checked radio
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  )
}