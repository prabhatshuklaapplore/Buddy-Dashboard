// import React from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import TextField from "@mui/material/TextField";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

// const style = {
//   width: "100%",
//   maxWidth: 360,
//   bgcolor: "background.paper",
//   position: "absolute",
//   zIndex: 9999,
//   boxShadow: "0 0 10px 0 rgba(0,0,0,0.4)",
// };

// export default function App() {
//   const [address, setAddress] = React.useState("");
//   const [coordinates, setCoordinates] = React.useState({
//     lat: null,
//     lng: null,
//   });

//   const handleSelect = async (value) => {
//     const results = await geocodeByAddress(value);
//     const latLng = await getLatLng(results[0]);
//     setAddress(value);
//     setCoordinates(latLng);
//   };

//   return (
//     <div>
//       <PlacesAutocomplete
//         value={address}
//         onChange={setAddress}
//         onSelect={handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             {/* <p>Latitude: {coordinates.lat}</p>
//             <p>Longitude: {coordinates.lng}</p> */}

//             <TextField {...getInputProps({ placeholder: "Type address" })} />

//             <div className={style}>
//               ;{loading ? <div>...loading</div> : null}
//               {suggestions.map((suggestion) => {
//                 const style = {
//                     backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
//                     position: "absolute",
//                     zIndex: 9999,
//                     boxShadow: "0 0 10px 0 rgba(0,0,0,0.4)",
//                 };

//                 return (
//                   // <div {...getSuggestionItemProps(suggestion)}>
//                   //   <List
//                   //     sx={style}
//                   //     component="nav"
//                   //     aria-label="mailbox folders"
//                   //   >
//                   //     <Divider />
//                   //     <ListItem button>
//                   //       <ListItemText primary={suggestion.description} />
//                   //     </ListItem>
//                   //   </List>
//                   // </div>
//                   <div {...getSuggestionItemProps(suggestion, { style })}>
//                     {suggestion.description}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </div>
//   );
// }

import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function AutoComplete({ place }) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    place(results[0]);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

            <TextField {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
