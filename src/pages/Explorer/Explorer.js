// /* eslint-disable react-hooks/exhaustive-deps */

// import React, { useEffect, useState } from "react";
// import Layout from "../../layout/Main/Layout";
// import CustomTable from "../../components/Custom/Table/CustomTable";

// import { get, put, post, patch } from "../../config/axios";
// import { Typography } from "@mui/material";
// import Searchbar from "../../components/Custom/SearchBar/Searchbar";
// import DeleteModal from "../../components/Custom/DeleteModal/DeleteModal";
// import { deleteAPI } from "../../helper/apiCallHelper";
// import { usertableColumns } from "../../constants/userPage";
// import { useDebouncedValue } from "../../helper/debounce";
// import { toastMessage } from "../../utils/toastMessage";
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import FormModal from "../../components/Custom/FormModal/FormModal";
// import { userFormFields } from "../../constants/userPage";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [deleteUser, setDeleteUser] = useState("");
//   const [search, setSearch] = useState("");
//   const [message, setMessage] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageCount, setPageCount] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const debouncedSearch = useDebouncedValue(search, 2000);
//   const [userType, setUserType] = useState("ADMIN");

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [editModal, setEditModal] = useState(false);
//   const [editData, setEditData] = useState({});

//   // dashUser/getAllUsers?page=1&limit=10&userType=PETOWNER
//   const fetchUsers = async (searchValue) => {
//     console.log(searchValue);
//     await get(
//       `dashUser/getAllUsers?page=${page}&limit=${10}&search=${""}`
//     )
//       .then((res) => {
//         // console.log("res", res?.data);
//         setUsers(
//           res?.data.map((item) => ({
//             ...item,
//             action: { edit: true, delete: false },
//           }))
//         );

//         setLoading(false);
//         setPageCount(res?.totalPage);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         setLoading(true);
//       });
//   };

//   useEffect(() => {
//     fetchUsers(userType);
//     if (search === "") {
//       fetchUsers("");
//     } else if (debouncedSearch) {
//       fetchUsers(debouncedSearch);
//     }
//   }, [search]);

//   const handleEdit = (row) => {
//     // Implement the edit action for the selected row
//     console.log("Edit clicked for row:", row);
//   };

//   const handleDelete = (row) => {
//     setDeleteUser(row);
//     setDeleteModalOpen(true);
//   };

//   const handleDeleteUser = async (row) => {
//     let url = `/admin/access-management/user/${row._id}`;
//     let response = await deleteAPI(url);
//     console.log("response", response);
//     setDeleteModalOpen(false);
//   };

//   const handleStatus = (row) => {
//     // Implement the status chnage for the selected row
//     console.log("Delete clicked for row34:", row);
//   };

//   const handleActive = async (id, active) => {
//     let response = await put(`/dashUser/updateAccount`, {
//       active: active,
//     });
//     setMessage(response.message);
//     toastMessage(response.message, "success");
//   };

//   const handleSearch = (searchText) => {
//     setSearch(searchText);
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteModalOpen(false);
//   };

//   const handleChange = (page) => {
//     setPage(page);
//   };

//   // const handleUserTypeChange = (event) => {
//   //   setUserType(event.target.value);
//   //   // fetchUsers(userType);
//   // };

//   const openModal = (type, dataForEdit) => {
//     console.log("first", dataForEdit);
//     if (type === "add") {
//       setIsModalOpen(true);
//     } else if (type === "edit") {
//       setEditModal(true);
//       setEditData(dataForEdit);
//     }
//   };

//   const closeModal = (type) => {
//     if (type === "add") {
//       setIsModalOpen(false);
//     } else if (type === "edit") {
//       setEditModal(false);
//       setEditData({});
//     }
//   };

//   const handleSubmit = async (formData, isEditing) => {
//     try {
//       if (isEditing) {
//         formData = {
//           ...formData,
//           permissionsId: formData.permissions.map((p) => p.value),
//         };
//         const { permissions, ...data } = formData;
//         await patch("/admin/auth/edit", data);
//         setMessage("Successfully updated");
//         setEditData({});
//         setEditModal(false);
//       } else {
//         formData = {
//           ...formData,
//           permissionsId: formData.permissions.map((p) => p.value),
//         };
//         const { permissions, ...data } = formData;

//         await post("/admin/auth/register", { data });
//         setMessage("Successfully added");
//         setIsModalOpen(false);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setMessage("Error while processing the request");
//     }
//   };

//   return (
//     <>
//       <Layout>
//         <div style={{ padding: "1rem" }}>
//           <Typography variant="h5">Users</Typography>
//           <Searchbar
//             search={handleSearch}
//             placeholder={"Seach by name, email, phone number"}
//             debounceTime={1000}
//           />
//           <FormControl
//             variant="outlined"
//             sx={{ minWidth: 180, margin: "1rem" }}
//           >
//             <InputLabel htmlFor="chartType">Select Chart Type</InputLabel>
//             {/* <Select
//               label="Select User Type"
//               value={userType}
//               onChange={handleUserTypeChange}
//               id="userType"
//             >
//               <MenuItem value="ADMIN">Admin</MenuItem>
//               <MenuItem value="USER">User</MenuItem>
//             </Select> */}
//           </FormControl>
//           <CustomTable
//             data={users}
//             columns={usertableColumns}
//             handleEdit={(row) => openModal("edit", row)}
//             handleDelete={handleDelete}
//             handleStatus={handleStatus}
//             handleActive={(row, active) => handleActive(row, active)}
//             handlePageChange={(page) => handleChange(page)}
//             pageNumber={page}
//             pageCount={pageCount}
//             loading={loading}
//           />
//         </div>
//       </Layout>
//       <DeleteModal
//         open={isDeleteModalOpen}
//         onClose={handleCloseDeleteModal}
//         onDelete={handleDeleteUser}
//         data={deleteUser}
//       />

//       <FormModal
//         isOpen={isModalOpen || editModal}
//         onClose={() => closeModal(editModal ? "edit" : "add")}
//         onSubmit={handleSubmit}
//         fields={userFormFields}
//         header={editModal ? "Edit Admin" : "Add Admin"}
//         initialData={editData}
//         isEditing={editModal}
//       />
//     </>
//   );
// };

// export default Users;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../layout/Main/Layout";
import CustomTable from "../../components/Custom/Table/CustomTable";
import { get, put, post, patch } from "../../config/axios";
import { Typography } from "@mui/material";
import Searchbar from "../../components/Custom/SearchBar/Searchbar";
import DeleteModal from "../../components/Custom/DeleteModal/DeleteModal";
import { deleteAPI } from "../../helper/apiCallHelper";
import { usertableColumns } from "../../constants/userPage";
import { useDebouncedValue } from "../../helper/debounce";
import { toastMessage } from "../../utils/toastMessage";
import FormModal from "../../components/Custom/FormModal/FormModal";
import { userFormFields } from "../../constants/userPage";

const Explorer = () => {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebouncedValue(search, 2000);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchUsers = async (searchValue) => {
    console.log(searchValue);
    await get(
      `dashUser/getAllUsers?page=${page}&limit=${10}&search=${searchValue}`
    )
      .then((res) => {
        // console.log("res", res?.data);
        setUsers(
          res?.data.map((item) => ({
            ...item,
            action: { edit: true, delete: false },
          }))
        );
        setLoading(false);
        setPageCount(res?.totalPage);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    if (search === "") {
      fetchUsers("");
    } else if (debouncedSearch) {
      fetchUsers(debouncedSearch);
    }
  }, [search, debouncedSearch, message, page]);

  const handleEdit = (row) => {
    // Implement the edit action for the selected row
    openModal("edit", row);
  };

  const handleDelete = (row) => {
    setDeleteUser(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = async (row) => {
    let url = `/admin/access-management/user/${row._id}`;
    let response = await deleteAPI(url);
    console.log("response", response);
    setDeleteModalOpen(false);
  };

  const handleStatus = (row) => {
    // Implement the status chnage for the selected row
    console.log("Delete clicked for row34:", row);
  };

  const handleActive = async (id, active) => {
    let response = await put(`/dashUser/updateAccount/?id=${id}`, {
      active: active,
    });
    setMessage(response.message);
    toastMessage(response.message, "success");
  };

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleChange = (page) => {
    setPage(page);
  };

  const openModal = (type, dataForEdit) => {
    console.log("first", dataForEdit);
    if (type === "add") {
      setIsModalOpen(true);
    } else if (type === "edit") {
      setEditModal(true);
      setEditData(dataForEdit);
    }
  };

  const closeModal = (type) => {
    if (type === "add") {
      setIsModalOpen(false);
    } else if (type === "edit") {
      setEditModal(false);
      setEditData({});
    }
  };

  const handleSubmit = async (e, formData, isEditing, id) => {
    console.log(id);
    try {
      if (isEditing) {
        formData = {
          ...formData,
          // permissionsId: formData.permissions.map((p) => p.value),
        };
        const { ...data } = formData;
        let response = await put(`/dashUser/updateAccount?id=${id}`, data);
        console.log(response);
        setMessage(response.message);
        setEditData({});
        setEditModal(false);
      } else {
        formData = {
          ...formData,
        };
        const { ...data } = formData;

        await post("", { data });
        setMessage("Successfully added");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error while processing the request");
    }
  };

  return (
    <>
      <Layout>
        <div style={{ padding: "1rem" }}>
          <Typography variant="h5">Users</Typography>
          <Searchbar
            search={handleSearch}
            placeholder={"Seach by name"}
            debounceTime={1000}
          />
          <CustomTable
            data={users}
            columns={usertableColumns}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
            handleActive={(row, active) => handleActive(row, active)}
            handlePageChange={(page) => handleChange(page)}
            pageNumber={page}
            pageCount={pageCount}
            loading={loading}
          />
        </div>
      </Layout>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteUser}
        data={deleteUser}
      />
      <FormModal
        isOpen={isModalOpen || editModal}
        onClose={() => closeModal(editModal ? "edit" : "add")}
        onSubmit={handleSubmit}
        fields={userFormFields}
        header={editModal ? "Edit Admin" : "Add Admin"}
        initialData={editData}
        isEditing={editModal}
      />
    </>
  );
};

export default Explorer;
