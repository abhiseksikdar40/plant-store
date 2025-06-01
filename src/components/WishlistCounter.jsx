import { useStoreContext } from "../context/StoreContext"; // adjust path if needed

export default function WishlistCounter() {
  const { wishlist } = useStoreContext();

  // Don't show badge if wishlist is empty or undefined
  if (!wishlist || wishlist.length === 0) return null;

  return (
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      {wishlist.length}
    </span>
  );
}
