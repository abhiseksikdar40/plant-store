import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(null);
export const useStoreContext = () => useContext(StoreContext);

// Fetch wrapper for products
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
  const [wishlist, setWishlist] = useState([]);
  const [cartError, setCartError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [wishlistError, setWishlistError] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const {
    data: products,
    loading: loadingProducts,
    error: productsError,
  } = useFetch("https://plant-store-backend-two.vercel.app/products");

  const fetchCart = async () => {
    setLoadingCart(true);
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data || []);
    } catch (error) {
      setCartError(error.message);
    } finally {
      setLoadingCart(false);
    }
  };

  const fetchAddresses = async () => {
    setAddressLoading(true);
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/address");
      if (!response.ok) throw new Error("Failed to fetch address");
      const addressData = await response.json();
      setAddress(addressData || []);
    } catch (error) {
      setAddressError(error.message);
    } finally {
      setAddressLoading(false);
    }
  };

  const fetchWishlist = async () => {
    setLoadingWishlist(true);
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/wishlist");
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const wishlistData = await response.json();
      setWishlist(wishlistData || []);
    } catch (error) {
      setWishlistError(error.message);
    } finally {
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
    fetchWishlist();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: product._id, quantity }),
      });

      if (!response.ok) throw new Error("Add to cart failed");
      await response.json();

      // ✅ FIX: Re-fetch cart so it includes full product info
      await fetchCart();
    } catch (error) {
      setCartError(error.message);
    }
  };

  const cartDelete = async (cartItemId) => {
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/cart/${cartItemId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete from cart failed");
      await fetchCart();
    } catch (error) {
      setCartError(error.message);
    }
  };

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
      await response.json();
      await fetchCart();
    } catch (error) {
      setCartError(error.message);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cart) {
        const response = await fetch(
          `https://plant-store-backend-two.vercel.app/cart/${item._id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete item from cart");
      }
      setCart([]); // Clear state after all deletes
    } catch (error) {
      setCartError(error.message);
    }
  };

  const setUserAddress = async (newAddress) => {
    setAddressLoading(true);
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress),
      });

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
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete address failed");
      await fetchAddresses();
    } catch (error) {
      setAddressError(error.message);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productId }),
      });

      if (!response.ok) throw new Error("Failed to add to wishlist");
      await fetchWishlist();
    } catch (error) {
      setWishlistError(error.message);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      const response = await fetch(
        `https://plant-store-backend-two.vercel.app/wishlist/${wishlistItemId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete wishlist item");
      await fetchWishlist();
    } catch (error) {
      setWishlistError(error.message);
    }
  };

  const moveToCartFromWishlist = async (wishlistItem) => {
    try {
      await addToCart(wishlistItem.product, 1);
      await removeFromWishlist(wishlistItem._id);
    } catch (error) {
      console.error("Failed to move item from wishlist to cart:", error.message);
    }
  };

  const buyNow = async ({ productId, quantity, addressId, totalAmount, orderDate }) => {
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: [{ product: productId, quantity }],
          addressId,
          totalAmount,
          orderDate,
        }),
      });

      if (!response.ok) throw new Error("Buy Now order failed");
      return await response.json();
    } catch (error) {
      console.error("Buy Now error:", error.message);
      throw error;
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
        clearCart,
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
        wishlist,
        loadingWishlist,
        wishlistError,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCartFromWishlist,
        buyNow,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default useStoreContext;
