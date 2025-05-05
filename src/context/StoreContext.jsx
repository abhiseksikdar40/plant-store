import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const StoreContext = createContext();

const useStoreContext = () => useContext(StoreContext);

export default useStoreContext;

// Custom fetch hook
const useFetch = (url) => {
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
  const [address, setAddress] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);

  // Fetch cart data on initial load
  useEffect(() => {
    const fetchCartData = async () => {
      setLoadingCart(true);
      try {
        const response = await fetch("https://plant-store-backend-two.vercel.app/cart");
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

  // Add to Cart
  const addToCart = async (product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });

    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: product._id, quantity }),
      });

      const result = await response.json();
      if (!response.ok) throw "Add to cart failed";
      console.log("Added to cart in backend:", result);
    } catch (error) {
      setCartError(error.message);
      console.error("add-to-cart failed:", error.message);
    }
  };

  // Delete from Cart
  const cartDelete = async (cartItemId) => {
    setCart((prev) => prev.filter((item) => item._id !== cartItemId));

    try {
      const response = await fetch(`https://plant-store-backend-two.vercel.app/cart/${cartItemId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw "Delete from cart failed";
      console.log("Deleted from backend:", result);
    } catch (error) {
      setCartError(error.message);
      console.error("cart-delete failed:", error.message);
    }
  };

  // Set User Address
  const setUserAddress = async (newAddress) => {
    setAddressLoading(true);
    setAddress(newAddress);
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) throw "Address saving failed";
      console.log("Address saved to backend:", newAddress);
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
    setAddress(updatedAddress);
    try {
      const response = await fetch(`https://plant-store-backend-two.vercel.app/address/update/${addressid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAddress),
      });

      if (!response.ok) throw "Address update failed";
      console.log("Address updated in backend:", updatedAddress);
    } catch (error) {
      setAddressError(error.message);
      console.error("Address update failed:", error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  // Delete Address
  const deleteAddress = async (addressId) => {
    setAddress((prev) => (prev && prev._id === addressId ? null : prev));

    try {
      const response = await fetch(`https://plant-store-backend-two.vercel.app/address//delete/${addressId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw "Delete address failed";

      console.log("Address deleted from backend:", addressId);
    } catch (error) {
      setAddressError(error.message);
      console.error("address-delete failed:", error.message);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        useFetch,
        cart,
        addToCart,
        cartDelete,
        address,
        addressLoading,
        addressError,
        setUserAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
