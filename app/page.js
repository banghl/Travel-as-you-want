"use client"

import { LoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import GoogleMapSection from './../components/Home/GoogleMapSection';
import SearchSection from './../components/Home/SearchSection';
import { DestinationContext } from './../context/DestinationContext';
import { SourceContext } from './../context/SourceContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalApi from "./../utils/GlobalApi";
import {useUser} from '@clerk/nextjs';

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  const {user} = useUser()

  useEffect(()=>{
    user&&createUserProfile();
  },[user])

  const createUserProfile = () =>{
    const data = {
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      image:user.imageUrl
    }
    GlobalApi.createUser(data).then(resp=>{
        console.log(resp.data);
    })
  }
  
  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          libraries={['places']} 
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <SearchSection/>
              <ToastContainer />
            </div>
            <div className="col-span-2">
              <GoogleMapSection />
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
