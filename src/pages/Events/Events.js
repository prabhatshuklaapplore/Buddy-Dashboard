/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import Layout from "../../layout/Main/Layout";
// import CustomTable from "../../components/Custom/Table/CustomTable";
// import { get, put, post, patch } from "../../config/axios";
// import { Typography } from "@mui/material";
// import Searchbar from "../../components/Custom/SearchBar/Searchbar";
// import DeleteModal from "../../components/Custom/DeleteModal/DeleteModal";
// import { deleteAPI } from "../../helper/apiCallHelper";
// import {
//   eventstableColumns,
//   eventsFormFields,
// } from "../../constants/eventsPage";
// import { useDebouncedValue } from "../../helper/debounce";
// import { toastMessage } from "../../utils/toastMessage";
// import FormModal from "../../components/Custom/FormModal/FormModal";

// const Events = () => {
//   const [users, setUsers] = useState([]);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [deleteUser, setDeleteUser] = useState("");
//   const [search, setSearch] = useState("");
//   const [message, setMessage] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageCount, setPageCount] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const debouncedSearch = useDebouncedValue(search, 2000);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [viewData, setViewData] = useState({});
//   const [viewModal, setViewModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [editData, setEditData] = useState({});

//   const fetchUsers = async (searchValue) => {
//     setLoading(true);
//     console.log(searchValue);
//     await get(
//       `/api/dashboard/features/getEvents?page=${page}&limit=${10}&search=${searchValue}`
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
//     if (search === "") {
//       fetchUsers("");
//     } else if (debouncedSearch) {
//       fetchUsers(debouncedSearch);
//     }
//   }, [search, debouncedSearch, message, page]);

//   const handleEdit = (row) => {
//     // Implement the edit action for the selected row
//     openModal("edit", row);
//   };

//   const handleDelete = (row) => {
//     setDeleteUser(row);
//     setDeleteModalOpen(true);
//   };

//   const handleDeleteUser = async (row) => {
//     let url = `/api/dashboard/features/updateEvent?id=${row._id}`;
//     let response = await deleteAPI(url);
//     console.log("response", response);
//     setDeleteModalOpen(false);
//   };

//   const handleStatus = (row) => {
//     // Implement the status chnage for the selected row
//     console.log("Delete clicked for row34:", row);
//   };

//   const handleDisplay = (row) => {
//     // Implement the edit action for the selected row
//     console.log("Display", row);
//     setViewData(row);
//     setViewModal(true);
//   };

//   const handleActive = async (id, active) => {
//     setLoading(true);
//     let response = await put(`/api/dashboard/features/updateEvent?id=${id}`, {
//       active: active,
//     });
//     setLoading(false);
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

//   const handleSubmit = async (formData, isEditing, id) => {
//     console.log(id);
//     setLoading(true);
//     try {
//       if (isEditing) {
//         formData = {
//           ...formData,
//         };
//         const { ...data } = formData;
//         let response = await put(
//           `/api/dashboard/features/updateEvent?id=${id}`,
//           data
//         );
//         console.log(response);
//         setMessage(response.message);
//         setEditData({});
//         setEditModal(false);
//       } else {
//         formData = {
//           ...formData,
//         };
//         const { ...data } = formData;

//         await post("", { data });
//         setMessage("Successfully added");
//         setIsModalOpen(false);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setMessage("Error while processing the request");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <Layout>
//         <div style={{ padding: "1rem" }}>
//           <Typography variant="h5">Events</Typography>
//           <Searchbar
//             search={handleSearch}
//             placeholder={"Seach by name"}
//             debounceTime={1000}
//           />
//           <CustomTable
//             data={users}
//             columns={eventstableColumns}
//             handleEdit={handleEdit}
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
//         fields={eventsFormFields}
//         header={editModal ? "Edit Events" : "Add Events"}
//         initialData={editData}
//         isEditing={editModal}
//       />
//     </>
//   );
// };

// export default Events;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../layout/Main/Layout";
import { Box, Button, Modal, Typography } from "@mui/material";
import CustomTable from "../../components/Custom/Table/CustomTable";
import { get, put } from "../../config/axios";
import Searchbar from "../../components/Custom/SearchBar/Searchbar";
import DeleteModal from "../../components/Custom/DeleteModal/DeleteModal";
import { deleteAPI, updateAPI } from "../../helper/apiCallHelper";
import { toastMessage } from "../../utils/toastMessage";
import {
  eventstableColumns,
  eventsFormFields,
} from "../../constants/eventsPage";
import { useDebouncedValue } from "../../helper/debounce";
import styles from "./Events.module.css";
import FormModal from "../../components/Custom/FormModal/FormModal";
import AutoCompletePlaces from "../../hooks/autoComplete";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");
  const [message, setMessage] = useState("");
  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const debouncedSearch = useDebouncedValue(search, 2000);

  const fetchEvents = async (searchValue) => {
    setLoading(true);
    await get(
      `/api/dashboard/features/getEvents?page=${page}&limit=${10}&search=${searchValue}`
    )
      .then((res) => {
        console.log("res", res?.data);
        setEvents(
          res?.data.map((item) => ({
            ...item,
            action: { edit: true, delete: false },
          }))
        );
        setPageCount(res?.totalPage);
        setMessage(res?.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    if (search === "") {
      fetchEvents("");
    } else if (debouncedSearch) {
      fetchEvents(debouncedSearch);
    }
  }, [search, debouncedSearch, message, page]);

  // const handleEdit = (row) => {
  //   // Implement the edit action for the selected row
  //   console.log("Edit clicked for row 12:", row);
  // };

  const handleDisplay = (row) => {
    // Implement the edit action for the selected row
    console.log("Display", row);
    setViewData(row);
    setViewModal(true);
  };

  const handleDelete = (row) => {
    setDeleteUser(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteEvent = async (row) => {
    let url = `/vendors/event/remove/${row._id}`;
    let response = await deleteAPI(url);
    toastMessage(response, "success");
    setMessage(response);
    setDeleteModalOpen(false);
  };

  const handleStatus = (row) => {
    // Implement the status chnage for the selected row
    console.log("Delete clicked for row34:", row);
  };

  const handleActive = async (id, active, type) => {
    setLoading(true);
    let updateValue = {};
    if (type === "published") {
      updateValue = {
        isPublished: active,
      };
    }
    if (type === "active") {
      updateValue = {
        active: active,
      };
    }
    let response = await updateAPI(
      `/api/dashboard/features/updateEvent?id=${id}`,
      updateValue
    );
    setLoading(false);
    setMessage(response.message);
    toastMessage(response, "success");
  };

  const handleSubmit = async (formData, isEditing) => {
    try {
      if (isEditing) {
        console.log("data", formData);
        // let form = new FormData();
        // form.append("file", formData?.asset);
        // const res = await postFiles("/api/app/user/uploadImage", form);
        // const { ...data } = formData;
        // data.asset = res.data.url;
        
        // await put(
        //   `/api/dashboard/features/updateEvent?id=${editData._id}`,
        //   formData
        // );
        setMessage("Event Successfully updated");
        setEditData({});
        setEditModal(false);
      } else {
        // await post("/admin/dashboard/addon", formData);
        setMessage("Successfully added");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error:", err);
      // setMessage("Error while processing the request");
    }
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
    if (type === "add") {
      setIsModalOpen(true);
    } else if (type === "edit") {
      setEditModal(true);
      setEditData(dataForEdit);
    }
  };

  console.log("edit data", editData);

  const closeModal = (type) => {
    if (type === "add") {
      setIsModalOpen(false);
    } else if (type === "edit") {
      setEditModal(false);
      setEditData({});
    }
  };

  return (
    <>
      <Layout>
        <div style={{ padding: "1rem" }}>
          <Typography variant="h5">Events</Typography>
          <Searchbar
            search={handleSearch}
            placeholder={"Seach by name"}
            debounceTime={1000}
          />
          <CustomTable
            data={events}
            columns={eventstableColumns}
            handleEdit={(row) => openModal("edit", row)}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
            handleDisplay={handleDisplay}
            handleActive={(row, active, type) =>
              handleActive(row, active, type)
            }
            handlePageChange={(page) => handleChange(page)}
            pageNumber={page}
            pageCount={pageCount}
            loading={loading}
          />
        </div>
        <DeleteModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteEvent}
          data={deleteUser}
        />
      </Layout>
      <FormModal
        isOpen={isModalOpen || editModal}
        onClose={() => closeModal(editModal ? "edit" : "add")}
        onSubmit={handleSubmit}
        fields={eventsFormFields}
        header={editModal ? "Edit Events" : "Add Events"}
        initialData={editData}
        isEditing={editModal}
      />

      <Modal
        open={viewModal}
        onClose={() => {
          setViewModal(false);
          setViewData({});
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className={styles.view_modal}>
          <Typography
            variant="h5"
            sx={{ p: 1 }}
            style={{ textAlign: "center" }}
          >
            Event Details
          </Typography>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <table className={styles.view_table}>
              <thead className={styles.table_head}>
                <tr>
                  <th>Type</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody className={styles.table_body}>
                <tr style={{ border: "1px solid black" }}>
                  <td>Name</td>
                  <td>{viewData?.name ? viewData?.name : "-"}</td>
                </tr>
                <tr style={{ border: "1px solid black" }}>
                  <td>Description</td>
                  <td>{viewData?.description ? viewData?.description : "-"}</td>
                </tr>

                <tr style={{ border: "1px solid black" }}>
                  <td>Event Start Date & Time</td>
                  <td>{viewData?.startDate}</td>
                </tr>
                <tr style={{ border: "1px solid black" }}>
                  <td>Event End Date & Time</td>
                  <td>{viewData?.endDate}</td>
                </tr>
                <tr style={{ border: "1px solid black" }}>
                  <td>Location</td>
                  <td>{viewData?.gAddress}</td>
                </tr>

                <tr style={{ border: "1px solid black" }}>
                  <td>Images</td>
                  <td>
                    {viewData?.asset ? (
                      <div className={styles.image_container}>
                        <img
                          src={viewData.asset}
                          alt={`Event`}
                          className={styles.image}
                        />
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setViewModal(false);
                setViewData({});
              }}
            >
              close
            </Button>
          </Box>
        </Box>
      </Modal>
      <AutoCompletePlaces />
    </>
  );
};

export default Events;
