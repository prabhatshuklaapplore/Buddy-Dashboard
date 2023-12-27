export const cityDirectoryTableColumns = [
  {
    id: "S.No",
    label: "id",
    minWidth: 70,
    align: "left",
  },
  {
    id: "title",
    label: "Directory Name",
    minWidth: 70,
    align: "left",
  },
  {
    id: "description",
    label: "Phone Number",
    minWidth: 70,
    maxWidth: 100,
    align: "left",
  },
  {
    id: "asset",
    label: "Image",
    minWidth: 70,
    align: "center",
    type: "IMAGE",
  },
  {
    id: "category",
    label: "City Name",
    minWidth: 70,
    align: "center",
    type: "text",
  },
  {
    id: "createdAt",
    label: "Date",
    minWidth: 70,
    align: "center",
    type: "date",
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
export const cityDirectoryFormFields = [
  {
    name: "title",
    label: "Directory Name",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "asset",
    label: "Image",
    type: "file",
    required: true,
  },
];
