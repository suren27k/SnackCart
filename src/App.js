import { Navigate, Route, Routes } from "react-router-dom";
import Error404 from "./components/Error/Error404";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import Login from "./components/Login";
import Products from "./components/Products/Products";
const App = () =>
{
  return (
    <div>
      <Header />
      <Subheader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/" element={<Products />}>
          <Route path="category/:category" element={<Products />} />
        </Route>
        <Route path="/404" element={<Error404 />} />
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;