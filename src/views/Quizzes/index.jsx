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


const apiResponse = {
  nodes: [
    {
      id: 1,
      title: 'Quizz that you have to complete because you are an intern',
      imageURL: 'https://s3.r29static.com/bin/entry/b1c/430x516,85/1558175/image.webp',
      questions: [
        {id: 1,title: "How many apples do you eat per day?", visibleAtTable: true},
        {id: 2,title: "Can you describe a little bit more of yourself?", visibleAtTable: true},
        {id: 3,title: "Do you think that love will every going to be unbreakable for the desire of careness around the world?", visibleAtTable: true},
        {id: 4,title: "This question should not appear", visibleAtTable: false}
      ],
      userResponses: [
        {id: 1},
      ],
      accessStatus: 0
    },
    {
      id: 2,
      title: 'Quizz to see if you love earth',
      imageURL: 'https://ih1.redbubble.net/image.3805955023.2804/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
      questions: [
        {id: 1,title: "How many plants have you planted in the last year?", visibleAtTable: true},
        {id: 2,title: "Do you believe that the planet is flat?", visibleAtTable: true},
        {id: 3,title: "How many times per week do you use the car at the weekdays before the world tries to be at the dawn of love?", visibleAtTable: true},
        {id: 4,title: "This question should not appear", visibleAtTable: false}
      ],
      userResponses: [

      ],
      accessStatus: 0
    },
    {
      id: 3,
      title: 'Job interview quizz',
      imageURL: 'https://blog.ivyexec.com/wp-content/uploads/2021/08/shutterstock_1702875067.jpg',
      questions: [
        {id: 1,title: "What are your greatest strengths?", visibleAtTable: true},
        {id: 2,title: "What do you know about our company?", visibleAtTable: true},
        {id: 3,title: "Do you think that love will every going to be unbreakable for the desire of careness around the world?", visibleAtTable: false},
        {id: 4,title: "How do you handle criticism?", visibleAtTable: true},
        {id: 4,title: "Can you describe a time you worked as part of a team?", visibleAtTable: true}
      ],
      userResponses: [
        {id: 1}
      ],
      accessStatus: 1
    },
  ]
};


export default function Index() {
  const [data, setData] = useState(apiResponse);

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
          <h2 className="card-title">You quizzes</h2>
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