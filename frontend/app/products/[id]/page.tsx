"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const ProductById = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );

        setProduct({
          id: res.data.id,
          title: res.data.title,
          price: res.data.price,
          images: res.data.images,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-96 bg-gray-100">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-black">
            {product.title}
          </h1>

          <p className="text-2xl font-bold mb-4 text-blue-600">
            ${product.price}
          </p>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
            onClick={() => {
              const savedCart = localStorage.getItem('cart');
              let cart = [];
              if (savedCart) {
                try {
                  cart = JSON.parse(savedCart);
                } catch (error) {
                  console.error('Error parsing cart:', error);
                }
              }
              cart.push(product);
              localStorage.setItem('cart', JSON.stringify(cart));
              toast.success(`${product.title} added to cart!`);
            }}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
