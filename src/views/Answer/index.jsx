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


const apiResponse = {
  nodes: [
    {
      id: 1,
      responseDate: Date.now(),
      quizz: {
        title: "Quizz that you have to complete because you are an intern",
        imageURL: "https://s3.r29static.com/bin/entry/b1c/430x516,85/1558175/image.webp"
      },
    },
    {
      id: 2,
      responseDate: Date.now(),
      quizz: {
        title: "Quizz to see if you love earth",
        imageURL: "https://ih1.redbubble.net/image.3805955023.2804/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
      },
    },
    {
      id: 3,
      responseDate: Date.now(),
      quizz: {
        title: "Job interview quizz",
        imageURL: "https://blog.ivyexec.com/wp-content/uploads/2021/08/shutterstock_1702875067.jpg"
      },
    },
  ]
};


export default function Index() {
  const [data, setData] = useState(apiResponse);

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