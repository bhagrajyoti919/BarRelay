"use client";
import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

export default function SecondPage() {
  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            image: "/assets/beer.png",
            title: "Beer",
            width: "md:col-span-1",
            height: "h-60",
            link: "/beer",
          },
          {
            id: 2,
            image: "/assets/wine.png",
            title: "Wine",
            width: "md:col-span-2",
            height: "h-60",
          },
          {
            id: 3,
            image: "/assets/cider.png",
            title: "Cider",
            width: "md:col-span-1",
            height: "h-60",
          },
          {
            id: 4,
            image: "/assets/whiskey.png",
            title: "Whiskey",
            width: "md:col-span-3",
            height: "h-60",
          },
          {
            id: 5,
            image: "/assets/rum.png",
            title: "Rum",
            width: "md:col-span-1",
            height: "h-60",
          },
          {
            id: 6,
            image: "/assets/vodka.png",
            title: "Vodka",
            width: "md:col-span-2",
            height: "h-60",
            link: "/vodka",
          },
          {
            id: 7,
            image: "/assets/gin.png",
            title: "Gin",
            width: "md:col-span-2",
            height: "h-60",
          },
          {
            id: 8,
            image: "/assets/tequila.png",
            title: "Tequila",
            width: "md:col-span-1",
            height: "h-60",
          },
          {
            id: 9,
            image: "/assets/brandy.png",
            title: "Brandy",
            width: "md:col-span-2",
            height: "h-60",
          },
          {
            id: 10,
            image: "/assets/sake.png",
            title: "Sake",
            width: "md:col-span-1",
            height: "h-60",
          },
        ].map((box) => (
          <Link
            key={box.id}
            href={box.link || "#"}
            className={`${box.width} h-full block`}
            prefetch={false}
          >
            <FollowerPointerCard
              title={
                <TitleComponent title={box.title} avatar={box.image} />
              }
              className="h-full"
            >
              <CardContainer containerClassName={`w-full h-full py-0`} className="w-full h-full">
                <CardBody className={`bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full ${box.height} rounded-xl p-0 border overflow-hidden`}>
                  <CardItem translateZ="50" className="w-full h-full">
                    <img
                      src={box.image}
                      alt={`Product ${box.id}`}
                      className="w-full h-full object-cover group-hover/card:shadow-xl"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </FollowerPointerCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

const TitleComponent = ({
  title,
  avatar
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white" />
    <p>{title}</p>
  </div>
);
