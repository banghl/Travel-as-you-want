import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, MarkerF, OverlayViewF, useJsApiLoader } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  // Set the initial center to a default value
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  useEffect(() => {
    if (navigator.geolocation) {
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
  }, []);

  useEffect(() => {
    if (source?.length !== 0 && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length !== 0 && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
  }, [destination]);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "ef16554d13ba41a2" }}
    >
      {source.length !== 0 ? (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: {
              width: 25,
              height: 30,
            },
          }}
        >
          <OverlayViewF
            position={{lat: destination}}
          >

          </OverlayViewF>
      ) : null}
      {destination.length !== 0 ? (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/dest.png",
            scaledSize: {
              width: 30,
              height: 30,
            },
          }}
        />
      ) : null}
    </GoogleMap>
  );
}

export default GoogleMapSection;
