"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addItem, incrementQuantity, decrementQuantity } from "../redux/slice/cartSlice";
import ProductCard from "@/components/ui/product-card"; 

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description?: string;
  category?: string;
};

type Category = {
  id: number;
  name: string;
  image: string;
};

const Home = ({ onCartUpdate, searchQuery }: {
  onCartUpdate?: (count: number) => void;
  searchQuery?: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("https://api.escuelajs.co/api/v1/products"),
          axios.get("https://api.escuelajs.co/api/v1/categories")
        ]);

        const cleanedProducts: Product[] = productsRes.data.slice(0, 20).map((item: {
          id: number;
          title: string;
          price: number;
          images: string[];
          description?: string;
          category?: { name: string };
        }) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          images: item.images,
          description: item.description,
          category: item.category?.name,
        }));

        const cleanedCategories: Category[] = categoriesRes.data.slice(0, 6).map((item: {
          id: number;
          name: string;
          image: string;
        }) => ({
          id: item.id,
          name: item.name,
          image: item.image,
        }));

        setProducts(cleanedProducts);
        setCategories(cleanedCategories);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSearchTerm(searchQuery || "");
  }, [searchQuery]);

  // Dispatch addItem to Redux cart
  const addToCart = (product: Product) => {
    dispatch(addItem({ id: product.id, title: product.title, price: product.price, images: product.images }));
    toast.success(`${product.title} added to cart!`);
  };

  // Update parent with total items whenever cart changes
  useEffect(() => {
    onCartUpdate?.(cart.length);
  }, [cart.length]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
  );

  const featuredProducts = products.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to HamroLuga</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop the latest trends and find everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto items-center">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Search size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-black">Featured Products</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-black">
            {selectedCategory ? `${selectedCategory} Products` : "All Products"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};



export default Home;
