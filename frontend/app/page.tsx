"use client";
import { useState } from "react";
import Home from "./Home/page";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Home onCartUpdate={() => {}} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
