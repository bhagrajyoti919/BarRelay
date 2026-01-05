"use client";
import React from "react";

export default function CartPage() {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="mb-4 text-center text-3xl font-bold">
        My Cart
      </h1>
      <p className="text-center text-gray-500">
        Your cart is currently empty.
      </p>
    </div>
  );
}
