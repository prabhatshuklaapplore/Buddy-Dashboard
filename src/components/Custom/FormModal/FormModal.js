/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, MenuItem, Select } from "@mui/material";
import style from "./FormModal.module.css";
import AutocompletePlaces from "../../../hooks/autoComplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  fields,
  resetFormData,
  header,
  initialData,
  isEditing,
}) => {
  const initialFormData = {};
  const initialErrors = {};
  fields.forEach((field) => {
    initialFormData[field.name] = field.isMultiSelect ? [] : "";
    initialErrors[field.name] = "";
  });

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const [address, setAddress] = React.useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng);
    setFormData({
      ...formData,
      gAddress: results[0].formatted_address,
      // location.lattitude: latLng.lat,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  const validateFormData = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const isEmpty = !formData[field.name];
      const isEditingFileField = field.type === "file" && field.isEditing;
      const isFileEmpty = isEditingFileField && !formData[field.name].name;

      if (field.required && (isEmpty || isFileEmpty)) {
        newErrors[field.name] = `${field.label} is required`;
      } else {
        newErrors[field.name] = "";
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (fieldName, fieldType) => (event, newValue) => {
    if (Array.isArray(newValue)) {
      setFormData({ ...formData, [fieldName]: newValue });
    } else if (fieldType === "file") {
      const file = event.target.files[0];
      setFormData({ ...formData, [fieldName]: file });
    } else if (fieldType === "autoComplete") {
      console.log("hello");
      // setFormData({ ...formData, [fieldName]: address });
    } else {
      setFormData({ ...formData, [fieldName]: event.target.value });
    }
  };
  const handleSubmit = () => {
    if (validateFormData()) {
      console.log(formData);
      onSubmit(formData, isEditing, initialData._id);
      onClose();
    }
  };

  const handleCancel = () => {
    const clearedFormData = {};
    fields.forEach((field) => {
      clearedFormData[field.name] = field.isMultiSelect ? [] : "";
    });
    setFormData(clearedFormData);
    setErrors(initialErrors);
    onClose();
  };

  useEffect(() => {
    if (resetFormData) {
      setFormData(initialFormData);
      setErrors(initialErrors);
    }
  }, [resetFormData]);

  const getNestedProperty = (obj, path) => {
    const keys = path.split(".");
    let result = obj;

    for (const key of keys) {
      result = result[key];
      if (result === undefined) {
        return "";
      }
    }

    return result;
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className={style.main_div}
      >
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          align="center"
          style={{ textDecoration: "underline" }}
        >
          {header}
        </Typography>
        <form>
          <div style={{ margin: "1rem 0" }}>
            {fields.map((field) => {
              let fieldname = field.name;
              return (
                <div key={field.name} style={{ marginBottom: "10px" }}>
                  <Typography>{field.label}</Typography>
                  {field.isMultiSelect ? (
                    <Autocomplete
                      disabled={field.disabled ? true : false}
                      multiple
                      id={field.name}
                      options={field.options}
                      value={formData[field.name]}
                      onChange={(_, newValue) =>
                        handleChange(field.name)(_, newValue)
                      }
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors[field.name]}
                          helperText={errors[field.name]}
                        />
                      )}
                    />
                  ) : field.isMultiSelect === false ? (
                    <Select
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(event) => handleChange(field.name)(event)}
                      fullWidth
                      error={!!errors[field.name]}
                      helperText={errors[field.name]}
                      disabled={field.disabled ? true : false}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : field.type === "file" ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleChange(field.name, field.type)(event)
                        }
                      />
                      {field.required && !formData[field.name] && (
                        <p
                          className={style.error_msg}
                        >{`${field.label} is required`}</p>
                      )}
                    </>
                  ) : field.type === "autoComplete" ? (
                    <>
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

                            <TextField
                              {...getInputProps({
                                placeholder: "Type address",
                              })}
                            />

                            <div>
                              {loading ? <div>...loading</div> : null}

                              {suggestions.map((suggestion) => {
                                const style = {
                                  backgroundColor: suggestion.active
                                    ? "#41b6e6"
                                    : "#fff",
                                };

                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      style,
                                    })}
                                  >
                                    {suggestion.description}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>

                      {field.required && !formData[field.name] && (
                        <p
                          className={style.error_msg}
                        >{`${field.label} is required`}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <TextField
                        // label={field.label}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={getNestedProperty(formData, fieldname)}
                        onChange={(event) => handleChange(field.name)(event)}
                        fullWidth
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                        disabled={field.disabled ? field.disabled : false}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </form>
        <Button onClick={handleCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ ml: 4 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default FormModal;
