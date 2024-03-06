import { SignIn } from "@clerk/nextjs";
import Image from "next/image"; // Correct import

export default function Page() {
  return (
    <div>
      <Image src="/Background.jpg" width={900} height={1000} className="object-contain h-full w-full" />
      <SignIn />
    </div>
  );
}
