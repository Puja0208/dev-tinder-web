import { useState } from "react";
import "./App.css";
import NavBar from "./NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold underline">Hello World</h1>
    </>
  );
}

export default App;
