import React, { useContext, useState } from 'react';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import InputItem from './InputItem';
import TransportListOptions from './TransportListOptions';
import NearbyPlaceOptions from './NearbyPlaceOptions';

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [distance, setDistance] = useState();
  const [searched, setSearched] = useState(false);

  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );

    setDistance(dist * 0.00621374);
    setSearched(true);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
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

      {searched && (
        <div className="mt-8">
          <div className="p-6 border-2 rounded-xl bg-blue-200">
            {currentPage === 1 && <NearbyPlaceOptions source={source} />}
            {currentPage === 2 && distance && <TransportListOptions distance={distance} />}
        
            <div className="flex justify-between mt-6">
              <button
                className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
                onClick={nextPage}
                disabled={currentPage === 2}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSection;
