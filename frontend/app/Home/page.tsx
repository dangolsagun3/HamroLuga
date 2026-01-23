"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart, Search, Star, Heart, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        onCartUpdate?.(parsedCart.length);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);
  useEffect(() => {
    setSearchTerm(searchQuery || "");
  }, [searchQuery]);

  const addToCart = (product: Product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    onCartUpdate?.(newCart.length);
    toast.success(`${product.title} added to cart!`);
  };

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
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

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm text-black">{category.name}</h3>
              </div>
            ))}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">HamroLuga</h3>
              <p className="text-gray-400">
                Your one-stop shop for all your needs. Quality products at affordable prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/products" className="hover:text-white">Products</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className="hover:text-white"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Contact Info</h4>
              <p className="text-gray-400">
                Email: info@hamroluga.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Commerce St, City, State
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HamroLuga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative w-full h-64 bg-gray-100 cursor-pointer overflow-hidden">
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-4">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Eye size={20} />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart size={20} />
                </Button>
              </div>
            )}
          </div>
        </Link>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="rounded-full w-8 h-8">
            <Heart size={16} />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-gray-500 ml-1">(4.5)</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer text-black">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="text-black text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
