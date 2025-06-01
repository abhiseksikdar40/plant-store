import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStoreContext from "../context/StoreContext";

export default function Cart() {
  const {
    cart,
    cartDelete,
    updateCartItemQuantity,
    addToWishlist,
    clearCart,
  } = useStoreContext();

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart || []);
  }, [cart]);

  const safeNumber = (num) =>
    typeof num === "number" && !isNaN(num) ? num : 0;

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = safeNumber(item?.product?.productPrice);
    const quantity = safeNumber(item?.quantity);
    return sum + price * quantity;
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    const price = safeNumber(item?.product?.productPrice);
    const quantity = safeNumber(item?.quantity);
    const discount = safeNumber(item?.product?.productDiscount);
    return sum + price * quantity * (discount / 100);
  }, 0);

  const delivery = 5;
  const finalAmount = totalPrice - totalDiscount + delivery;

  // Updated handleCheckout - do NOT clear cart here!
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ backgroundColor: "#e6f1f1" }}>
      <div className="container py-3">
        <h2 className="text-center mb-4">My Cart</h2>
        <div className="d-flex justify-content-evenly flex-wrap">
          {/* Cart Items */}
          <div style={{ width: "60%" }}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const price = safeNumber(item?.product?.productPrice);
                const quantity = safeNumber(item?.quantity);
                const discount = safeNumber(item?.product?.productDiscount);
                const discountAmount = price * quantity * (discount / 100);

                return (
                  <div className="card mb-3" key={item._id}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item?.product?.productImg}
                          className="img-fluid rounded-start"
                          alt={item?.product?.productName || "Product"}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item?.product?.productName}</h5>
                          <p className="card-text">
                            <strong>Price:</strong> ${price.toFixed(2)} <br />
                            <strong>Rating:</strong> {item?.product?.productRating ?? "N/A"} <br />
                            <strong>Quantity:</strong>{" "}
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
                                readOnly
                                style={{ width: "40px", textAlign: "center" }}
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
                            <strong>Discount:</strong> -${discountAmount.toFixed(2)} <br />
                            <button
                              className="btn btn-danger mt-3"
                              style={{ borderRadius: 0, width: "255px" }}
                              onClick={() => cartDelete(item._id)}
                            >
                              Remove From Cart
                            </button>
                            <button
                              className="btn btn-outline-primary mt-2"
                              style={{ borderRadius: 0, width: "255px" }}
                              onClick={() => {
                                addToWishlist(item.product._id);
                                cartDelete(item._id);
                              }}
                            >
                              Move To Wishlist
                            </button>
                          </p>
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
            style={{ width: "30%", height: "fit-content", minWidth: "280px" }}
          >
            <h4>Price Details</h4>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Price ({cartItems.length} items)</h5>
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
              className="btn text-white mt-3 w-100"
              style={{ backgroundColor: "#19a448", border: "none" }}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
