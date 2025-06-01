import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext(null);

export const useStoreContext = () => useContext(StoreContext)

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

  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  const {
    data: products,
    loading: loadingProducts,
    error: productsError,
  } = useFetch("https://plant-store-backend-two.vercel.app/products");

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

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoadingCart(true);
      try {
        const response = await fetch("https://plant-store-backend-two.vercel.app/cart");
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

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: product._id, quantity }),
      });

      if (!response.ok) throw new Error("Add to cart failed");
      const result = await response.json();
      setCart((prev) => [...prev, result]);
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
      setCart((prev) => prev.filter((item) => item._id !== cartItemId));
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

  // Sequentially clear the cart
  const clearCart = async () => {
    try {
      for (const item of cart) {
        const response = await fetch(
          `https://plant-store-backend-two.vercel.app/cart/${item._id}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete item from cart");
      }
      setCart([]); // Clear local state after all deletes
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
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productId }),
      });

      if (!response.ok) throw new Error("Failed to add to wishlist");
      const newItem = await response.json();
      setWishlist((prev) => [...prev, newItem]);
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
      setWishlist((prev) => prev.filter((item) => item._id !== wishlistItemId));
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

  // NEW buyNow function for placing an immediate order for a product
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

      if (!response.ok) {
        throw new Error("Buy Now order failed");
      }

      const result = await response.json();
      return result; // return order confirmation or order data
    } catch (error) {
      console.error("Buy Now error:", error.message);
      throw error; // let caller handle the error
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
        buyNow, // Export buyNow here
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default useStoreContext;
