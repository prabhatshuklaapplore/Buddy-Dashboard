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
    id: "timing.startTime",
    label: "Event start date & time",
    minWidth: 200,
    align: "center",
  },
  {
    id: "timing.endTime",
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
  {
    name: "asset",
    label: "Image",
    type: "text",
    required: false,
  },
  {
    name: "gAddress",
    label: "Location",
    type: "text",
    required: false,
  },
  {
    name: "timing.startTime",
    label: "Event start date & time",
    type: "datetime-local",
    required: false,
  },
  {
    name: "timing.endTime",
    label: "Event end date & time",
    type: "datetime-local",
    required: false,
  },
  {
    name: "description",
    label: "Event description",
    type: "text",
    required: false,
  },
];
