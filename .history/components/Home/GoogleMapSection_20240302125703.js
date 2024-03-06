import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  use
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
