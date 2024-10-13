import { useEffect, useRef, useState } from "react"
import { AutoComplete } from 'primereact/autocomplete';
import Tiptap from "../../components/tiptap"
import "./setting.css"

export default function Setting() {
  const [image, setImage] = useState(null)
  const tiptapRef = useRef()
  const [topics, setTopics] = useState([{ "id": 1, "name": "Education" }, { "id": 2, "name": "Quizz" }, { "id": 3, "name": "Other" }])
  const [userTopic, setTopic] = useState(1);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);


  const search = async (event) => {
    await new Promise((r) => setTimeout(r, 2000));
    setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
  };


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
        <label class="form-label">Topic {userTopic}</label>
        <div className="topic-settings-pedro">
          {topics.map(topic => (
            <div key={topic.id} class="form-check">
              <input checked={userTopic === topic.id} onClick={() => setTopic(topic.id)} class="form-check-input" type="radio" />
              <label class="form-check-label">
                {topic.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Title</label>
        <div className="card flex justify-content-center">
          <AutoComplete
            value={value}
            suggestions={items}
            completeMethod={search}
            onChange={(e) => setValue(e.value)}
          />
        </div>
      </div>

      
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  )
}