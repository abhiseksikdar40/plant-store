import { useState } from "react"
import { Form } from "react-router-dom"

export default function User () {

    const [addAdress, setAddAddress ] = useState(false)

    const handleAddButton = () => {
        setAddAddress((preV => !preV))
    } 
    
    return (
        <>
            <div className="container py-5 my-5 d-flex justify-content-around" style={{backgroundColor: "#e6f1f1"}}>
            <div>
            <div style={{
      width: '150px',
      height: '150px',
      overflow: 'hidden', 
      borderRadius: '50%',
    }}>
      <img
        src="https://images.unsplash.com/photo-1564172556663-2bef9580fc44?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="UserImage"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
    <div className="pt-4">
    <p><strong>Full Name:</strong> Matthew E. Torres</p>
    <p><strong>Email:</strong> MatthewETorres@teleworm.us</p>
    <p><strong>Phone Number:</strong> 070 8674 8017</p>
    <p><strong>Gender:</strong> Male</p>
    </div>
    </div>
    <div className="border border-2"></div>
   <div>
        <h3 className="text-center">ADDRESSES</h3>
        <div className="border border-4">
            <input type="radio" name="address" id="" /> <span> Matthew E. Torres <br/> 070 8674 8017 <br/> 19 Cloch Rd ST KATHERINES AB51 3AA</span>
            <hr/>
        </div>
        <button onClick={handleAddButton} className="mt-4 btn btn-primary" style={{borderRadius: "0px", width: "400px"}}>+ Add a new address</button>
            {addAdress && <form className="pt-4 text-center">
                <input type="text" id="fullName" placeholder="Full Name (Required)*" className="form-control"/><br/>
                <input type="number" id="phoneNumber" placeholder="Phone Number (Required)*" className="form-control"/><br/>
                <input type="number" id="pinCode" placeholder="Pin Code (Required)*" className="form-control"/><br/>
                <input type="text" id="houseNumber" placeholder="House No., Building Name (Required)*" className="form-control"/><br/>
                <input type="text" id="streetName" placeholder="Road Name, Area, Colony (Required)*" className="form-control"/><br/>
                <input type="text" id="cityName" placeholder="City (Required)*" className="form-control"/><br/>
                <button className="btn btn-success" style={{borderRadius: "0px", width: "400px"}}>Save Address</button>
                </form>}
   </div>
        </div>
        </>
    )
}