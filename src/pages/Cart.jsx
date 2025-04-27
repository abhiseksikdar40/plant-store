export default function Cart () {
    return (
        <>
            <div style={{backgroundColor: "#e6f1f1"}}>
                <div className="container py-3">
                    <h2 className="text-center mb-4">My Cart</h2>
                    <div className="d-flex justify-content-evenly">
                    <div className="card mb-3" style={{width: "40%"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img src="https://placehold.co/350X650" className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Product Name</h5>
                           <div className="card-text">
                           <span className="fw-bold">Discounted Price</span> <span>#MRP#</span>
                <p>Discount Percentage</p>
                <span className="fw-bold">Quatity:</span> <span><button>-</button> <input type="number" name="" id="" style={{width: "30px"}} /> <button>+</button></span><br/>
                <button className='btn btn-danger mt-5' style={{borderRadius: "0px", width: "255px"}}>Remove From Cart</button>
                <button className='btn btn-outline-primary mt-2' style={{borderRadius: "0px", width: "255px"}}>Move To Wishlist</button>
                           </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-light px-5">
                        <h4 className="justify-content-start mt-3">Price Details</h4>
                        <div className="border border-1"></div>
                        <div className="d-flex justify-content-between">
                            <p>price(1 item)</p>
                            <p>$200</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Discount</p>
                            <p>-$50</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Delivery Charges</p>
                            <p>$5</p>
                        </div>
                        <div className="border border-1"></div>
                        <div className="d-flex justify-content-between mt-1">
                            <p className="fw-bold">Total Amount</p>
                            <p>$155</p>
                        </div>
                        <div className="border border-1"></div>
                        <p>You will save $50 on this order</p>
                        <button className='btn btn-success my-3' style={{borderRadius: "0px", width: "255px", height: "40px"}}>Place Order</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}