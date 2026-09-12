import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { DataContext } from "./DataContext";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// check token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem("token")));

  // check number of requests
  const pendingRequests = useRef(0);

  const beginLoading = useCallback(() => {
    pendingRequests.current += 1;
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    pendingRequests.current = Math.max(0, pendingRequests.current - 1);
    if (pendingRequests.current === 0) setLoading(false);
  }, []);

  const withLoading = useCallback(
    async (request) => {
      beginLoading();
      try {
        return await request();
      } finally {
        endLoading();
      }
    },
    [beginLoading, endLoading],
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      endLoading();
      return;
    }

    const loadAuth = async () => {
      beginLoading();
      try {
        const response = await api.get("/auth/me");
        setAuth(response.data.data);
      } catch (requestError) {
        setError(requestError);
        localStorage.removeItem("token");
      } finally {
        setAuthLoading(false);
        endLoading();
      }
    };

    loadAuth();
  }, [beginLoading, endLoading]);

  useEffect(() => {
    const getMenu = async () => {
      beginLoading();
      try {
        const response = await api.get("/menu");
        setProduct(response.data.data || []);
      } catch (requestError) {
        setError(requestError);
      } finally {
        endLoading();
      }
    };
    getMenu();
  }, [beginLoading, endLoading]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const saveSession = (session) => {
    localStorage.setItem("token", session.token);
    setAuth(session.user);
    setError(null);
  };

  const login = async (credentials) => {
    const response = await withLoading(() =>
      api.post("/auth/login", credentials),
    );
    saveSession(response.data.data);
    return response.data.data.user;
  };

  const register = async (credentials) => {
    const response = await withLoading(() =>
      api.post("/auth/register", credentials),
    );
    saveSession(response.data.data);
    return response.data.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    setOrders([]);
  };

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const placeOrder = async (customer) => {
    const response = await withLoading(() =>
      api.post("/orders", {
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
        customer,
      }),
    );
    setCart([]);
    setOrders((currentOrders) => [response.data.data, ...currentOrders]);
    return response.data.data;
  };

  const createMenuItem = async (item) => {
    const response = await withLoading(() => api.post("/menu", item));
    setProduct((currentProducts) => [...currentProducts, response.data.data]);
    return response.data.data;
  };

  const updateMenuItem = async (itemId, item) => {
    const response = await withLoading(() => api.put(`/menu/${itemId}`, item));
    setProduct((currentProducts) =>
      currentProducts.map((productItem) =>
        productItem.id === itemId ? response.data.data : productItem,
      ),
    );
    return response.data.data;
  };

  const deleteMenuItem = async (itemId) => {
    await withLoading(() => api.delete(`/menu/${itemId}`));
    setProduct((currentProducts) =>
      currentProducts.filter((productItem) => productItem.id !== itemId),
    );
  };

  const loadOrders = useCallback(async () => {
    const endpoint = auth?.role === "admin" ? "/orders" : "/orders/my";
    const response = await withLoading(() => api.get(endpoint));
    setOrders(response.data.data || []);
    return response.data.data || [];
  }, [auth, withLoading]);

  const updateOrderStatus = async (orderId, status) => {
    const response = await withLoading(() =>
      api.patch(`/orders/${orderId}/status`, { status }),
    );
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? response.data.data : order,
      ),
    );
  };

  return (
    <DataContext.Provider
      value={{
        product,
        setProduct,
        orders,
        cart,
        auth,
        setAuth,
        error,
        loading,
        authLoading,
        isAuthenticated: Boolean(auth),
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        placeOrder,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
        loadOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
