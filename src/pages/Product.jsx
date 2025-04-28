import { useState } from "react"
import { Link, useParams } from "react-router-dom"
export default function Product () {
  const { productId } = useParams()
  const [ product, setProduct ] = useState()

  const getProductDetails = async () => {
      try {
        const response = await fetch(`https://plant-store-backend-two.vercel.app/products/${productId}`)

        if(!response.ok){
          throw 'Product Not Found.'
        }

        const productData = await response.json()
        setProduct(productData)
      } catch (error) {
        console.log("Failed To Fetch Product Details!", error)
      }
  }

  getProductDetails()

    return (
        <>
        <div className="container my-5 py-3" style={{backgroundColor: "#f2f8f8"}}>
            <div className="row py-4">
            {product && (
              <>
                <div className="col-md-4 ps-5">
            <div className="card" style={{width: "255px", borderRadius: "0px"}}>
               <div className='position-relative'>
                <button style={{background: "transparent", border: "none" }} className='position-absolute top-0 end-0 p-2'><img style={{height: "32px", backgroundColor: "#FFFFFF", borderRadius: "17px", padding: "5px 4px 2px 4px"}} src="/favorite.png" alt="wishlist" /></button>
               <img style={{borderRadius: "0px", height: "300px", objectFit: "fill", overflow: "hidden"}} src={product.productImg} className="card-img-top" alt={product.productName}/>
               </div>
                </div>
                <Link className='btn btn-success my-2' style={{borderRadius: "0px", width: "255px"}}>Buy Now</Link>
                <button className='btn btn-primary my-2' style={{borderRadius: "0px", width: "255px"}}>Move To Cart</button>
            </div>
            <div className="col-md-8">
                <h4>{product.productName}</h4>
                <span>{product.productRating}</span><br/>
                <span className="fw-bold">${product.productPrice - (product.productPrice * product.productDiscount)/ 100}</span> <span className="fw-bold text-muted ps-2" style={{ textDecoration: "line-through" }}>${product.productPrice}</span><br/>
                <span className="fw-bold">{product.productDiscount}% OFF</span><br/>
                <span className="fw-bold">Quantity: </span> 
                  <span className="d-inline-flex align-items-center gap-2">
                    <button 
                      style={{
                        width: "30px", 
                        height: "30px", 
                        borderRadius: "50%", 
                        backgroundColor: "transparent", 
                        border: "1px solid black",
                        fontWeight: "bold",
                        paddingBottom: "3px"
                      }}
                    >
                      -
                    </button>

                    <input 
                      type="number" 
                      min={1} 
                      defaultValue={1}
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
                      style={{
                        width: "30px", 
                        height: "30px", 
                        borderRadius: "50%", 
                        backgroundColor: "transparent", 
                        border: "1px solid black",
                        fontWeight: "bold",
                        paddingBottom: "3px"
                      }}
                    >+
                    </button>
                  </span>
                  <br/>
                <div className="border border-1 mt-3"></div>

                <div className='row my-3'>
          <div className='col-md-3 text-center'>
                <img className='mb-1' style={{backgroundColor: '#d3c1dc', borderRadius: "35px", padding: "7px", width: "50px"}} src="/delivery-status.png" alt="Return" />
                <p>7 Days Return Policy</p>
              </div>
              <div className='col-md-3 text-center' >
                <img className='mb-1' style={{backgroundColor: '#d3c1dc', borderRadius: "35px", padding: "7px", width: "50px"}} src="/cash-on-delivery.png" alt="COD" />
                <p>Pay On Delivery</p>
              </div>
              <div className='col-md-3 text-center'>
                <img className='mb-1' style={{backgroundColor: '#d3c1dc', borderRadius: "35px", padding: "7px", width: "50px"}} src="/free-delivery.png" alt="Free Delivery" />
                <p>Free Shipping</p>
              </div>
              <div className='col-md-3 text-center'>
                <img className='mb-1' style={{backgroundColor: '#d3c1dc', borderRadius: "35px", padding: "7px", width: "50px"}} src="/secure-payment.png" alt="Secure Payment" />
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

            <div className="py-4 ps-5">
  <h4 className="py-2 fs-5 fw-bold">More items you may like</h4>

  <div className="d-flex align-items-center position-relative">

    {/* Left Arrow */}
    <div className="position-absolute start-0 ms-2">
      <img
        src="/left-arrow.png"
        alt="Left"
        className="img-fluid"
        style={{ width: "32px", cursor: "pointer" }}
      />
    </div>

    {/* Card Row */}
    <div className="d-flex overflow-auto mx-5 gap-3 ps-5">
      {[1, 2, 3, 4].map((item, index) => (
        <div key={index} className="card" style={{ width: "255px", borderRadius: "0px"}}>
          <div className="position-relative">
            <button
              className="btn position-absolute top-0 end-0 p-2 bg-transparent border-0"
            >
              <img
                src="/favorite.png"
                alt="wishlist"
                style={{
                  height: "32px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "17px",
                  padding: "5px 4px 2px 4px"
                }}
              />
            </button>
            <img
              src="https://placehold.co/150"
              className="card-img-top"
              alt="..."
              style={{ borderRadius: "0px" }}
            />
          </div>
          <div className="card-body text-center">
            <Link className="nav-link"  to={`/product/${item._id}`}><h5 className="card-title">Product Name</h5></Link>
            <p className="card-text">ProductPrice</p>
          </div>
          <button className="btn btn-primary w-100 rounded-0">
            Add To Cart
          </button>
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <div className="position-absolute end-0 me-2">
      <img
        src="/right.png"
        alt="Right"
        className="img-fluid"
        style={{ width: "32px", cursor: "pointer" }}
      />
    </div>
    
  </div>
</div>
 </div>
        </>
    )
}