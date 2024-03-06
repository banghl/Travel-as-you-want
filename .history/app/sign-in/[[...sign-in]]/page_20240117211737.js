import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image src="/Img/Background.jpg" className="object-contain h-full w-full" />
      <SignIn />
    </div>
  );
}
