"use client";
import { useState } from "react";
import NavigationMenuDemo from "@/component/ui/navigation-menu";
import Home from "./Home/page";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCartUpdate = (count: number) => {
    setCartCount(count);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <NavigationMenuDemo cartCount={cartCount} onSearch={handleSearch} />
      <Home onCartUpdate={handleCartUpdate} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
