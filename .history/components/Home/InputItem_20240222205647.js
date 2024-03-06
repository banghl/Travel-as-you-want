import React from "react";
import Image from "next/image";

function InputItem({ type }) {
  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image src={type === "source" ? "/source.png" : "/dest.png"} width={15} height={15} />
      {/* <input
        type="text"
        placeholder={type === "source" ? "Pickup Location" : "DroppOff Location"}
        className="bg-transparent w-full outline-none"
      /> */}
       <GooglePlacesAutocomplete
      apiKey="****"
    />
  </div>
    </div>
  );
}

export default InputItem;
