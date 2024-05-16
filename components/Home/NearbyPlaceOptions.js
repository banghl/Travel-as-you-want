import React, { useContext, useEffect, useState } from "react";
import { DestinationContext } from "../../context/DestinationContext";

function NearbyPlaceOptions({ source }) {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedTripType, setSelectedTripType] = useState(""); 
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    if (source && selectedTripType) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.nearbySearch(
        {
          location: { lat: source.lat, lng: source.lng },
          radius: 5000,
          type: [selectedTripType],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const shuffledResults = shuffleArray(results);
            const randomPlaces = shuffledResults.slice(0, 12);
            setNearbyPlaces(randomPlaces);
          }
        }
      );
    }
  }, [source, selectedTripType]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSetDestination = (place) => {
    console.log("Selected place:", place);
    setDestination({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      label: place.formatted_address || place.name,
    });
  };

  const handleTripTypeChange = (event) => {
    setSelectedTripType(event.target.value);
  };

  return (
    <div>
      {source && (
        <div className="mt-8">
          <div className="relative mb-4">
            <select
              id="tripType"
              value={selectedTripType}
              onChange={handleTripTypeChange}
              className="block w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-3 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select trip type</option>
              <option value="restaurant">Restaurant</option>
              <option value="cafe">Coffee</option>
              <option value="grocery_or_supermarket">Groceries</option>
              <option value="lodging">Hotel</option>
              <option value="shopping_mall">Shopping</option>
              <option value="tourist_attraction">Attractions</option>
            </select>
            <div className="mt-2 ml-2 text-gray-500 text-sm">
              Select a trip type to see nearby options
            </div>
          </div>
          <div className="overflow-y-auto max-h-[600px] relative">
            <h2 className="text-[25px] font-bold text-indigo-500 mb-4">
              Suggested Trip
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {nearbyPlaces.map((place) => (
                <div
                  key={place.place_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105"
                  onClick={() => handleSetDestination(place)}
                >
                  {place.photos && place.photos[0] && (
                    <img
                      src={place.photos[0].getUrl()}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <p className="text-lg font-semibold">{place.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NearbyPlaceOptions;
