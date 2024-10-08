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
      name: 'Pedro León',
      date: new Date(2020, 1, 15),
      type: 1,
      isComplete: true,
    },
    {
      id: 2,
      name: 'Luis Novelo',
      date: new Date(2019, 1, 15),
      type: 0,
      isComplete: false,
    },
    {
      id: 3,
      name: 'Joshua',
      date: new Date(2024, 1, 15),
      type: 1,
      isComplete: false,
    },
  ]
};


export default function Admin() {
  const [data, setData] = useState(apiResponse);

  //Handles Delete Data
  const handleRemove = (id) => {
    setData((state) => ({
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
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DATE: (array) => array.sort((a, b) => a.date - b.date),
        ISCOMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
      },
    }
  );

  return (
    <div class="card">
      <div class="card-header">
        <h2 className="card-title">List of users</h2>
        <button className="btn btn-primary">Add User</button>
      </div>
      <div className="card-body">
        <Table data={data} sort={sort} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Id</HeaderCell>
                  <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                  <HeaderCellSort sortKey="DATE">Date</HeaderCellSort>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCellSort sortKey="ISCOMPLETE">Is Complete</HeaderCellSort>
                  <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    <Cell>{item.id}</Cell>
                    <Cell>
                      <img className="image-50" src="https://hagleysbeauty.com/wp-content/uploads/2023/03/test-button-1.jpg" />
                      {item.name}
                    </Cell>
                    <Cell>{item.date.toString()}</Cell>
                    <Cell>{item.type}</Cell>
                    <Cell>{item.isComplete.toString()}</Cell>
                    <Cell>
                      <div class="dropdown">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul class="dropdown-menu">
                          <li><button class="dropdown-item" onClick={() => handleRemove(item.id)}>Action</button></li>
                          <li><button class="dropdown-item">Another action</button></li>
                          <li><button class="dropdown-item">Something else here</button></li>
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