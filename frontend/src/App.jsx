import { Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/Orders.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import Loading from "./pages/Loading.jsx";
import { DataContext } from "./Hooks/DataContext";

const PublicLayout = () => (
  <PublicLayoutContent />
);

const PublicLayoutContent = () => {
  const location = useLocation();
  const { loading, authLoading } = useContext(DataContext);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (authLoading) return <Loading />;

  return (
  <div className="relative">
    {!isAuthPage && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    {loading && <Loading overlay />}
  </div>
  );
};

const App = () => (
  <Routes>
    <Route path="*" element={<PublicLayout />} />
  </Routes>
);

export default App;
