import React, { useContext } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "@/context/SourceContext";

function SearchSection() {  
  const {source,setSource} = useContext(SourceContext);
  const {destination, setDestination = useContext(D)}
  return (
    <div className="p-2 md:p-5 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">Get a ride</p>
      <InputItem type = "source"/>
      <InputItem type = "destination"/>

      <button className="p-3 bg-black w-full mt-5 text-white rounded-lg">Search</button>
    </div>
  );
}

export default SearchSection;
