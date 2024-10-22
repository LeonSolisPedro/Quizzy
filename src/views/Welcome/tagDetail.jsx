import { Link, useLoaderData } from "react-router-dom";
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
import { ScrollRestoration } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export async function loader({params}){
  const response = await axios.get(`api/welcome/getTag/${params.tagId}`)
  return response.data
}


export default function TagDetail() {
  const loader = useLoaderData();
  const [data, setData] = useState({nodes: loader.quizz});
  const [tag, setTag] = useState(loader.tag)
  const navigate = useNavigate();

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
        LIKES: (array) => array.sort((a, b) => a.likes.length - b.likes.length),
      },
    }
  );

  return (
    <div class="card">
      <div class="card-header">
        <h2 className="card-title">Tag: {tag.name}</h2>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Return</button>
      </div>
      <div className="card-body">
        <ScrollRestoration />
        <Table data={data} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Image</HeaderCell>
                  <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                  <HeaderCell>Questions</HeaderCell>
                  <HeaderCellSort sortKey="ANSWERS">Answers</HeaderCellSort>
                  <HeaderCellSort sortKey="LIKES">Likes</HeaderCellSort>
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
                      {item.likes.length}
                    </Cell>
                    <Cell>
                      <Link to={`/quizz/${item.id}`} className="btn btn-light btn-sm">View</Link>
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