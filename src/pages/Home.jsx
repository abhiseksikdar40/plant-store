import '../index.css';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
    <div style={{padding: "30px 105px 30px 105px"}}>
    <div className="container-fluid py-4 px-4" style={{ backgroundColor: '#c1dcdc', borderRadius: '20px', fontWeight: "800" }}>
      <div className="row align-items-start">

        <div className="col-md-6">
          <h1 className="fw-bold" style={{ fontSize: '50px' }}>
            Buy your <br />
            <span className="fw-bold">dream plants🌿</span>
          </h1>

          <div className="d-flex align-items-center my-4">
            <div className="text-center me-4">
              <h4 className="mb-0 fw-bold">50+</h4>
              <p className="mb-0">Plant Species</p>
            </div>
            <div className="vr mx-3" style={{ height: '50px' }}></div>
            <div className="text-center">
              <h4 className="mb-0 fw-bold">100+</h4>
              <p className="mb-0">Customers</p>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center py-4">
      <div className="input-group" style={{ maxWidth: '400px', borderRadius: "10px", backgroundColor: "white" }}>
        <input
          type="text"
          className="form-control border-0"
          placeholder="What are you looking for?"
        />
        <button className="btn" type="button" >
        <img style={{ padding: "6px", backgroundColor: '#c1dcdc', borderRadius: "10px"}} src="/search.png" alt="Search-Icon" />
        </button>
      </div>
    </div>
        </div>

        <div className="col-md-6 text-center position-relative">
          <div
            className="bg-dark rounded-circle mx-auto"
            style={{
              bottom: "-10px",
              width: '400px',
              height: '400px',
              position: 'relative',
              overflow: "hidden"
            }}
          >
            <img
              src='/Home-plant.png'
              alt="Plant"
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                maxHeight: '550px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </div>

    <section id='ProductSection'>
    <div className="container text-center" 
 style={{margin: "100px 0 0 100px"}}
    >
      <h2 style={{ fontFamily: 'Lilita One', fontWeight: "bold" }}>Categories</h2>
    <p style={{ fontFamily: 'Lilita One', fontWeight: "normal" }} className="text-body-secondary text-muted mb-5">Find what you are looking for</p>
      </div>
  <div className="text-center" style={{ backgroundColor: '#c1dcdc'
     ,margin: "0 0 100px 0", padding: "0 0 70px 0"
    }}
    >
    <div className="row justify-content-center g-4">
      {/* Natural Plants */}
      <div className="col-md-4 d-flex justify-content-center">
        <div className="rounded-4 p-3" style={{ width: '300px', backgroundColor: 'transparent', border: 'none' }}>
          <img
            src="https://images.unsplash.com/photo-1700213040248-254e9267dd3e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Natural Plants"
            className="img-fluid rounded-4"
            style={{ height: '400px' }}
          />
          <h6 className="fw-bold mt-3">Natural Plants</h6>
        </div>
      </div>

      {/* Plant Accessories */}
      <div className="col-md-4 d-flex justify-content-center">
        <div className="rounded-4 p-3 text-center d-flex flex-column align-items-center" style={{ width: '100%', maxWidth: '300px', backgroundColor: 'transparent', border: 'none' }}>
          <img
            src="https://images.unsplash.com/photo-1599108859603-0667ef2665eb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Plant Accessories"
            className="img-fluid rounded-4"
            style={{ height: '400px' }}
          />
          <h6 className="fw-bold mt-3">Plant Accessories</h6>
        </div>
      </div>

      {/* Artificial Plants */}
      <div className="col-md-4 d-flex justify-content-center">
        <div className="rounded-4 p-3" style={{backgroundColor: 'transparent', border: 'none' }}>
          <img
            src="https://images.unsplash.com/photo-1648413344466-93666a521e74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Artificial Plants"
            className="img-fluid rounded-4"
            style={{  width: '300px', height: '400px' }}
          />
          <h6 className="fw-bold mt-3">Artificial Plants</h6>
        </div>
      </div>
    </div>
    <div>
    <p style={{ fontFamily: 'Lilita One' }} className="small mb-3">Whether you're a seasoned plant lover or just getting started <br/> we've got something for you.</p>
          <Link to='/productsList' className="btn btn-light border mt-3">
            Explore
            <img className='ps-2' src="/right-arrow.png" alt="Right Arrow" style={{ height: '15px' }} />
          </Link>
          </div>
  </div>
</section>

<section id='AboutUs' className='pb-5'>
        <div className='row'>
          <div className='col-md-4 text-center'>
                <img className='mb-3' style={{backgroundColor: '#c1dcdc', borderRadius: "35px", padding: "20px"}} src="/potted-plant.png" alt="Potted-Plant" />
                <h3>Large Assortment</h3>
                <p>We offer many different types of products with <br/> fewer variations in each category.</p>
              </div>
              <div className='col-md-4 text-center' >
                <img className='mb-3' style={{backgroundColor: '#c1dcdc', borderRadius: "35px", padding: "20px"}} src="/package.png" alt="Package" />
                <h3>Fast & Free Shipping</h3>
                <p>4-day or less delivery time, <br/> free shipping and an expedited delivery option.</p>
              </div>
              <div className='col-md-4 text-center'>
                <img className='mb-3' style={{backgroundColor: '#c1dcdc', borderRadius: "35px", padding: "20px"}} src="/headset.png" alt="Headset" />
                <h3>24/7 Support</h3>
                <p>Answers to any business-related <br/> inquiry 24/7 and in real-time.</p>
              </div>
        </div>
</section>

    </>
  );
}
