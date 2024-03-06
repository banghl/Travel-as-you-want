import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = React.useState(null)
  const [directionRoutePoints, setDirectionRoutePoints] = useState ([]);

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
    if(source.length !=[] &&destination.length!=[]){
      directionRoute()
    }
  }, [destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: {lat:source.lat,lng:source.lng},
      destination: {lat: destination.lat, lng:destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    },(result, status) =>{
        if(status === google.maps.DirectionsService.OK){
          setDirectionRoutePoints(result)
        }
        else{
          console.error('Error');
        }
    })
  }

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
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
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
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions = {directionRoutePoints}
        options = {{
          polyline
          suppressMarkers:true

        }}
      />
    </GoogleMap>
  );
}

export default GoogleMapSection;
