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
import axios from "axios";
import { useLoaderData } from "react-router-dom";



export async function loader(){
  const answers = await axios.get("/api/myanswers")
  return answers.data
}

export default function Index() {
  const loader = useLoaderData();
  const [data, setData] = useState({nodes: loader});

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
        DATE: (array) => array.sort((a, b) => a.responseDate - b.responseDate),
        NAME: (array) => array.sort((a, b) => a.quizz.title.localeCompare(b.quizz.title)),
      },
    }
  );

  return (
    <div class="card">
      <div class="card-header">
        <h2 className="card-title">My answers</h2>
        <button className="btn btn-primary invisible">Add User</button>
      </div>
      <div className="card-body">
        <Table data={data} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSort sortKey="DATE">Response Date</HeaderCellSort>
                  <HeaderCell>Image</HeaderCell>
                  <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                  <HeaderCell>Status</HeaderCell>
                  <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    <Cell>{formatDate(item.responseDate)}</Cell>
                    <Cell>
                      <img className="image-50" src={item.quizz.imageURL} />
                    </Cell>
                    <Cell>{item.quizz.title}</Cell>
                    <Cell>
                      <span className="badge text-bg-success">Done</span>
                    </Cell>
                    <Cell>
                      <Link to={`${item.id}`} className="btn btn-light btn-sm">View</Link>
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