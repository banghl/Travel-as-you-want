"use client"
import React, { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { IoIosNotifications } from "react-icons/io";

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const headerMenus = [
    {
      id: 1,
      name: "Ride",
      icon: "/taxi.png",
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <div className="p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex gap-24 items-center">
            <Image src="/logo.png" width={100} height={80} alt="logo" />
            <div className="flex gap-6 items-center">
              {headerMenus.map((item) => (
                <div className="flex gap-2 items-center" key={item.id}>
                  <Image src={item.icon} width={25} height={25} />
                  <h2 className="text-[18px] font-medium">{item.name}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {/* Notification Icon and UserButton */}
          <IoIosNotifications size="25" className="mr-10" onClick={toggleNotifications} />
          <UserButton />
          {showNotifications && (
            <div className="absolute right-0 mt-4 bg-white shadow-lg rounded-lg w-60">
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
