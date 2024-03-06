import GoogleMapSection from '@/components/Home/GoogleMapSection'
import SearchSection from '@/components/Home/SearchSection'
import { SourceContext } from '@/context/SourceContext'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [source,setSource] = useState([])
  const [destination,setDestina]
  return (
    <SourceContext.Provider>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <SearchSection />
        </div>
        <div className="col-span-2">
          <GoogleMapSection />
        </div>
      </div>
    </SourceContext.Provider>
  )
}