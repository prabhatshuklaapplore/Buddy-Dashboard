/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../layout/Main/Layout";
import CustomTable from "../../components/Custom/Table/CustomTable";
import { get, put, post, postFiles } from "../../config/axios";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Searchbar from "../../components/Custom/SearchBar/Searchbar";
import DeleteModal from "../../components/Custom/DeleteModal/DeleteModal";
import { deleteAPI } from "../../helper/apiCallHelper";
import { useDebouncedValue } from "../../helper/debounce";
import { toastMessage } from "../../utils/toastMessage";
import FormModal from "../../components/Custom/FormModal/FormModal";
import {
  cityDirectoryTableColumns,
  cityDirectoryFormFields,
} from "../../constants/CityDirectoryPage";

const City = () => {
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
    try {
      setLoading(true);
      const res = await get(
        `/api/dashboard/appUtility/getAppUtility?page=${page}&limit=${10}&search=${searchValue}&type=CITYGUIDE`
      );
      setUsers(
        res?.data.map((item) => ({
          ...item,
          action: { edit: true, delete: false },
        }))
      );
      setLoading(false);
      setPageCount(res?.totalPage);
    } catch (err) {
      console.error("Error:", err);
      setLoading(true);
    }
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
    let url = `/api/dashboard/appUtility/updateAppUtility?id=${row._id}`;
    let response = await deleteAPI(url);
    console.log("response", response);
    setDeleteModalOpen(false);
  };

  const handleStatus = (row) => {
    // Implement the status chnage for the selected row
    console.log("Delete clicked for row34:", row);
  };

  const handleActive = async (id, active) => {
    setLoading(true);
    let response = await put(
      `/api/dashboard/appUtility/updateAppUtility?id=${id}`,
      {
        active: active,
      }
    );
    setLoading(false);
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

  const handleSubmit = async (formData, isEditing, id) => {
    setLoading(true);
    try {
      if (isEditing) {
        console.log("form", formData);
        let form = new FormData();
        form.append("file", formData?.asset);
        const res = await postFiles("/api/app/user/uploadImage", form);
        const { ...data } = formData;
        data.asset = res.data.url;
        console.log(data);
        let response = await put(
          `/api/dashboard/appUtility/updateAppUtility?id=${id}`,
          data
        );
        setMessage(response.message);
        toastMessage(response.message, "success");
      } else {
        formData = {
          ...formData,
          type: "CITYGUIDE",
        };
        let form = new FormData();
        form.append("file", formData?.asset);
        const res = await postFiles("/api/app/user/uploadImage", form);
        const { ...data } = formData;
        data.asset = res.data.url;
        await post("/api/dashboard/appUtility/addAppUtility", data);
        setMessage("Successfully added");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error while processing the request");
      toastMessage("Error while updating", "error");
    }
    setLoading(false);
  };

  return (
    <>
      <Layout>
        <div style={{ padding: "1rem" }}>
          <Typography variant="h5">City Directory</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: "40%" }}>
              <Searchbar
                search={handleSearch}
                placeholder={"Seach by name"}
                debounceTime={1000}
              />
            </div>

            <Button
              onClick={() => openModal("add")}
              variant="outlined"
              startIcon={<AddIcon fontSize="large" />}
              style={{ fontWeight: "bold" }}
            >
              add FAQ
            </Button>
          </div>
          <CustomTable
            data={users}
            columns={cityDirectoryTableColumns}
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
        fields={cityDirectoryFormFields}
        header={editModal ? "Edit City directory" : "Add City directory"}
        initialData={editData}
        isEditing={editModal}
      />
    </>
  );
};

export default City;
