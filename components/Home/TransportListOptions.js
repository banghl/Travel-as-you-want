import React, { useState, useEffect } from "react";
import TransportListItem from "./TransportListItem";
import { TransportListData } from "@/utils/TransportListData";

function TransportListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateEstimatedTime = (transport) => {
    if (transport.speed) {
      const arrivalTime = new Date(currentTime.getTime() + (distance / transport.speed) * 60 * 60 * 1000);

      const hours = arrivalTime.getHours();
      const minutes = arrivalTime.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';

      const formattedHours = hours % 12 || 12;
      const formattedMinutes = formatTime(minutes);

      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } else {
      // Handle the case when speed is not provided
      return "N/A";
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="mt-5 p-5 animate-fade-in">
      <h2 className="text-[22px] font-bold text-blue-500">Recommended</h2>
      {TransportListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 px-4 rounded-md round-md border-black ${
            activeIndex === index
              ? "border-[3px] border-indigo-500 shadow-md transform hover:scale-105 transition-transform duration-300"
              : "hover:shadow-sm transition duration-300"
          }`}
          onClick={() => setActiveIndex(index)}
          key={item.id}
        >
          <TransportListItem
            transport={item}
            distance={distance}
            estimatedTime={calculateEstimatedTime(item)}
            currentTime={currentTime}
          />
        </div>
      ))}
    </div>
  );
}

export default TransportListOptions;
