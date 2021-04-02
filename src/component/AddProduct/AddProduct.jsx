import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState();
  console.log(formData);

  const history = useHistory();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (event) => {
    const data = new FormData();
    data.set("key", "311d9defbf922efc26a40e35265ad954");
    data.append("image", event.target.files[0]);

    try {
      const response = await axios.post("https://api.imgbb.com/1/upload", data);

      const imageUri = response.data.data.display_url;
      setFormData({
        ...formData,
        image: imageUri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    const submitUri = `https://pacific-refuge-87901.herokuapp.com/product`;
    e.preventDefault();
    try {
      const response = await axios.post(submitUri, formData);
      console.log(response);
      setFormData({});
      history.push("/Admin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="d-flex">
      <div className="col-md-3 bg-dark text-light" style={{ height: "100vh" }}>
        <div className="p-3 text-center">
          <h2>NEXT COLLECTION</h2>
        </div>
        <div className="ps-5">
          <Link className="nav-link active text-light fs-5" to="/admin">
            <span>
              <i class="fas fa-cubes pe-3"></i>
            </span>{" "}
            Manage Products
          </Link>
        </div>
        <div className="ps-5" style={{ backgroundColor: "#fff" }}>
          <Link className="nav-link active text-dark fs-5" to="/product/add">
            <span>
              <i class="fas fa-plus pe-3"></i>
            </span>{" "}
            Add Products
          </Link>
        </div>

        <div className="ps-5">
          <Link className="nav-link active text-light fs-5" to="#">
            <span>
              <i class="fas fa-edit pe-3"></i>
            </span>{" "}
            Edit Products
          </Link>
        </div>

        <div className="ps-5">
          <Link className="nav-link active text-light fs-5" to="/">
            <span>
              <i class="fas fa-eye pe-3"></i>
            </span>{" "}
            View Shop
          </Link>
        </div>
      </div>

      <div className="col-md-9">
        <div className="col-md-12 bg-light">
          <h5 className="p-3 fs-3">Add Product</h5>
        </div>
        <div className="card m-3 p-3 border-0 shadow">
          <form className="form p-3" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label>Product name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter product name"
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
                <div className="form-group py-2">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Enter product price"
                    onChange={handleInputChange}
                    required
                  ></input>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group py-2">
                  <label>Gender</label>
                  <select
                    name="gender"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Baby">Baby</option>
                  </select>
                </div>

                <div className="form-group py-2">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image"
                    class="form-control"
                    required
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-between mt-3">
                <button className="btn btn-info" type="reset">
                  CLEAR
                </button>
                <button className="btn btn-primary" type="submit">
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
