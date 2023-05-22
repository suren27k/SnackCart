import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { checkIfLoggedIn } from "./action/auth";
import Error404 from "./components/Error/Error404";
import Header from "./components/Layout/Header";
import Login from "./components/Login";
import Products from "./components/Products/Products";
import Profile from "./components/UserProfiles/Profile";


const App = () =>
{
  const dispatcher = useDispatch();
  const authState = useSelector(state => state.auth);

  useEffect(() =>
  {
    dispatcher(checkIfLoggedIn(() => { }))
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        {
          !authState.idToken &&
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
          </>
        }

        <Route path="/" element={<Products />}>
          <Route path="category/:category" element={<Products />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/404" element={<Error404 />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;