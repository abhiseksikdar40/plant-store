import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useStoreContext from "../context/StoreContext";

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useStoreContext();

  useEffect(() => {
    async function getProductDetails() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://plant-store-backend-two.vercel.app/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product Not Found.");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message || "Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    }
    getProductDetails();
  }, [productId]);

  // Handler to add product with quantity to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.productName} added to cart (${quantity})`);
    }
  };

  return (
    <div className="container my-5 py-3" style={{ backgroundColor: "#f2f8f8" }}>
      <div className="row py-4">
        {loading && <p>Loading product details...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {product && (
          <>
            {/* Product Image & Actions */}
            <div className="col-md-4 ps-5">
              <div className="card" style={{ width: "255px", borderRadius: "0px" }}>
                <div className="position-relative">
                  <button
                    style={{ background: "transparent", border: "none" }}
                    className="position-absolute top-0 end-0 p-2"
                    aria-label="Add to wishlist"
                  >
                    <img
                      style={{
                        height: "32px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "17px",
                        padding: "5px 4px 2px 4px",
                      }}
                      src="/favorite.png"
                      alt="wishlist icon"
                    />
                  </button>
                  <img
                    style={{
                      borderRadius: "0px",
                      height: "300px",
                      objectFit: "fill",
                      overflow: "hidden",
                    }}
                    src={product.productImg}
                    className="card-img-top"
                    alt={product.productName}
                  />
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn btn-success my-2"
                style={{ borderRadius: "0px", width: "255px", display: "block", textAlign: "center" }}
              >
                Buy Now
              </Link>

              <button
                className="btn btn-primary my-2"
                style={{ borderRadius: "0px", width: "255px", display: "block" }}
                onClick={handleAddToCart}
              >
                Move To Cart
              </button>
            </div>

            {/* Product Details */}
            <div className="col-md-8">
              <h4>{product.productName}</h4>
              <span>{product.productRating}</span>
              <br />
              <span className="fw-bold">
                $
                {(
                  product.productPrice -
                  (product.productPrice * product.productDiscount) / 100
                ).toFixed(2)}
              </span>{" "}
              <span
                className="fw-bold text-muted ps-2"
                style={{ textDecoration: "line-through" }}
              >
                ${product.productPrice.toFixed(2)}
              </span>
              <br />
              <span className="fw-bold">{product.productDiscount}% OFF</span>
              <br />

              {/* Quantity Controls */}
              <span className="fw-bold">Quantity: </span>
              <span className="d-inline-flex align-items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "1px solid black",
                    fontWeight: "bold",
                    paddingBottom: "3px",
                  }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setQuantity(isNaN(value) || value < 1 ? 1 : value);
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "0",
                    fontSize: "16px",
                  }}
                />

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "1px solid black",
                    fontWeight: "bold",
                    paddingBottom: "3px",
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </span>
              <br />

              <div className="border border-1 mt-3"></div>

              {/* Product Features */}
              <div className="row my-3">
                <div className="col-md-3 text-center">
                  <img
                    className="mb-1"
                    style={{
                      backgroundColor: "#d3c1dc",
                      borderRadius: "35px",
                      padding: "7px",
                      width: "50px",
                    }}
                    src="/delivery-status.png"
                    alt="Return policy icon"
                  />
                  <p>7 Days Return Policy</p>
                </div>
                <div className="col-md-3 text-center">
                  <img
                    className="mb-1"
                    style={{
                      backgroundColor: "#d3c1dc",
                      borderRadius: "35px",
                      padding: "7px",
                      width: "50px",
                    }}
                    src="/cash-on-delivery.png"
                    alt="Cash on delivery icon"
                  />
                  <p>Pay On Delivery</p>
                </div>
                <div className="col-md-3 text-center">
                  <img
                    className="mb-1"
                    style={{
                      backgroundColor: "#d3c1dc",
                      borderRadius: "35px",
                      padding: "7px",
                      width: "50px",
                    }}
                    src="/free-delivery.png"
                    alt="Free delivery icon"
                  />
                  <p>Free Shipping</p>
                </div>
                <div className="col-md-3 text-center">
                  <img
                    className="mb-1"
                    style={{
                      backgroundColor: "#d3c1dc",
                      borderRadius: "35px",
                      padding: "7px",
                      width: "50px",
                    }}
                    src="/secure-payment.png"
                    alt="Support icon"
                  />
                  <p>24/7 Support</p>
                </div>
              </div>

              <div className="border border-2"></div>

              <p className="pt-3 fw-bold">Description:</p>
              <p>{product.productDescription}</p>
            </div>
          </>
        )}
      </div>

      <div className="border border-1"></div>
    </div>
  );
}
