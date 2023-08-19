'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Vector from "../components/Vector";
import logoLP from "@/assets/images/logoLP.png"
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="bg-purpleT0 h-screen w-screen flex">
      <Image src={logoLP} layout="fill" objectFit="cover" objectPosition="center"/>
      <div className="absolute left-[45vw] bottom-24">
        <Vector vectorname={'arrowDownThin'}/>
      </div>
    </main>
  )
}
