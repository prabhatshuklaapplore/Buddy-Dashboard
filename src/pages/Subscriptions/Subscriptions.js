/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../layout/Main/Layout";
import { Button, Typography } from "@mui/material";
import CustomTable from "../../components/Custom/Table/CustomTable";
import { get, patch, post } from "../../config/axios";
import DeleteModal from "../../components/Custom/DeleteModal/DeleteModal";
import { deleteAPI } from "../../helper/apiCallHelper";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../../components/Custom/FormModal/FormModal";
import {
  subscriptionformFields,
  subscriptiontableColumns,
} from "../../constants/subscriptionsPage";
import { toastMessage } from "../../utils/toastMessage";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    await get(`/vendors/membership/getSubscription?page=${page}&limit=${20}`)
      .then((res) => {
        setSubscriptions(
          res?.data.map((item) => ({
            ...item,
            action: { edit: true, delete: true },
          }))
        );
        setMessage("Fetched");
        setPageCount(res?.totalPage);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [message, page]);

  const handleDelete = (row) => {
    setDeleteUser(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteSubscription = async (row) => {
    let url = `/admin/access-management/Subscriptionsdelete?_id=${row._id}`;
    let response = await deleteAPI(url);
    setDeleteModalOpen(false);
    toastMessage(response.message, "success");
  };

  const handleStatus = (row) => {
    // Implement the status chnage for the selected row
    console.log("Delete clicked for row34:", row);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
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

  const handleSubmit = async (formData, isEditing) => {
    try {
      if (isEditing) {
        formData._id = editData._id;
        let response = await patch(
          "/admin/access-management/SubscriptionsUpdate",
          formData
        );
        setMessage(response.message);
        toastMessage(response.message, "success");
      } else {
        let response = await post(
          "/admin/access-management/SubscriptionsType",
          formData
        );
        setMessage(response.message);
        toastMessage(response.message, "success");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error while processing the request");
      toastMessage("Error while updating", "error");
    }
  };

  const handleChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <Layout>
        <div style={{ padding: "1rem" }}>
          <Typography variant="h5">Subscriptions</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: "40%" }}></div>

            <Button
              onClick={() => openModal("add")}
              variant="outlined"
              startIcon={<AddIcon fontSize="large" />}
              style={{ fontWeight: "bold" }}
            >
              add subscription
            </Button>
          </div>
          <CustomTable
            data={subscriptions}
            columns={subscriptiontableColumns}
            handleEdit={(row) => openModal("edit", row)}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
            handlePageChange={(page) => handleChange(page)}
            pageNumber={page}
            pageCount={pageCount}
            loading={loading}
          />
        </div>
        <DeleteModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSubscription}
          data={deleteUser}
        />
      </Layout>
      <FormModal
        isOpen={isModalOpen || editModal}
        onClose={() => closeModal(editModal ? "edit" : "add")}
        onSubmit={handleSubmit}
        fields={subscriptionformFields}
        header={editModal ? "Edit Subscription" : "Add Subscription"}
        initialData={editData}
        isEditing={editModal}
      />
    </>
  );
};

export default Subscriptions;
