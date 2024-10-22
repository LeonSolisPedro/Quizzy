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
import { useState } from "react";
import Swal from "sweetalert2";
import QuestionsToDisplay from "../../components/questionstodisplay"
import { useLoaderData } from "react-router-dom";
import { quizzFakeData5 } from "../../components/fakeQuizzData"
import axios from "axios";

export async function loader({params}){
  const response = await axios.get(`/api/myquizzes/${params.quizzId}/results`)
  return response.data;
}

export default function Result() {
  const loader = useLoaderData();
  const [selectedOption, setSelectedOption] = useState("all");
  const [quizz, setQuizz] = useState(quizzFakeData5)
  const [data, setData] = useState({nodes: loader});

  //Handles Delete Data
  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continue'
    });
    if (!result.isConfirmed) return
    setData(state => ({
      ...state,
      nodes: state.nodes.filter((node) => node.id !== id),
    }));
  }

  //Format the date
  const formatDate = (utcDateString) => {
    return new Date(utcDateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns:  repeat(5,minmax(auto, 1fr));
      `,
  });

  const sort = useSort(
    data,
    {},
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.user.name.localeCompare(b.user.name)),
        EMAIL: (array) => array.sort((a, b) => a.user.email.localeCompare(b.user.email)),
        RESPONSEDATE: (array) => array.sort((a, b) => a.responseDate - b.responseDate),
        SCORE: (array) => array.sort((a, b) => a.score - b.score)
      },
    }
  );


  return (
    <div>
      <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)} class="form-select select-agreggation">
        <option value="all">All Results</option>
        <option value="aggregation">Aggregation Results</option>
      </select>
      <Table style={{ display: selectedOption === "all" ? '' : 'none' }} data={data} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                <HeaderCellSort sortKey="EMAIL">Email</HeaderCellSort>
                <HeaderCellSort sortKey="RESPONSEDATE">Date</HeaderCellSort>
                <HeaderCellSort sortKey="SCORE">Score</HeaderCellSort>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row item={item} key={item.id}>
                  <Cell>
                    <img className="image-50" src={item.user.URLImage} />
                    {item.user.name}
                  </Cell>
                  <Cell>{item.user.email}</Cell>
                  <Cell>{formatDate(item.responseDate)}</Cell>
                  <Cell>{item.score}</Cell>
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
      <div style={{ display: selectedOption === "aggregation" ? '' : 'none' }}>
        <QuestionsToDisplay style={{ display: selectedOption === "aggregation" ? '' : 'none' }} quizzParam={quizz} />
      </div>
    </div>
  )
}