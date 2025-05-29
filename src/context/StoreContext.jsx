import { createContext, useContext, useState, useEffect } from "react";

// Create context with default null
const StoreContext = createContext(null);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};

export default useStoreContext;

// Custom fetch hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]); // default empty array to avoid null issues
  const [loadingCart, setLoadingCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);

  // Fetch cart data on initial load
  useEffect(() => {
    const fetchCartData = async () => {
      setLoadingCart(true);
      try {
        const response = await fetch(
          "https://plant-store-backend-two.vercel.app/cart"
        );
        if (!response.ok) throw new Error("Failed to fetch cart");
        const cartData = await response.json();
        setCart(cartData);
      } catch (error) {
        setCartError(error.message);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCartData();
  }, []);

  // Fetch address data on initial load
  useEffect(() => {
    const fetchAddressData = async () => {
      setAddressLoading(true);
      try {
        const response = await fetch(
          "https://plant-store-backend-two.vercel.app/address"
        );
        if (!response.ok) throw new Error("Failed to fetch address");
        const addressData = await response.json();
        setAddress(addressData || []);
      } catch (error) {
        setAddressError(error.message);
        console.error("Address fetch failed:", error.message);
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddressData();
  }, []);

  // Fetch products list
  const {
    data: products,
    loading: loadingProducts,
    error: productsError,
  } = useFetch("https://plant-store-backend-two.vercel.app/products");

  // Add to Cart
  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await fetch(
        "https://plant-store-backend-two.vercel.app/cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: product._id, quantity }),
        }
      );

      if (!response.ok) throw new Error("Add to cart failed");
      const result = await response.json(); // cart item from backend

      // Add new cart item to local state
      setCart((prev) => {
        const exists = prev.find((item) => item._id === result._id);
        if (exists) {
          // If it somehow exists, update quantity
          return prev.map((item) =>
            item._id === result._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prev, result];
        }
      });

      console.log("Added to cart in backend:", result);
    } catch (error) {
      setCartError(error.message);
      console.error("add-to-cart failed:", error.message);
    }
  };

  // Delete from Cart
  const cartDelete = async (cartItemId) => {
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/cart/${cartItemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Delete from cart failed");

      // Only update state after successful backend deletion
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
      console.log("Deleted from backend:", cartItemId);
    } catch (error) {
      setCartError(error.message);
      console.error("cart-delete failed:", error.message);
    }
  };

  // Set User Address
  const setUserAddress = async (newAddress) => {
    setAddressLoading(true);
    try {
      const response = await fetch(
        "https://plant-store-backend-two.vercel.app/address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAddress),
        }
      );

      if (!response.ok) throw new Error("Address saving failed");
      const savedAddress = await response.json();

      setAddress((prev) => [...prev, savedAddress]);
      console.log("Address saved to backend:", savedAddress);
    } catch (error) {
      setAddressError(error.message);
      console.error("Address saving failed:", error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  // Update Address
  const updateAddress = async (updatedAddress) => {
    setAddressLoading(true);
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/address/update/${updatedAddress._id}`,
        {
          method: "POST", // or PUT/PATCH if your backend expects that
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAddress),
        }
      );

      if (!response.ok) throw new Error("Address update failed");

      const updated = await response.json();
      console.log("Address update response:", updated);

      if (updated && updated._id) {
        setAddress((prev) =>
          prev.map((addr) => (addr._id === updated._id ? updated : addr))
        );
      } else {
        setAddress((prev) =>
          prev.map((addr) =>
            addr._id === updatedAddress._id ? updatedAddress : addr
          )
        );
      }

      console.log("Address updated in backend:", updated || updatedAddress);
    } catch (error) {
      setAddressError(error.message);
      console.error("Address update failed:", error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  // Delete Address
  const deleteAddress = async (addressId) => {
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/address/delete/${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Delete address failed");

      setAddress((prev) => prev.filter((addr) => addr._id !== addressId));
      console.log("Address deleted from backend:", addressId);
    } catch (error) {
      setAddressError(error.message);
      console.error("address-delete failed:", error.message);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        loadingCart,
        cartDelete,
        address,
        setUserAddress,
        updateAddress,
        deleteAddress,
        products,
        loadingProducts,
        productsError,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
