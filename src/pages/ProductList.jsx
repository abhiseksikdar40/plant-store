    import { Link } from 'react-router-dom'
import useStoreContext from '../context/StoreContext'
    export default function ProductList () {

        const { useFetch } = useStoreContext()
        const { data, loading, error } = useFetch('https://plant-store-backend-two.vercel.app/products')

        return (
            <>
            <div className="container-fluid">
            <div className="row">
            <div className="col-md-2 my-5" style={{margin: "0 85px 0 10px"}}>
            <form>
                <div className="d-flex justify-content-between">
                    <span className="fw-bold">Filters</span>
                    <a href="#" className="text-dark">Clear</a>
                </div>
                {/* get product by price */}
                <div className="p-3">
        <label className="form-label fw-bold">Price</label><br/>
        <input type="radio" name="sortByPrice" id="priceLowToHigh" value="Price -- Low to High" /> <label htmlFor="priceLowToHigh">Price -- Low to High</label> <br/>
        <input type="radio" name="sortByPrice" id="priceHighToLow" value="Price -- High to Low" /> <label htmlFor="priceHighToLow">Price -- High to Low</label><br/>
        <input type="radio" name="sortByPrice" id="priceByPopularity" value="Popularity" /> <label htmlFor="priceByPopularity">Popularity</label><br/>
        <input type="radio" name="sortByPrice" id="priceByNewestFirst" value="Newest First" /> <label htmlFor="priceByNewestFirst">Newest First</label><br/>
        </div>

        {/* get product by category */}
        <div className="p-3">
            <label className="form-label fw-bold">Category</label><br/>
            <input type="checkbox" id="categoryOfNaturalPlants" /> <label htmlFor="categoryOfNaturalPlants">Natural Plants</label><br/>
            <input type="checkbox" id="categoryOfPlantAccessories" /> <label htmlFor="categoryOfPlantAccessories">Plant Accessories</label><br/>
            <input type="checkbox" id="categoryOfArtificialPlants" /> <label htmlFor="categoryOfArtificialPlants">Artificial Plants</label><br/>
        </div>

        {/* get product by rating */}
            <div className="p-3">
                <label className="form-label fw-bold">Rating</label><br/>
                <input type="radio" name="sortByRating" id="4StarAndAbove" value='4 Stars & Above' /> <label htmlFor="4StarAndAbove">4 Stars & Above</label><br/>
                <input type="radio" name="sortByRating" id="3StarAndAbove" value='3 Stars & Above' /> <label htmlFor="3StarAndAbove">3 Stars & Above</label><br/>
                <input type="radio" name="sortByRating" id="2StarAndAbove" value='2 Stars & Above' /> <label htmlFor="2StarAndAbove">2 Stars & Above</label><br/>
                <input type="radio" name="sortByRating" id="1StarAndAbove" value='1 Star & Above' /> <label htmlFor="1StarAndAbove">1 Star & Above</label><br/>
            </div>
        </form>
            
            {/* displaying all products here */}
            </div>
            <div className="col-md-9 my-5" style={{backgroundColor: '#f2f8f8'}}>
                <div className='py-3'>
                <span className='fw-bold'>Showing All Products</span> <span>(Showing {data?.length} products)</span>
                </div>
            <div className="row">
                            {data && data.map(product => (
                <div className="col-md-3 my-3" key={product._id}>
                    <div className="card" style={{width: "250px", borderRadius: "0px"}}>
                    <div className='position-relative'>
                        <button style={{background: "transparent", border: "none"}} className='position-absolute top-0 end-0 p-2'>
                        <img style={{height: "29px", backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "7px 5px 5px 5px"}} src="/favorite.png" alt="wishlist" />
                        </button>
                        <img style={{borderRadius: "0px", overflow: "hidden", height: "230px"}} src={product.productImg} className="card-img-top" alt={product.productName}/>
                    </div>
                    <div className="card-body text-center">
                        <Link className='nav-link' to={`/productsList/${product._id}`}>
                        <p className="card-title">{product.productName}</p>
                        </Link>
                        <p className="card-text">${product.productPrice}</p>
                        <div className="d-flex justify-content-between">
                        <Link className='btn btn-success'>Buy Now</Link>
                        <button className='btn btn-warning'>Add To Cart</button>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
            </div>
            </div>
            </>
        )
    }
