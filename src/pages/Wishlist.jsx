import { Link } from 'react-router-dom'

export default function Wishlist () {
    
    return (
        <>
        <h4 className="text-center fw-bold my-3">My Wishlist</h4>
        <div className='container my-5' style={{backgroundColor: "#f2f8f8", padding: "30px"}}>
            <div className="row">
            <div className="col-md-3">
                <div className="card" style={{width: "255px", borderRadius: "0px"}}>
               <div className='position-relative'>
                <button style={{background: "transparent", border: "none" }} className='position-absolute top-0 end-0 p-2'><img style={{height: "32px", backgroundColor: "#FFFFFF", borderRadius: "17px", padding: "5px 4px 2px 4px"}} src="/favorite-red.png" alt="wishlist" /></button>
               <img style={{borderRadius: "0px"}} src="https://placehold.co/150" className="card-img-top" alt="..."/>
               </div>
                <div className="card-body text-center">
                    <h5 className="card-title">Product Name</h5>
                    <p className="card-text">$Price</p>
                </div>
                </div>
                <button className='btn btn-primary' style={{borderRadius: "0px", width: "255px"}}>Move To Cart</button>
                <button className='btn btn-danger mt-2' style={{borderRadius: "0px", width: "255px"}}>Remove</button>
            </div>
            </div>
        </div>
        </>
    )
}