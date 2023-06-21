import React from "react";
import "./App.scss";
import Navbar from "./pages/navbar/Navbar";
import Posts from "./pages/post-list/PostsList";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Posts />
    </div>
  );
}

export default App;
