import React, { useContext, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  useEffect(() => {
    if (source && source.length !== 0 && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng
      });
    }
  }, [source]);
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'ef16554d13ba41a2'}}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  )
}

export default GoogleMapSection
