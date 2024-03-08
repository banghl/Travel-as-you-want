import React, { useState } from "react";
import TransportListItem from "./TransportListItem";
import { TransportListData } from "@/utils/TransportListData";

function TransportListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState();

  return (
    <div className="mt-5 p-5">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {TransportListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 px-4 round-md border-black ${
            activeIndex === index ? "border-[3px]" : null
          }`}
          onClick={() => setActiveIndex(index)}
          key={item.id}
        >
          <TransportListItem transport={item} distance={distance} />
        </div>
      ))}
    </div>
  );
}

export default TransportListOptions;
