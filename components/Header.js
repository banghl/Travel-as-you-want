"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import PastTripsModal from "./PastTripsModal";

function Header() {
  const [showPastTripsModal, setShowPastTripsModal] = useState(false);

  const togglePastTripsModal = () => {
    setShowPastTripsModal(!showPastTripsModal);
  };

  return (
    <div>
      <div className="p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" width={120} height={90} alt="logo" />
          {/* Slogan with enhanced visual styling */}
          <div className="ml-4 flex items-center">
            <p className="text-2xl text-indigo-600 font-bold italic tracking-wide">
              Travel Reimagined
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div
            className="flex gap-2 items-center mr-10 cursor-pointer"
            onClick={togglePastTripsModal}
          >
            <Image src="/history.png" width={25} height={25} alt="history" />
            <h2 className="text-[18px] font-medium">Past Trip</h2>
          </div>
          <UserButton />
        </div>
      </div>
      {showPastTripsModal && <PastTripsModal onClose={togglePastTripsModal} />}{" "}
      {/* Render modal if showPastTripsModal is true */}
    </div>
  );
}

export default Header;
