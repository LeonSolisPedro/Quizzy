import { useEffect, useRef, useState } from "react"
import { AutoComplete } from 'primereact/autocomplete';
import Tiptap from "../../components/tiptap"
import "./setting.css"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Setting() {

  const tiptapRef = useRef()
  const [topics, setTopics] = useState([{ "id": 1, "name": "Education" }, { "id": 2, "name": "Quizz" }, { "id": 3, "name": "Other" }])
  const [userTopic, setTopic] = useState(1);


  //Searching and adding
  const [Check, setCheck] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserLists, setSelectedUserLists] = useState([]);
  const [canAddUser, setCanAddUser] = useState(false)
  const search = async (event) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSelectedUserLists([{ "id": 1, "name": "Pedro León", "email": "pedro@wintercr.com" }, { "id": 2, "name": "Diego Janus", "email": "diego@wintercr.com" }, { "id": 3, "name": "Jaime Alonso", "email" : "jaime@wintercr.com" }]);
  };
  const addUserToTable = () => {
    resetSearch()
  }
  const resetSearch = () => {
    setSelectedUser('')
    setSelectedUserLists([])
    setCanAddUser(false)
  }

  //Image
  const [image, setImage] = useState(null)
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
              <input checked={userTopic === topic.id} onChange={() => setTopic(topic.id)} class="form-check-input" type="radio" />
              <label class="form-check-label">
                {topic.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Access Status {Check ? 'Checked' : 'Not checked'}</label>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" checked={Check ? true : false} role="switch" onChange={(e) => setCheck(e.target.checked) } />
          <label class="form-check-label">Enable private</label>
        </div>
        {/* Render above based on Check true and false */}
        <div class="form-text">Description</div>
        <div class="d-flex">
          <AutoComplete
            field="name"
            value={selectedUser}
            suggestions={selectedUserLists}
            completeMethod={search}
            onChange={e => setSelectedUser(e.value)}
            onSelect={e => setCanAddUser(true)}
            onClear={e => setCanAddUser(false)}
            onKeyUp={e => setCanAddUser(false)}
            forceSelection />
          <button type="button" onClick={e => addUserToTable()} disabled={!canAddUser} class="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        {/* End rendering */}

      </div>


      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  )
}