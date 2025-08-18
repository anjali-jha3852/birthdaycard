
import React, { useState } from "react";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Wishes from "./pages/Wishes";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {/* Navigation */}
      <nav className="flex justify-center space-x-6 p-4 bg-purple-200">
        <button onClick={() => setPage("home")} className="hover:text-purple-700 font-bold">
          Home
        </button>
        <button onClick={() => setPage("gallery")} className="hover:text-purple-700 font-bold">
          Gallery
        </button>
        <button onClick={() => setPage("wishes")} className="hover:text-purple-700 font-bold">
          Wishes
        </button>
      </nav>

      {/* Conditional rendering */}
      {page === "home" && <Home />}
      {page === "gallery" && <Gallery />}
      {page === "wishes" && <Wishes />}
    </div>
  );
}

export default App;
