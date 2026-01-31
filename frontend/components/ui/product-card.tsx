"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { addItem, incrementQuantity, decrementQuantity } from "@/app/redux/slice/cartSlice";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description?: string;
};

export default function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart?: (p: Product) => void }) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.cart.items.find((i: any) => i.id === product.id)?.quantity || 0);

  return (
    <div className="card overflow-hidden group">
      <div className="relative w-full h-64 bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="ghost" className="rounded-full bg-white/90 shadow-sm text-black">
            <Heart size={16} />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-black line-clamp-2">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="text-sm text-muted mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
          </div>
          <div>
            {quantity === 0 ? (
              <Button className="bg-blue-600 text-black" size="sm" onClick={() => {
                dispatch(addItem({ id: product.id, title: product.title, price: product.price, images: product.images }));
                onAddToCart?.(product);
              }}>
                <ShoppingCart size={16} className="mr-2" /> Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => dispatch(decrementQuantity(product.id))} disabled={quantity === 0}>-</Button>
                <div className="px-3 py-1 border rounded text-black">{quantity}</div>
                <Button variant="outline" size="icon" onClick={() => dispatch(incrementQuantity(product.id))}>+</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
