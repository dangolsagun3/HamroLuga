"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addItem, incrementQuantity, decrementQuantity } from "../../redux/slice/cartSlice"; 
import ProductCard from "@/components/ui/product-card";

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
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-96 bg-gray-100">
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-2 text-black">{product.title}</h1>

          <p className="text-3xl font-extrabold mb-4 text-[var(--primary)]">${product.price}</p>

          <ProductPageQuantityControls product={product} />

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Product details</h4>
            <p className="text-sm text-muted">{product.description || 'No description available.'}</p>
          </div>
        </div>

        <div className="lg:col-span-3 mt-8">
          <h3 className="text-xl font-semibold mb-4">You might also like</h3>
          <SuggestedProducts currentId={product.id} />
        </div>
      </div>
    </div>
  );
};

const SuggestedProducts = ({ currentId }: { currentId: number }) => {
  const [items, setItems] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/products');
        const suggested = res.data.filter((p: any) => p.id !== currentId).slice(0, 4).map((p: any) => ({ id: p.id, title: p.title, price: p.price, images: p.images, description: p.description }));
        setItems(suggested);
      } catch (error) {
        console.error('Failed to load suggested products', error);
      }
    };
    fetchSuggested();
  }, [currentId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((p) => (
        <div key={p.id}>
          <ProductCard product={p} onAddToCart={() => {}} />
        </div>
      ))}
    </div>
  );
};

const ProductPageQuantityControls = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.cart.items.find((i: any) => i.id === product.id)?.quantity || 0);

  if (quantity === 0) {
    return (
      <button
        className="w-full bg-blue-600 text-black py-3 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
        onClick={() => {
          dispatch(addItem({ id: product.id, title: product.title, price: product.price, images: product.images }));
          toast.success(`${product.title} added to cart!`);
        }}
      >
        <ShoppingCart size={20} />
        Add to Cart
      </button>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-2 bg-gray-200 rounded"
        onClick={() => dispatch(decrementQuantity(product.id))}
        disabled={quantity === 0}
      >-
      </button>
      <div className="px-3 py-2 border rounded">{quantity}</div>
      <button
        className="px-3 py-2 bg-gray-200 rounded"
        onClick={() => dispatch(incrementQuantity(product.id))}
      >+
      </button>
    </div>
  )
}

export default ProductById;
