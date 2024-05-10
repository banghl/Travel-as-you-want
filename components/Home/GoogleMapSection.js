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
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";

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
  const [distance, setDistance] = useState(null); // State to hold the distance

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

          // Calculate distance
          const distance = result.routes[0].legs[0].distance.text;
          setDistance(distance);
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

      // Set max and min zoom levels
      const maxZoomService = new window.google.maps.MaxZoomService();
      maxZoomService.getMaxZoomAtLatLng(map.getCenter(), (response) => {
        if (response.status === window.google.maps.MaxZoomStatus.OK) {
          // Calculate zoom level for 50km distance
          const maxZoomFor50km = calculateMaxZoomForDistance(response.zoom, 50);
          map.setOptions({
            maxZoom: maxZoomFor50km, // Limit max zoom to zoom level for 50km distance
            minZoom: 10, // Limit min zoom to 10
          });
        }
      });

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Function to calculate zoom level for a given distance
  const calculateMaxZoomForDistance = (currentZoom, distance) => {
    // Formula to calculate zoom level based on distance
    // Adjust the formula as needed for your specific use case
    const zoom = Math.floor(
      currentZoom - Math.log2(distance / 156543.03392) + 8
    );
    return Math.max(0, Math.min(21, zoom));
  };

  function calculateMidpoint(source, destination) {
    const lat = (source.lat + destination.lat) / 2;
    const lng = (source.lng + destination.lng) / 2;
    return { lat, lng };
  }

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

      {directionRoutePoints.length !== 0 && (
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
      )}
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
          backgroundColor: "#FFBF00",
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
          backgroundColor: "#7CFC00",
          marginRight: "5px",
        }}
      ></span>
      Light Traffic
    </div>
  </div>
);

export default GoogleMapSection;