import { Link, useLoaderData } from "react-router-dom";
import Modal from "bootstrap/js/src/modal"
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
import axios from "axios";
import Toast from "../../sweetalert";


export async function loader() {
  const users = await axios.get("/api/users")
  return users.data
}


export default function Admin() {
  const loader = useLoaderData();
  const [data, setData] = useState({ nodes: loader });

  //Handles user creation stuff
  const [user, setUser] = useState({ id: null, name: "", URLImage: "", email: "", password: "" })
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const updateUser = (newProperty, value) => {
    const newUser = { ...user, [newProperty]: value }
    setUser(newUser)
  }
  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageBase64(await toBase64(event.target.files[0]))
    }
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
  });
  const saveUser = async () => {
    try {
      const form = document.querySelector('#form')
      if (!form.reportValidity()) return
      let userImage = "https://i.ibb.co/NmMYhQN/i.jpg"
      if (image) {
        const formData = new FormData();
        formData.append("image", imageBase64)
        const prevAuthHeader = axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['Authorization'];
        const result = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGKEY}`, formData);
        userImage = result.data.data.display_url
        axios.defaults.headers.common['Authorization'] = prevAuthHeader;
      }
      const response = await axios.post("/api/register", { ...user, URLImage: userImage })
      const newData = { nodes: [...data.nodes, response.data.user] }
      setData(newData)
      resetUser()
      const userModal = document.querySelector("#userModal");
      const modal = Modal.getInstance(userModal)
      modal.hide();
    } catch (error) {
      Toast.fire({ icon: "error", title: error?.response?.data?.message ?? "Error" })
    }
  }
  const resetUser = () => {
    setUser({ id: null, name: "", URLImage: "", email: "", password: "" })
    setImage(null)
    setImageBase64(null)
  }


  //Handles Delete Data
  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continue'
      });
      if (!result.isConfirmed) return
      await axios.delete(`/api/users/${id}`)
      setData(state => ({
        ...state,
        nodes: state.nodes.filter((node) => node.id !== id),
      }));
    } catch (error) {
      Toast.fire({ icon: "error", title: error?.response?.data?.message ?? "Error" })
    }
  }

  //Handles block
  const handleBlock = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continue'
    });
    if (!result.isConfirmed) return
    await axios.put(`/api/users/${id}/block`)
    const newData = { nodes: data.nodes.map(user => user.id === id ? { ...user, isBlocked: !user.isBlocked } : user) }
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
    await axios.put(`/api/users/${id}/admin`)
    const newData = { nodes: data.nodes.map(user => user.id === id ? { ...user, isAdmin: !user.isAdmin } : user) }
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
    <div>
      <div class="card">
        <div class="card-header">
          <h2 className="card-title">List of users</h2>
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal">Add User</button>
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

      <div class="modal fade" id="userModal" tabIndex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Add User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="form">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" required className="form-control" value={user.name} onChange={e => updateUser("name", e.target.value)} />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email address</label>
                  <input type="email" required class="form-control" value={user.email} onChange={e => updateUser("email", e.target.value)} />
                </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" required class="form-control" value={user.password} onChange={e => updateUser("password", e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile picture</label>
                  <input type="file" onChange={onImageChange} accept="image/png, image/jpeg" className="form-control" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={() => saveUser()}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}