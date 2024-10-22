import { useEffect, useRef, useState } from "react"
import { AutoComplete } from 'primereact/autocomplete';
import Tiptap from "../../components/tiptap"
import "./setting.css"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortIconPositions,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { useTheme } from "@table-library/react-table-library/theme";
import axios from "axios";
import { useLoaderData } from "react-router-dom";


export async function loader({params}){
  const quizz = await axios.get(`/api/myquizzes/${params.quizzId}/settings`)
  return quizz.data
}

export default function Setting() {
  const loader = useLoaderData();


  //Title
  const [title, setTitle] = useState(loader.quizz.title)

  //HTML stuff
  const tiptapRef = useRef()


  //Topics
  const [topics, setTopics] = useState(loader.topics)
  const [userTopic, setTopic] = useState(loader.quizz.topicId);


  //Allow multiple answers
  const [allowMA, setAllowMA] = useState(loader.quizz.acceptMultipleAnswers);


  //Tags
  const [selectedTags, setSelectedTags] = useState(loader.quizz.quizzTags.map(x => x.tag));
  const [selectedTagLists, setSelectedTagLists] = useState([]);
  const search2 = async (event) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSelectedTagLists([{ "id": 1, "name": "Tag1" }, { "id": 2, "name": "Tag2" }, { "id": 3, "name": "Tag3" }, { "id": 4, "name": "Tag4" }]);
  };


  //Searching and adding
  const [Check, setCheck] = useState(loader.quizz.accessStatus);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserLists, setSelectedUserLists] = useState([]);
  const [canAddUser, setCanAddUser] = useState(false)
  const [userList, setUserList] = useState({ nodes: loader.quizz.allowedUsers.map(x => x.user) })
  const search = async (event) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSelectedUserLists([{ "id": 1, "name": "Pedro León", "email": "pedro@wintercr.com" }, { "id": 2, "name": "Diego Janus", "email": "diego@wintercr.com" }, { "id": 3, "name": "Jaime Alonso", "email": "jaime@wintercr.com" }]);
  };
  const addUserToTable = () => {
    resetSearch()
    setUserList(state => ({
      ...state,
      nodes: state.nodes.concat(selectedUser)
    }))
  }
  const handleRemove = (id) => {
    setUserList(state => ({
      nodes: state.nodes.filter((node) => node.id !== id),
    }));
  }
  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  repeat(3,minmax(auto, 1fr));
      `,
  });
  const sort = useSort(
    userList,
    {},
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        EMAIL: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
      },
    }
  );
  const resetSearch = () => {
    setSelectedUser('')
    setSelectedUserLists([])
    setCanAddUser(false)
  }

  //Image
  const [image, setImage] = useState(loader.quizz.imageURL)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="email" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <Tiptap ref={tiptapRef} content={loader.quizz.description} />
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <div className="div-image-pedro-settings">
          <input type="file" onChange={onImageChange} className="form-control" />
          <img className="image-pedro-settings rounded" alt="preview image" src={image} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Topic</label>
        <div className="topic-settings-pedro">
          {topics.map(topic => (
            <div key={topic.id} className="form-check">
              <input checked={userTopic === topic.id} onChange={() => setTopic(topic.id)} className="form-check-input" type="radio" />
              <label className="form-check-label">
                {topic.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Allow multiple answers</label>
        <div className="topic-settings-pedro">
          <div className="form-check">
            <input checked={allowMA == true} onChange={() => setAllowMA(true)} className="form-check-input" type="radio" />
            <label className="form-check-label">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input checked={allowMA == false} onChange={() => setAllowMA(false)} className="form-check-input" type="radio" />
            <label className="form-check-label">
              No
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Tags</label>
        <AutoComplete
          field="name"
          value={selectedTags}
          suggestions={selectedTagLists}
          completeMethod={search2}
          onChange={(e) => setSelectedTags(e.value)}
          multiple
          forceSelection />
      </div>

      <div className="mb-3">
        <label className="form-label mb-3 d-flex flex-wrap align-items-center">Access status: {Check ? <span className="ms-2 badge rounded-pill text-bg-light">Private</span> : <span className="ms-2 badge text-bg-success">Public</span>}</label>

        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" checked={Check ? true : false} role="switch" onChange={(e) => setCheck(e.target.checked)} />
          <label className="form-check-label">Make private</label>
        </div>
      </div>

      <div className="mb-3" style={{ display: Check ? 'block' : 'none' }}>
        <label className="form-label">Add User</label>
        {/* Render above based on Check true and false */}
        <div className="d-flex">
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
          <button type="button" onClick={e => addUserToTable()} disabled={!canAddUser} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <div className="form-text">Only the users below have access to the quizz, search by name or email and added it to the table</div>
        <Table data={userList} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                  <HeaderCellSort sortKey="EMAIL">Email</HeaderCellSort>
                  <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    <Cell>{item.name}</Cell>
                    <Cell>{item.email}</Cell>
                    <Cell>
                      <button type="button" className="btn btn-light btn-sm" onClick={() => handleRemove(item.id)}>Remove</button>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        {/* End rendering */}
      </div>


      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  )
}