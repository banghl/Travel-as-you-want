import { SignIn } from "@clerk/nextjs";
import Image from "next/Img";

export default function Page() {
  return (
    <div>
      <Image src = '/Background.jpg' width = {900} height = {1000} />
      <SignIn />
    </div>
  );
}
