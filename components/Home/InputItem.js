import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import NearbyPlaceOptions from "./NearbyPlaceOptions";

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

  useEffect(() => {
    if (type === "destination") {
      if (showNearbyPlaces && !value) {
        setShowNearbyPlaces(false);
      }
    }
  }, [value]);

  const handleNearbyPlaceClick = (place) => {
    setValue({ value: { label: place.name, description: place.vicinity } });
    setShowNearbyPlaces(false);
    getLatAndLng({ value: { place_id: place.place_id } }, type);
  };

  useEffect(() => {
    if (source && destination) {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch(
        {
          location: { lat: source.lat, lng: source.lng },
          radius: 5000, // Search within 5km radius
          type: ["point_of_interest"], // You can adjust the type of places as needed
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Shuffle the results array to get random places
            const shuffledResults = shuffleArray(results);
            // Get the first 5 places
            const randomPlaces = shuffledResults.slice(0, 5);
            setNearbyPlaces(randomPlaces);
          }
        }
      );
    }
  }, [source, destination]);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
          onPlaceClick={handleNearbyPlaceClick}
        />
      )}
    </div>
  );
}

export default InputItem;
