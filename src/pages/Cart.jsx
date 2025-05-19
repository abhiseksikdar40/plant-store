import useStoreContext from "../context/StoreContext";

export default function Cart() {
    const { cart, cartDelete } = useStoreContext();

    // Calculate the total price of all items in the cart
    const totalPrice = cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

    // Calculate the total discount (sum of discounts for each item)
    const totalDiscount = cart.reduce((sum, item) => {
        return sum + (item.productPrice * item.quantity * (item.productDiscount / 100));
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
                        {cart ?  (
                            cart?.map((item) => (
                                <div className="card mb-3" key={item._id}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={item.productImg}
                                                className="img-fluid rounded-start"
                                                alt={item.productName}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.productName}</h5>
                                                <div className="card-text">
                                                    <span className="fw-bold">Price:</span>{" "}
                                                    <span>${item.productPrice}</span>
                                                    <p>Rating: {item.productRating}</p>
                                                    <span className="fw-bold">Quantity:</span>{" "}
                                                    <span className="mx-2">
                                                        <button>-</button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            style={{ width: "40px", textAlign: "center" }}
                                                        />
                                                        <button>+</button>
                                                    </span>
                                                    <br />
                                                    <span className="fw-bold">Discount:</span>{" "}
                                                    <span>-${(item.productPrice * item.quantity * (item.productDiscount / 100)).toFixed(2)}</span>
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
                            ))
                        ) : (
                            <h5 className="text-center">🛒 Your cart is empty</h5>
                        )}
                    </div>

                    {/* Price Summary */}
                    <div className="bg-light px-5" style={{ height: "fit-content" }}>
                        <h4 className="justify-content-start mt-3">Price Details</h4>
                        <div className="border border-1"></div>
                        <div className="d-flex justify-content-between">
                            <p>Price ({cart.length} item{cart.length !== 1 ? "s" : ""})</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Discount</p>
                            <p>-${totalDiscount.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Delivery Charges</p>
                            <p>${delivery}</p>
                        </div>
                        <div className="border border-1"></div>
                        <div className="d-flex justify-content-between mt-1">
                            <p className="fw-bold">Total Amount</p>
                            <p>${finalAmount.toFixed(2)}</p>
                        </div>
                        <div className="border border-1"></div>
                        <p>You will save ${totalDiscount.toFixed(2)} on this order</p>
                        <button
                            className="btn btn-success my-3"
                            style={{ borderRadius: "0px", width: "255px", height: "40px" }}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
