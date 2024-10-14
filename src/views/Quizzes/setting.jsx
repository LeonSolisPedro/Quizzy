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

export default function Setting() {

  const tiptapRef = useRef()
  const [topics, setTopics] = useState([{ "id": 1, "name": "Education" }, { "id": 2, "name": "Quizz" }, { "id": 3, "name": "Other" }])
  const [userTopic, setTopic] = useState(1);


  //Searching and adding
  const [Check, setCheck] = useState(true);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserLists, setSelectedUserLists] = useState([]);
  const [canAddUser, setCanAddUser] = useState(false)
  const [userList, setUserList] = useState({ nodes: [{ id: 1, name: "Test", email: "test@wintercr.com" }] })
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
        <label class="form-label mb-2">Access Status</label>

        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" checked={Check ? true : false} role="switch" onChange={(e) => setCheck(e.target.checked)} />
          <label class="form-check-label">Make private</label>
        </div>
      </div>

      <div className="mb-3" style={{ display: Check ? 'block' : 'none' }}>
        <label class="form-label">Add User</label>
        {/* Render above based on Check true and false */}
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
        <div class="form-text">Only the users below have access to the quizz, search by name or email and added it to the table</div>
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
                      <button type="button" class="btn btn-light btn-sm" onClick={() => handleRemove(item.id)}>Remove</button>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        {/* End rendering */}
      </div>


      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  )
}