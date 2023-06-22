import { useState } from "react";
import Navbar from "./pages/navbar/Navbar";
import Posts from "./pages/post-list/PostsList";
import "./App.scss";

function App() {
  const [sort, setSort] = useState<Boolean>(true);

  const setSortr = () => {
    setSort((prev) => !prev);
  };

  return (
    <div className="App">
      <Navbar sorted={setSortr} />
      <Posts sort={sort} />
    </div>
  );
}

export default App;
