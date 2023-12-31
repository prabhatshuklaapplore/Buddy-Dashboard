export const usertableColumns = [
  {
    id: "S.No",
    label: "id",
    minWidth: 70,
    align: "left",
  },
  {
    id: "fullname",
    label: "Full Name",
    minWidth: 70,
    align: "left",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 70,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 70,
    align: "left",
  },
  {
    id: "phone",
    label: "Phone No.",
    minWidth: 70,
    align: "left",
  },
  {
    id: "city",
    label: "City",
    minWidth: 70,
    align: "left",
  },
  {
    id: "country",
    label: "Country",
    minWidth: 70,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Registration Date",
    minWidth: 70,
    align: "left",
  },
  {
    id: "active",
    label: "Active",
    minWidth: 70,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

export const userFormFields = [
  { name: "fullname", label: "Full Name", type: "text", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "text",
    required: false,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone No.",
    type: "text",
    required: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: false,
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    required: false,
  },
  {
    name: "createdAt",
    label: "Registration Date",
    type: "text",
    required: true,
  },
];
