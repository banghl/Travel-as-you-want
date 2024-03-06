import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image src="Img/background.jpg" width={900} height={1000} className="object-contain h-full w-full" />
      <SignIn />
    </div>
  );
}
