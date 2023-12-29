export const eventstableColumns = [
  {
    id: "S.No",
    label: "S.No",
    minWidth: 70,
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    minWidth: 70,
    align: "center",
  },
  {
    id: "asset",
    label: "Image",
    minWidth: 70,
    align: "center",
    type: "IMAGE",
  },
  {
    id: "gAddress",
    label: "Location",
    minWidth: 70,
    align: "center",
  },
  {
    id: "startDate",
    label: "Event start date & time",
    minWidth: 200,
    type: "datetime-local",
    align: "center",
  },
  {
    id: "endDate",
    label: "Event end date & time",
    minWidth: 200,
    align: "center",
  },
  // {
  //   id: "description",
  //   label: "Event description",
  //   minWidth: 200,
  //   align: "center",
  // },
  {
    id: "details",
    label: "Details",
    minWidth: 70,
    align: "center",
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

export const eventsFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: false,
  },
  // {
  //   name: "asset",
  //   label: "Image",
  //   type: "text",
  //   required: false,
  // },
  {
    name: "gAddress",
    label: "Location",
    type: "autoComplete",
    required: false,
  },
  {
    name: "startDate",
    label: "Event start date & time",
    type: "datetime-local",
    required: false,
  },
  {
    name: "endDate",
    label: "Event end date & time",
    type: "datetime-local",
    required: false,
  },
  {
    name: "description",
    label: "Event description",
    type: "description",
    required: false,
  },
];
