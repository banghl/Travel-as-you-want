"use client"
import React from "react";
import Image from "next/image";

function InputItem({ type }) {
    const [value, setValue] = useState(null);
  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <Image src={type === "source" ? "/source.png" : "/dest.png"} width={15} height={15} />
      {/* <input
        type="text"
        placeholder={type === "source" ? "Pickup Location" : "DroppOff Location"}
        className="bg-transparent w-full outline-none"
      /> */}
       <GooglePlacesAutocomplete
          
          selectProps = {{
            value,
            onchange: setValue,
          }}
       />
  </div>
    </div>
  );
}

export default InputItem;
