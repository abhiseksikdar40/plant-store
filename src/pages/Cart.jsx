import useStoreContext from "../context/StoreContext";

export default function Cart() {
  const { cart, cartDelete, updateCartItemQuantity } = useStoreContext();

  
  const safeNumber = (num) => (typeof num === "number" && !isNaN(num) ? num : 0);


  const totalPrice = cart.reduce((sum, item) => {
    const price = safeNumber(item.product?.productPrice);
    const quantity = safeNumber(item.quantity);
    return sum + price * quantity;
  }, 0);


  const totalDiscount = cart.reduce((sum, item) => {
    const price = safeNumber(item.product?.productPrice);
    const quantity = safeNumber(item.quantity);
    const discountPercent = safeNumber(item.product?.productDiscount);
    return sum + price * quantity * (discountPercent / 100);
  }, 0);

  // Fixed delivery charges
  const delivery = 5;

  const finalAmount = totalPrice - totalDiscount + delivery;

  return (
    <div style={{ backgroundColor: "#e6f1f1" }}>
      <div className="container py-3">
        <h2 className="text-center mb-4">My Cart</h2>
        <div className="d-flex justify-content-evenly">
          {/* Cart Items */}
          <div style={{ width: "60%" }}>
            {cart && cart.length > 0 ? (
              cart.map((item) => {
                const price = safeNumber(item.product?.productPrice);
                const quantity = safeNumber(item.quantity);
                const discountPercent = safeNumber(item.product?.productDiscount);
                const discountAmount = price * quantity * (discountPercent / 100);
                return (
                  <div className="card mb-3" key={item._id}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.product?.productImg}
                          className="img-fluid rounded-start"
                          alt={item.product?.productName}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.product?.productName}</h5>
                          <div className="card-text">
                            <span className="fw-bold">Price:</span>{" "}
                            <span>${price.toFixed(2)}</span>
                            <p>Rating: {item.product?.productRating ?? "N/A"}</p>
                            <span className="fw-bold">Quantity:</span>{" "}
                            <span className="mx-2">
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(item._id, Math.max(1, quantity - 1))
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                style={{ width: "40px", textAlign: "center" }}
                                readOnly
                              />
                              <button
                                onClick={() =>
                                  updateCartItemQuantity(item._id, quantity + 1)
                                }
                              >
                                +
                              </button>
                            </span>
                            <br />
                            <span className="fw-bold">Discount:</span>{" "}
                            <span>-${discountAmount.toFixed(2)}</span>
                            <br />
                            <button
                              className="btn btn-danger mt-3"
                              style={{ borderRadius: "0px", width: "255px" }}
                              onClick={() => cartDelete(item._id)}
                            >
                              Remove From Cart
                            </button>
                            <button
                              className="btn btn-outline-primary mt-2"
                              style={{ borderRadius: "0px", width: "255px" }}
                            >
                              Move To Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h5 className="text-center">🛒 Cart is Empty! Please Add Products</h5>
            )}
          </div>

          {/* Cart Summary */}
          <div
            className="card p-3"
            style={{ width: "30%", height: "fit-content" }}
          >
            <h4>Price Details</h4>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Price ({cart.length} items)</h5>
              <h5>${totalPrice.toFixed(2)}</h5>
            </div>
            <div className="d-flex justify-content-between text-success">
              <h5>Discount</h5>
              <h5>-${totalDiscount.toFixed(2)}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Delivery Charges</h5>
              <h5>${delivery.toFixed(2)}</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h4>Total Amount</h4>
              <h4>${finalAmount.toFixed(2)}</h4>
            </div>
            <button
              style={{ backgroundColor: "#19a448", border: "none" }}
              className="btn text-white mt-3 w-100"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
