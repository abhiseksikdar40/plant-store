import { useStoreContext } from "../context/StoreContext";

export default function Wishlist() {
  const { wishlist, moveToCartFromWishlist, removeFromWishlist } = useStoreContext();

  return (
    <>
      <h4 className="text-center fw-bold my-3">My Wishlist</h4>
      <div className="container my-5" style={{ backgroundColor: "#f2f8f8", padding: "30px" }}>
        <div className="row justify-content-center">
          {wishlist.length === 0 ? (
            <p className="text-center">Your wishlist is empty.</p>
          ) : (
            wishlist.map((wish) => {
              const product = wish.product; // directly use product object here

              return (
                <div className="col-md-3 mb-4" key={wish._id}>
                  <div className="card" style={{ width: "255px", borderRadius: "0px" }}>
                    <div className="position-relative">
                      <button
                        style={{ background: "transparent", border: "none" }}
                        className="position-absolute top-0 end-0 p-2"
                        onClick={() => removeFromWishlist(wish._id)}
                        title="Remove from wishlist"
                      >
                        <img
                          src="/favorite-red.png"
                          alt="Remove"
                          style={{
                            height: "32px",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            padding: "4px",
                          }}
                        />
                      </button>

                      <img
                        src={product.productImg || "https://placehold.co/255x200?text=No+Image"}
                        className="card-img-top"
                        alt={product.productName || "Product Image"}
                        style={{ borderRadius: "0px", maxHeight: "250px"}}
                      />
                    </div>

                    <div className="card-body text-center">
                      <h5 className="card-title">{product.productName || "Unnamed Product"}</h5>
                      <p className="card-text">${product.productPrice ?? "N/A"}</p>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    <button
                      className="btn btn-primary"
                      style={{ borderRadius: "0px", width: "255px" }}
                      onClick={() => moveToCartFromWishlist(wish)}
                    >
                      Move To Cart
                    </button>

                    <button
                      className="btn btn-danger"
                      style={{ borderRadius: "0px", width: "255px" }}
                      onClick={() => removeFromWishlist(wish._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
