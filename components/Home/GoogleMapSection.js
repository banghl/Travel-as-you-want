import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

function GoogleMapSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const containerStyle = {
    width: "100%",
    height: "90vh",
  };

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [trafficLayer, setTrafficLayer] = useState(null);

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
    if (map) {
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);
      setTrafficLayer(trafficLayer);
    }
  }, [map]);

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
    if (source.length !== 0 && destination.length !== 0) {
      directionRoute();
    }
  }, [source, destination, map]);

  useEffect(() => {
    if (destination?.length !== 0 && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }

    if (source.length !== 0 && destination.length !== 0) {
      directionRoute();
    }
  }, [destination, source, map]);

  const directionRoute = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error("Error");
        }
      }
    );
  };

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
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-blue-500 text-white font-bold inline-block">
              <p className="text-[16px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
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
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-blue-500 text-white font-bold inline-block">
              <p className="text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: "#4285f4",
            strokeWeight: 8,
            strokeOpacity: 0.8,
            geodesic: true,
          },
          suppressMarkers: true,
        }}
      />
      <Legend />
    </GoogleMap>
  );
}

const Legend = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }}
  >
    <div>
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: "#FF0000",
          marginRight: "5px",
        }}
      ></span>
      Heavy Traffic
    </div>
    <div>
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: "#FFFF00",
          marginRight: "5px",
        }}
      ></span>
      Moderate Traffic
    </div>
    <div>
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: "#00FF00",
          marginRight: "5px",
        }}
      ></span>
      Light Traffic
    </div>
  </div>
);

export default GoogleMapSection;
