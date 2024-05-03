
import React, { useState, useEffect } from "react";
import TransportListItem from "./TransportListItem";
import { TransportListData } from "./../../utils/TransportListData";
import { useRouter } from "next/navigation";

function TransportListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateEstimatedTime = (transport) => {
    if (transport.speed) {
      const arrivalTime = new Date(
        currentTime.getTime() + (distance / transport.speed) * 60 * 60 * 1000
      );

      const hours = arrivalTime.getHours();
      const minutes = arrivalTime.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      const formattedHours = hours % 12 || 12;
      const formattedMinutes = formatTime(minutes);

      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } else {
      return "N/A";
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="mt-5 p-5 animate-fade-in">
      <h2 className="text-[25px] font-bold text-indigo-500">
        Choose your ride
      </h2>
      {TransportListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 px-4 rounded-md round-md border-black ${
            activeIndex === index
              ? "border-[3px] border-indigo-500 shadow-md transform hover:scale-105 transition-transform duration-300"
              : "hover:shadow-sm transition duration-300"
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedTransport(item);
          }}
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

      {selectedTransport ? (
        <div className="flex justify-between fixed bottom-12 left-12 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center">
          <h2>Make Payment For</h2>
          <button
            className="bg-indigo-500 text-white p-3 rounded-lg text-center hover:bg-indigo-600"
            onClick={() =>
              router.push(
                `/payment?amount=${(
                  selectedTransport.amount * distance
                ).toFixed(2)}`
              )
            }
          >
            Request {selectedTransport.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TransportListOptions;