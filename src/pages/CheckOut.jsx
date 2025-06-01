import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStoreContext from "../context/StoreContext";

export default function CheckOut() {
  const { cart, clearCart, address } = useStoreContext();

  const location = useLocation();
  const buyNowProduct = location.state?.product || null;

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Set order items depending on cart or buy now product
    if (buyNowProduct) {
      setOrderItems([{ product: buyNowProduct, quantity: 1 }]);
    } else {
      setOrderItems(cart);
    }
  }, [buyNowProduct, cart]);

  const totalAmount = orderItems.reduce(
    (sum, item) =>
      sum + (item.product?.productPrice || 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      alert("Please select an address before checking out.");
      return;
    }

    setLoading(true);
    setError(null);

    const orderPayload = {
      cartItems: orderItems.map((item) => ({
        product: item.product?._id,
        quantity: item.quantity,
      })),
      addressId: selectedAddressId,
      totalAmount,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://plant-store-backend-two.vercel.app/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      setOrderPlaced(true);
      setSelectedAddressId("");

      // Clear cart only if NOT Buy Now flow
      if (!buyNowProduct) {
        await clearCart(); // Assuming this clears cart both backend and frontend context
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="text-center my-5">
        <h3>✅ Order Placed Successfully!</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4">Checkout</h3>

      {/* Address Selection */}
      <div className="mb-4">
        <h5>Select Shipping Address</h5>
        {address.length === 0 && (
          <p className="text-danger">No addresses available. Please add one.</p>
        )}
        {address.map((addr) => (
          <div key={addr._id} className="form-check">
            <input
              type="radio"
              id={`addr-${addr._id}`}
              name="shippingAddress"
              value={addr._id}
              checked={selectedAddressId === addr._id}
              onChange={() => setSelectedAddressId(addr._id)}
              className="form-check-input"
            />
            <label htmlFor={`addr-${addr._id}`} className="form-check-label">
              {addr.fullName}, {addr.houseNumber}, {addr.streetName},{" "}
              {addr.cityName}, {addr.pinCode}
            </label>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mb-4">
        <h5>Order Summary</h5>
        {orderItems.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {orderItems.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.product?.productName} × {item.quantity}
                </div>
                <div>
                  ₹
                  {(
                    (item.product?.productPrice || 0) * item.quantity
                  ).toFixed(2)}
                </div>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              <div>Total:</div>
              <div>₹{totalAmount.toFixed(2)}</div>
            </li>
          </ul>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Checkout Button */}
      <button
        className="btn btn-success"
        onClick={handleCheckout}
        disabled={loading || orderItems.length === 0}
      >
        {loading ? "Placing Order..." : "Checkout"}
      </button>
    </div>
  );
}
