import { useState, useEffect } from "react";
import useStoreContext from "../context/StoreContext";

export default function User() {
  const { address, setUserAddress, updateAddress, deleteAddress } = useStoreContext();
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    houseNumber: "",
    streetName: "",
    cityName: "",
  });
  const [editingAddress, setEditingAddress] = useState(null); 
  const [addAddressForm, setAddAddressForm] = useState(false);

  // Fetch the address from backend when the component mounts
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch("https://plant-store-backend-two.vercel.app/address");
        if (response.ok) {
          const addressData = await response.json();
          setUserAddress(addressData);  
        } else {
          console.error("Failed to fetch address");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [setUserAddress]); 

  // Handle the form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  // Handle form submission to add or update address
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress({ ...newAddress, _id: editingAddress._id });
      setEditingAddress(null);
    } else {
      setUserAddress(newAddress);  // Add new address
    }
    setAddAddressForm(false);
    setNewAddress({
      fullName: "",
      phoneNumber: "",
      pinCode: "",
      houseNumber: "",
      streetName: "",
      cityName: "",
    });
  };

  // Toggle the Add Address Form visibility
  const handleAddButton = () => {
    setAddAddressForm((prev) => !prev);
  };

  // Handle editing an address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      pinCode: address.pinCode,
      houseNumber: address.houseNumber,
      streetName: address.streetName,
      cityName: address.cityName,
    });
    setAddAddressForm(true);
  };

  // Handle deleting an address
  const handleDeleteAddress = (addressId) => {
    deleteAddress(addressId);
  };

  return (
    <>
      <div className="container py-5 my-5 d-flex justify-content-around" style={{ backgroundColor: "#e6f1f1" }}>
        <div>
          <div style={{ width: "150px", height: "150px", overflow: "hidden", borderRadius: "50%" }}>
            <img
              src="https://images.unsplash.com/photo-1564172556663-2bef9580fc44?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="UserImage"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                          {address && address.length > 0 ? (
                  address.map((addr) => (
                    <div key={addr._id} className="border border-4 my-3 p-3" style={{ width: "600px" }}>
                      <input type="radio" name="address" id={`address-${addr._id}`} />
                      <span className="ms-2">
                        {addr.fullName} <br /> {addr.phoneNumber} <br />
                        {addr.houseNumber}, {addr.streetName}, {addr.cityName} <br /> {addr.pinCode}
                      </span>
                      <br />
                      <button
                        onClick={() => handleEditAddress(addr)}
                        className="btn btn-warning mt-2 mx-2 btn-sm"
                      >
                        Edit Address
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr._id)}
                        className="btn btn-danger mt-2 btn-sm"
                      >
                        Delete Address
                      </button>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No addresses added yet.</p>
                )}

          <button
            onClick={handleAddButton}
            className="mt-4 btn btn-primary"
            style={{ borderRadius: "0px", width: "400px" }}
          >
            + Add a new address
          </button>

          {addAddressForm && (
            <form className="pt-4 text-center" onSubmit={handleFormSubmit}>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name (Required)*"
                className="form-control"
                value={newAddress.fullName}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number (Required)*"
                className="form-control"
                value={newAddress.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                placeholder="Pin Code (Required)*"
                className="form-control"
                value={newAddress.pinCode}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                placeholder="House No., Building Name (Required)*"
                className="form-control"
                value={newAddress.houseNumber}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                type="text"
                id="streetName"
                name="streetName"
                placeholder="Road Name, Area, Colony (Required)*"
                className="form-control"
                value={newAddress.streetName}
                onChange={handleInputChange}
                required
              />
              <br />
              <input
                type="text"
                id="cityName"
                name="cityName"
                placeholder="City (Required)*"
                className="form-control"
                value={newAddress.cityName}
                onChange={handleInputChange}
                required
              />
              <br />
              <button
                type="submit"
                className="btn btn-success"
                style={{ borderRadius: "0px", width: "400px" }}
              >
                {editingAddress ? "Update Address" : "Save Address"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
