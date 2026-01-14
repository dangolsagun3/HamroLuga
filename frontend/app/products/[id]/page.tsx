"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const ProductById = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${params.id}`
        );
        const cleanedData: Product = {
          id: res.data.id,
          title: res.data.title,
          price: res.data.price,
          images: res.data.images,
        };
        setProduct(cleanedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="p-4">
      {product ? (
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
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Product not found</p>
      )}
    </div>
  );
};

export default ProductById;
