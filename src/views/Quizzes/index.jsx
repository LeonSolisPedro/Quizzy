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
import { useState } from "react";


const apiResponse = {
  nodes: [
    {
      id: 1,
      name: 'Pedro León',
      date: new Date(2020, 1, 15),
      type: 1,
      isComplete: true,
    },
    {
      id: 2,
      name: 'Luis Novelo',
      date: new Date(2020, 1, 15),
      type: 0,
      isComplete: true,
    },
  ],
};


export default function Index() {
  const [data, setData] = useState(apiResponse);


  const handleRemove = (id) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.filter((node) => node.id !== id),
    }));
  }

  return (
    <div>
      <p>This is the index of Quizzes</p>
      <Table data={data}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell sortKey="">Id</HeaderCell>
                <HeaderCell sortKey="">Name</HeaderCell>
                <HeaderCell sortKey="">Date</HeaderCell>
                <HeaderCell sortKey="">Type</HeaderCell>
                <HeaderCell sortKey="">Complete</HeaderCell>
                <HeaderCell sortKey="">Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row item={item} key={item.id}>
                  <Cell>{item.id}</Cell>
                  <Cell>{item.name}</Cell>
                  <Cell>{item.date.toString()}</Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>{item.isComplete.toString()}</Cell>
                  <Cell>
                    <button type="button" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      <Link to={`1`}>Go to quizz 1</Link>
    </div>
  )
}