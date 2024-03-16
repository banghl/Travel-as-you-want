import React, { useContext, useEffect, useState } from 'react';
import { DestinationContext } from '@/context/DestinationContext';

function NearbyPlaceOptions({ source }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    if (source) {
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
            const randomPlaces = shuffledResults.slice(0, 6);
            setNearbyPlaces(randomPlaces);
          }
        }
      );
    }
  }, [source]);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Set the clicked place as the destination
  const handleSetDestination = (place) => {
    setDestination({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      label: place.name,
    });
  };

  return (
    <>
      {source && (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nearbyPlaces.map((place) => (
            <div
              key={place.place_id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105"
              onClick={() => handleSetDestination(place)}
            >
              {/* Display place image if available */}
              {place.photos && place.photos[0] && (
                <img src={place.photos[0].getUrl()} alt={place.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                {/* Display place name */}
                <p className="text-lg font-semibold">{place.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default NearbyPlaceOptions;
