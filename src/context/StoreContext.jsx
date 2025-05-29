import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(null);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};

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
  const [address, setAddress] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [cartError, setCartError] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);

  // Fetch products list
  const {
    data: products,
    loading: loadingProducts,
    error: productsError,
  } = useFetch("https://plant-store-backend-two.vercel.app/products");

  // Fetch addresses
  const fetchAddresses = async () => {
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

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Fetch cart data on mount
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
      const result = await response.json();

      setCart((prev) => [...prev, result]);
    } catch (error) {
      setCartError(error.message);
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
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (error) {
      setCartError(error.message);
    }
  };

  // Update Cart Item Quantity
  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/cart/update/${cartItemId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) throw new Error("Update cart quantity failed");

      const updatedItem = await response.json();

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === cartItemId ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (error) {
      setCartError(error.message);
    }
  };

  // Address APIs (setUserAddress, updateAddress, deleteAddress)

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
      await response.json();
      await fetchAddresses();
    } catch (error) {
      setAddressError(error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  const updateAddress = async (updatedAddress) => {
    setAddressLoading(true);
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/address/update/${updatedAddress._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAddress),
        }
      );

      if (!response.ok) throw new Error("Address update failed");
      await response.json();
      await fetchAddresses();
    } catch (error) {
      setAddressError(error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/address/delete/${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Delete address failed");
      await fetchAddresses();
    } catch (error) {
      setAddressError(error.message);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        loadingCart,
        cartDelete,
        updateCartItemQuantity,
        address,
        setUserAddress,
        updateAddress,
        deleteAddress,
        products,
        loadingProducts,
        productsError,
        fetchAddresses,
        addressLoading,
        addressError,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default useStoreContext;
