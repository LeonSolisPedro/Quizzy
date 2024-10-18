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
      name: 'Pedro León',
      email: "pedro@wintercr.com",
      isBlocked: false,
      isAdmin: true,
      URLImage: "https://i.pinimg.com/originals/68/28/4c/68284c53b5f4d7d94cd40fa19c9fd21d.jpg"
    },
    {
      id: 2,
      name: 'Test',
      email: "test@wintercr.com",
      isBlocked: false,
      isAdmin: false,
      URLImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP1z8odEN0zQOtOlL8wDp5lFcFqZpTBMCpCA&s"
    },
    {
      id: 3,
      name: 'Luis Novelo',
      email: "novelo@wintercr.com",
      isBlocked: false,
      isAdmin: false,
      URLImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwLjmr5uIJXFVZEVDi6FdkKuLB4AKh-TuNA&s"
    },
  ]
};


export default function Admin() {
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

  //Handles block
  const handleBlock = (id) => {
    const newData = { nodes: data.nodes.map(user => user.id === id ? {...user, isBlocked: !user.isBlocked}: user) }
    setData(newData)
  }

  //Handles admin
  const handleAdmin = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continue'
    });
    if (!result.isConfirmed) return
    const newData = { nodes: data.nodes.map(user => user.id === id ? {...user, isAdmin: !user.isAdmin}: user) }
    setData(newData)
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
        ID: (array) => array.sort((a, b) => a.id - b.id),
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        EMAIL: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
        STATUS: (array) => array.sort((a, b) => a.isBlocked - b.isBlocked),
        ISADMIN: (array) => array.sort((a, b) => a.isAdmin - b.isAdmin)
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
                  <HeaderCellSort sortKey="ID">Id</HeaderCellSort>
                  <HeaderCellSort sortKey="NAME">Name</HeaderCellSort>
                  <HeaderCellSort sortKey="EMAIL">Email</HeaderCellSort>
                  <HeaderCellSort sortKey="STATUS">Status</HeaderCellSort>
                  <HeaderCellSort sortKey="ISADMIN">Is Admin</HeaderCellSort>
                  <HeaderCell>Actions</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row item={item} key={item.id}>
                    <Cell>{item.id}</Cell>
                    <Cell>
                      <img className="image-50" src={item.URLImage} />
                      {item.name}
                    </Cell>
                    <Cell>{item.email}</Cell>
                    <Cell>
                      {item.isBlocked === true && (
                        <span className="badge text-bg-light">Blocked</span>
                      )}
                      {item.isBlocked === false && (
                        <span className="badge text-bg-success">Active</span>
                      )}
                    </Cell>
                    <Cell>
                      {item.isAdmin === true && (
                        <span className="badge text-bg-success">Yes</span>
                      )}
                      {item.isAdmin === false && (
                        <span className="badge text-bg-light">No</span>
                      )}
                    </Cell>
                    <Cell>
                      <div class="dropdown">
                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Actions
                        </button>
                        <ul class="dropdown-menu">
                          <li><button class="dropdown-item" onClick={() => handleRemove(item.id)}>Delete</button></li>
                          <li><button class="dropdown-item" onClick={() => handleBlock(item.id)}>{item.isBlocked ? "Unblock" : "Block"}</button></li>
                          <li><button class="dropdown-item" onClick={() => handleAdmin(item.id)}>{item.isAdmin ? "Remove from admin" : "Add to admin"}</button></li>
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