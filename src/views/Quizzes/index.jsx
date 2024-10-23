import { Link } from "react-router-dom";
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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { toggleQuizzes } from "../../store/user"
import axios from "axios";

export default function Index() {
  const [data, setData] = useState({nodes: []});
  const dispatch = useDispatch()
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const seeAllQuizzes = useSelector((state) => state.user.seeAllQuizzes)

  //See all quizzes
  //https://stackoverflow.com/a/53572588
  useEffect(() => {
    async function fetch() {
      const url = seeAllQuizzes ? "/api/myquizzes/all" : "/api/myquizzes"
      const response = await axios.get(url)
      setData({nodes: response.data})
    }
    fetch()
  },[seeAllQuizzes])


  //Handles Delete Data
  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continue'
    });
    if (!result.isConfirmed) return
    await axios.delete(`/api/myquizzes/${id}`)
    setData(state => ({
      ...state,
      nodes: state.nodes.filter((node) => node.id !== id),
    }));
  }

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  repeat(6,minmax(auto, 1fr));
      `,
  });

  const sort = useSort(
    data,
    {},
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.title.localeCompare(b.title)),
        ANSWERS: (array) => array.sort((a, b) => a.userResponses.length - b.userResponses.length),
        ACCESS: (array) => array.sort((a, b) => a.accessStatus - b.accessStatus),
      },
    }
  );

  return (
    <div class="card">
      <div class="card-header">
        <div className="d-flex align-items-center">
          <h2 className="card-title">Your quizzes</h2>
          {isAdmin && (
            <p onClick={() => dispatch(toggleQuizzes())} className="mb-1 ms-2 seeallquizzes">{seeAllQuizzes ? '(Hide all quizzes)' : '(See all quizzes)'}</p>
          )}
        </div>
        <button className="btn btn-primary">Add Quizz</button>
      </div>
      <div className="card-body">
        <Table data={data} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Image</HeaderCell>
                  <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                  <HeaderCell>Questions</HeaderCell>
                  <HeaderCellSort sortKey="ANSWERS">Answers</HeaderCellSort>
                  <HeaderCellSort sortKey="ACCESS">Access</HeaderCellSort>
                  <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    <Cell>
                      <img className="image-50" src={item.imageURL} />
                    </Cell>
                    <Cell>{item.title}</Cell>
                    <Cell>
                      {item.questions.filter(x => x.visibleAtTable).slice(0, 3).map(question => (
                        <p style={{ fontSize: "10.1px" }} className="webkit-line-2 mb-1">{question.title}</p>
                      ))}
                    </Cell>
                    <Cell>{item.userResponses.length}</Cell>
                    <Cell>
                      {item.accessStatus === 0 && (
                        <span className="badge text-bg-success">Public</span>
                      )}
                      {item.accessStatus === 1 && (
                        <span className="badge text-bg-light">Private</span>
                      )}
                    </Cell>
                    <Cell>
                      <div class="dropdown">
                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul class="dropdown-menu">
                          <li><Link to={`${item.id}`} class="dropdown-item" >View</Link></li>
                          <li><button class="dropdown-item" onClick={() => handleRemove(item.id)}>Delete</button></li>
                        </ul>
                      </div>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </div>
  )
}