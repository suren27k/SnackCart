import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import Products from "./components/Products/Products";

const App = () =>
{
  return (
    <div>
      <Header />
      <Subheader />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/404" element={<h1>Not Found!</h1>} />
        <Route path="/:category" element={<Products />} />

      </Routes>
    </div>
  );
}

export default App;