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
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        const cleanedData: Product[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          images: item.images,
        }));
        setProducts(cleanedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>
  }
  return (
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={item.images?.[0] || "/placeholder.png"}
                alt={item.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-2 truncate text-black">
                {item.title}
              </h3>
              <p className="text-lg font-bold mb-3 text-black">${item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    
  );
};
export default Home;
