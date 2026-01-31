"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/">
            <Button className="bg-blue-600 text-black">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input className="w-full border px-3 py-2 rounded" placeholder="Full name" />
                <input className="w-full border px-3 py-2 rounded" placeholder="Address" />
                <input className="w-full border px-3 py-2 rounded" placeholder="City" />
                <div className="flex gap-2">
                  <input className="flex-1 border px-3 py-2 rounded" placeholder="Postal code" />
                  <input className="flex-1 border px-3 py-2 rounded" placeholder="Country" />
                </div>
                <Button className="bg-blue-600 text-black" type="submit">Continue to Payment</Button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((it: any) => (
                  <div key={it.id} className="flex items-center gap-4">
                    <img src={it.images?.[0] || '/placeholder.jpg'} alt={it.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-sm text-muted">{it.quantity} x ${it.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">Total <span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
