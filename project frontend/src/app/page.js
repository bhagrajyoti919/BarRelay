"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { cn } from "@/lib/utils";
import { WobbleCardDemo } from "@/components/WobbleCardDemo";

export const products = [
  {
    title: "Product 1",
    link: "",
    thumbnail: "/assets/image1.png",
  },
  {
    title: "Product 2",
    link: "",
    thumbnail: "/assets/image2.png",
  },
  {
    title: "Product 3",
    link: "",
    thumbnail: "/assets/image3.png",
  },

  {
    title: "Product 4",
    link: "",
    thumbnail: "/assets/image4.png",
  },
  {
    title: "Product 5",
    link: "",
    thumbnail: "/assets/image5.png",
  },
  {
    title: "Product 6",
    link: "",
    thumbnail: "/assets/image6.png",
  },

  {
    title: "Product 7",
    link: "",
    thumbnail: "/assets/image7.png",
  },
  {
    title: "Product 8",
    link: "",
    thumbnail: "/assets/image8.png",
  },
  {
    title: "Product 9",
    link: "",
    thumbnail: "/assets/image9.png",
  },
  {
    title: "Product 10",
    link: "",
    thumbnail: "/assets/image10.png",
  },
  {
    title: "Product 11",
    link: "",
    thumbnail: "/assets/image11.png",
  },

  {
    title: "Product 12",
    link: "",
    thumbnail: "/assets/image12.png",
  },
  {
    title: "Product 13",
    link: "",
    thumbnail: "/assets/image1.png",
  },
  {
    title: "Product 14",
    link: "",
    thumbnail: "/assets/image2.png",
  },
  {
    title: "Product 15",
    link: "",
    thumbnail: "/assets/image3.png",
  },
];

export default function BackgroundBoxesDemo() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col w-full">
      {/* First Page: Background Boxes (Text at Top Center) */}
      <div
        className="relative w-full bg-slate-900 flex flex-col items-center justify-start pt-8 pb-10 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        
        <div className="w-full relative z-20"> 
          <HeroParallax products={products} />
        </div>
      </div>

      {/* Second Page: Wobble Card Demo */}
      <div className="w-full bg-white flex flex-col items-center justify-center py-20">
        <WobbleCardDemo />
      </div>

      {/* Third Page: Black Background, White Text */}
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-5xl font-bold mb-4">Premium Selection</h2>
        <p className="text-xl text-gray-400 max-w-2xl text-center px-4">
          Choose from a wide range of top-quality beers, wines, and spirits.
          We curate the best for your enjoyment.
        </p>
      </div>
    </div>
    </div>
  );
}
