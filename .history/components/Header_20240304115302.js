import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const headerMenus = [
    {
      id: 1,
      name: "Ride",
      icon: "/taxi.png",
    },
  ];
  return (
    <div>
      <div className="p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex gap-24 items-center">
            <Image src="/logo.png" width={20} height={150} alt="logo" />
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
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
