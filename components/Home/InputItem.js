import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import NearbyPlaceOptions from "./NearbyPlaceOptions";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const getLatAndLng = (place, type) => {
    if (place && place.value && place.value.place_id) {
      const placeId = place.value.place_id;
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails({ placeId }, (place, status) => {
        if (status === "OK" && place.geometry && place.geometry.location) {
          const locationData = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          };

          if (type === "source") {
            setSource(locationData);
          } else {
            setDestination(locationData);
          }
        }
      });
    }
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4 relative">
      <Image
        src={type === "source" ? "/source.png" : "/dest.png"}
        width={20}
        height={20}
      />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            setValue(place);
            getLatAndLng(place, type);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
          onFocus: () => {
            if (type === "destination") {
              setShowNearbyPlaces(true);
            }
          },
          onBlur: () => {
            if (type === "destination") {
              setShowNearbyPlaces(false);
            }
          },
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: "none",
            }),
          },
        }}
      />
      {showNearbyPlaces && type === "destination" && (
        <NearbyPlaceOptions
          places={nearbyPlaces}
        />
      )}
    </div>
  );
}

export default InputItem;