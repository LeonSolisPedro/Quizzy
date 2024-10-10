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
  ],
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

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DATE: (array) => array.sort((a, b) => a.date - b.date),
        ISCOMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  return (
    <div>
      <p>This is the index of Admin</p>
      <Table data={data} sort={sort}>
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
    </div>
  )
}