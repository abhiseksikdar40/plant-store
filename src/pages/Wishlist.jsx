import  useStoreContext  from "../context/StoreContext";

export default function Wishlist() {
  const { wishlist, moveToCartFromWishlist, removeFromWishlist } = useStoreContext();

  return (
    <>
      <h4 className="text-center fw-bold my-3">My Wishlist</h4>
      <div
        className="container my-5"
        style={{ backgroundColor: "#f2f8f8", padding: "30px" }}
      >
        <div className="row">
          {wishlist.length === 0 ? (
            <p className="text-center">Your wishlist is empty.</p>
          ) : (
            wishlist.map((wishlistItem) => (
              <div className="col-md-3 mb-4" key={wishlistItem._id}>
                <div className="card" style={{ width: "255px", borderRadius: "0px" }}>
                  <div className="position-relative">
                    <button
                      style={{ background: "transparent", border: "none" }}
                      className="position-absolute top-0 end-0 p-2"
                      onClick={() => removeFromWishlist(wishlistItem._id)}
                    >
                      <img
                        style={{
                          height: "32px",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "17px",
                          padding: "5px 4px 2px 4px",
                        }}
                        src="/favorite-red.png"
                        alt="Remove from wishlist"
                      />
                    </button>
                    <img
                      style={{ borderRadius: "0px" }}
                      src={
                        wishlistItem.product.image ||
                        "https://placehold.co/255x200?text=No+Image"
                      }
                      className="card-img-top"
                      alt={wishlistItem.product.name || "Product"}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{wishlistItem.product.name || "Unnamed Product"}</h5>
                    <p className="card-text">{"$" + (wishlistItem.product.price ?? "N/A")}</p>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ borderRadius: "0px", width: "255px" }}
                  onClick={() => moveToCartFromWishlist(wishlistItem)}
                >
                  Move To Cart
                </button>
                <button
                  className="btn btn-danger mt-2"
                  style={{ borderRadius: "0px", width: "255px" }}
                  onClick={() => removeFromWishlist(wishlistItem._id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
