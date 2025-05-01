import { Link } from 'react-router-dom'
import useStoreContext from '../context/StoreContext'
import { useState, useEffect } from 'react'

export default function ProductList() {
    const { useFetch, addToCart } = useStoreContext()
    const { data, loading, error } = useFetch('https://plant-store-backend-two.vercel.app/products')
    const [sortOption, setSortOption] = useState("Price -- Low to High")
    const [sortedData, setSortedData] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);

  
    const sortProducts = (sortOption, products, selectedCategories) => {
        let sorted = [...products];
    
        // filter by category
        if (selectedCategories.length > 0) {
            sorted = sorted.filter(product => selectedCategories.includes(product.productCategory));
        }
    
        // sort by price
        if (sortOption === "Price -- Low to High") {
            sorted.sort((a, b) => a.productPrice - b.productPrice);
        } else if (sortOption === "Price -- High to Low") {
            sorted.sort((a, b) => b.productPrice - a.productPrice);
        } else if (sortOption === "Popularity") {
            sorted.sort((a, b) => b.productRating - a.productRating);
        }
    
        return sorted;
    };
    

    useEffect(() => {
        if (data) {
            const sorted = sortProducts(sortOption, data, selectedCategories);
            setSortedData(sorted);
        }
    }, [sortOption, data, selectedCategories]);
    

    const handleByPriceAndRating = (e) => {
        setSortOption(e.target.value)
    }


    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter(categ => categ !== category));
        }
    };
    
    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 my-5" style={{ margin: "0 85px 0 10px" }}>
                        <form>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">Filters</span>
                                <a href="#" className="text-dark">Clear</a>
                            </div>
                            {/* get product by price */}
                            <div className="p-3">
                                <label className="form-label fw-bold">Price</label><br />
                                <input
                                    type="radio"
                                    name="sortByPrice"
                                    id="priceLowToHigh"
                                    value="Price -- Low to High"
                                    onChange={handleByPriceAndRating}
                                /> <label htmlFor="priceLowToHigh">Price -- Low to High</label><br />
                                <input
                                    type="radio"
                                    name="sortByPrice"
                                    id="priceHighToLow"
                                    value="Price -- High to Low"
                                    onChange={handleByPriceAndRating}
                                /> <label htmlFor="priceHighToLow">Price -- High to Low</label><br />
                                <input type="radio" name="sortByPrice" id="priceByPopularity" value="Popularity" onChange={handleByPriceAndRating} />
                                <label htmlFor="priceByPopularity">Popularity</label><br />
                            </div>

                            {/* get product by category */}
                            <div className="p-3">
                                <label className="form-label fw-bold">Category</label><br />
                                <input type="checkbox" id="categoryOfNaturalPlants" onChange={handleCategoryChange} value="Natural Plants" /> <label htmlFor="categoryOfNaturalPlants">Natural Plants</label><br />
                                <input type="checkbox" id="categoryOfPlantAccessories" onChange={handleCategoryChange} value="Plant Accessories" /> <label htmlFor="categoryOfPlantAccessories">Plant Accessories</label><br />
                                <input type="checkbox" id="categoryOfArtificialPlants" onChange={handleCategoryChange} value="Artificial Plants" /> <label htmlFor="categoryOfArtificialPlants">Artificial Plants</label><br />
                            </div>
                        </form>
                    </div>

                    {/* displaying all products here */}
                    <div className="col-md-9 my-5" style={{ backgroundColor: '#f2f8f8' }}>
                        <div className='py-3'>
                            <span className='fw-bold'>Showing All Products</span> <span>(Showing {sortedData?.length} products)</span>
                        </div>
                        <div className="row">
                            {sortedData && sortedData.map((product) => (
                                <div className="col-md-3 my-3" key={product._id}>
                                    <div className="card" style={{ width: "250px", borderRadius: "0px" }}>
                                        <div className='position-relative'>
                                            <button style={{ background: "transparent", border: "none" }} className='position-absolute top-0 end-0 p-2'>
                                                <img style={{ height: "29px", backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "7px 5px 5px 5px" }} src="/favorite.png" alt="wishlist" />
                                            </button>
                                            <img style={{ borderRadius: "0px", overflow: "hidden", height: "230px" }} src={product.productImg} className="card-img-top" alt={product.productName} />
                                        </div>
                                        <div className="card-body text-center">
                                            <Link className='nav-link' to={`/productsList/${product._id}`}>
                                                <p className="card-title">{product.productName}</p>
                                            </Link>
                                            <p className="card-text">${product.productPrice}</p>
                                            <div className="d-flex justify-content-between">
                                                <Link className='btn btn-success'>Buy Now</Link>
                                                <button className='btn btn-warning' onClick={() => addToCart(product)}>Add To Cart</button>
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
