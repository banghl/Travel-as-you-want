import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

function GoogleMapSection() {
  // Get source and destination context
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  // Set the initial center coordinates to a default value
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  // State to store the Google Map instance
  const [map, setMap] = React.useState(null);

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  // Fetch user's current location using geolocation API when the map is loaded
  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, [isLoaded]);

  // Callback function to handle map load
  const onLoad = React.useCallback(
    function callback(map) {
      // Create bounds with the center coordinates
      const bounds = new window.google.maps.LatLngBounds(center);

      // Fit the map within the bounds
      map.fitBounds(bounds);

      // Set the map instance to state
      setMap(map);
    },
    [center]
  );

  // Callback function to handle map unmount
  const onUnmount = React.useCallback(function callback(map) {
    // Set the map instance to null on unmount
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100vh",
      }}
      center={center}
      zoom={9}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "ef16554d13ba41a2" }}
    >
      {/* Display source marker if source coordinates are available */}
      {source && (
        <Marker
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: {
              width: 25,
              height: 25,
            },
          }}
        />
      )}

      {/* Display destination marker if destination coordinates are available */}
      {destination && (
        <Marker
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/dest.png",
            scaledSize: {
              width: 25,
              height: 25,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
