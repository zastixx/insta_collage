"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans text-white h-screen p-8">
      <div className="bg-[#2e2e2e] rounded-lg h-full p-8">
        <h1 className="font-bold text-4xl ">Hey there!</h1>
        <h2 className="py-4 font-medium">
          My name is Tarun and i&apos; am a software enigneer. Give me a coding
          task and i will try my best to solve them
        </h2>
        <button
          className="bg-blue-500 px-4 py-2 rounded-md"
          onClick={() => router.push("/access")}
        >
          <Image 
            src="/logo.png" 
            alt="request-access-logo"
            width={20}
            height={20}
          />
          <span>Request access</span>
        </button>
      </div>
    </div>
  );
}
