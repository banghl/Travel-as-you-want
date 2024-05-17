import React from "react";

function PastTripsModal({ onClose }) {
  // Retrieve trip data from session storage
  const tripData = JSON.parse(sessionStorage.getItem("tripData")) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-75 overflow-auto">
      <div className="bg-white rounded-lg p-6 shadow-lg mt-10 mr-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-600">Past Trips</h2>
          <button onClick={onClose} className="text-black-700 hover:text-black focus:outline-none">
            Close
          </button>
        </div>
        <ul>
          {tripData.map((trip, index) => (
            <li key={index} className="border-b border-gray-300 py-2 flex items-center">
              <img src={trip.vehicleOption.image} alt={trip.vehicleOption.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <p className="font-medium text-black">{trip.vehicleOption.name}</p>
                <p className="text-gray-800">Destination: {trip.destination.label}</p>
                <p className="text-gray-800">Date: {trip.date}</p>
                <p className="text-gray-800">Time: {trip.time}</p>
                <p className="text-gray-800">Total Amount: ${trip.totalAmount}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PastTripsModal;
