import React, { useContext, useState } from "react";
import InputItem from "./InputItem";
import TransportListOptions from "./TransportListOptions";
import NearbyPlaceOptions from "./NearbyPlaceOptions";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(true);
  const [showTransportOptions, setShowTransportOptions] = useState(false);

  const calculateDistance = () => {
    if (!destination) {
      toast.error('Please enter a destination first.');
      return;
    }
    
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );
    const distanceInKm = dist * 0.001;
    if (distanceInKm <= 50) {
      setDistance(distanceInKm);
      setShowNearbyPlaces(false);
      setShowTransportOptions(true);
    } else {
      toast.error('The destination extends beyond the Illawarra Region. Please select a closer destination.');
    }
  };

  const handleGoBack = () => {
    setShowNearbyPlaces(true);
    setShowTransportOptions(false);
  };

  return (
    <div>
      <div className="p-6 border-2 rounded-xl bg-blue-200">
        <p className="text-2xl font-bold text-indigo-700 mb-4">Get a Ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="p-4 bg-indigo-600 w-full mt-5 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {source && showNearbyPlaces && <NearbyPlaceOptions source={source} setDestination={setDestination} />}
      {showTransportOptions && distance && (
        <div>
          <TransportListOptions distance={distance} destination={destination} />
          <button
            className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 mt-4"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchSection;
