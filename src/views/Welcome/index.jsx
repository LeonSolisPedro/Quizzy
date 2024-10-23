import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1221 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1221, min: 908 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 908, min: 0 },
    items: 1
  }
};

export async function loader() {
  const [response1, response2, response3] = await Promise.all([
    axios.get("/api/welcome/getLatest"),
    axios.get("/api/welcome/getPopular"),
    axios.get("/api/welcome/getTags")
  ])
  return { response1: response1.data, response2: response2.data, response3: response3.data }
}

export default function Index() {
  const loader = useLoaderData();
  const [data, setData] = useState({ nodes: loader.response2 });
  const [topQuiz, setTopQuiz] = useState(loader.response1);
  const [tags, setTags] = useState(loader.response3);

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
    <div>

      <div class="card mb-5">
        <div className="card-body">
          <h2 className="text-center title-welcome-1" style={{ fontWeight: 500, lineHeight: "2.25rem" }}>Welcome to Quizzy!</h2>
          <p className="text-center title-welcome-2">See our latest quizzes</p>
          <Carousel className="mx-sm-5 title-welcome-3" responsive={responsive}>

            {topQuiz.map(quizz => (
              <div key={quizz.id} class="card card-welcomegallery h-100">
                <img src={quizz.imageURL} class="card-img-top img-welcome" alt="..." />
                <div class="card-body d-flex flex-column">
                  <h6 className="webkit-line-4" style={{ fontWeight: 400 }}>{quizz.title}</h6>
                  <div className="text-center mt-auto">
                    <p style={{ fontWeight: 400 }} class="card-text">By {quizz.user.name}</p>
                    <Link to={`quizz/${quizz.id}`} class="btn btn-primary btn-sm">View</Link>
                  </div>
                </div>
              </div>
            ))}


          </Carousel>
        </div>
      </div>




      <div class="card mb-5">
        <div class="card-header">
          <h2 className="card-title">Our Top Popular</h2>
          <button className="btn btn-primary invisible">Add User</button>
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
                        <Link to={`quizz/${item.id}`} className="btn btn-light btn-sm">View</Link>
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </div>


      <div className="card">
        <div class="card-header justify-content-center">
          <h2 className="card-title">Our Popular Tags</h2>
        </div>
        <div className="card-body text-center">
          {tags.map(tag => (
            <Link to={`welcome/tag/${tag.id}`} className="btn btn-sm btn-light me-1 mb-1">{tag.name}</Link>
          ))}
        </div>
      </div>



    </div>
  )
}