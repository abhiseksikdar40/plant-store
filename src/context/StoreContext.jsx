import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

const useStoreContext = () => useContext(StoreContext);

export default useStoreContext;

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Fetch hook
  function useFetch(url) {
    const [data, setData] = useState();
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
  }

  
  const addToCart = async (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    try {
      const response = await fetch("https://plant-store-backend-two.vercel.app/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: product._id, quantity: 1 }),
      });

      const result = await response.json();
      if (!response.ok) throw Error;
      console.log("Added to cart in backend:", result);
    } catch (error) {
      console.error("add-to-cart failed:", error.message);
    }
  };


  return (
    <StoreContext.Provider value={{ useFetch, cart, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
}
