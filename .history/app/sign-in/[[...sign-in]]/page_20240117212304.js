import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image
        src="/background.jpg"
        width={900}
        height={1000}
        className="object-contain h-full w-full"
      />
      <div>
        
      </div>
      <SignIn />
    </div>
  );
}