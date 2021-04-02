import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

const Checkout = () => {
  const [LoggedInUserInfo] = useContext(UserContext);
  const { productId } = useParams();
  console.log(productId);

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const productUri = `http://localhost:5000/product/${productId}`;
    try {
      const response = await axios.get(productUri);
      const data = response.data.product[0];
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    const uri = `http://localhost:5000/order/`;
    const data = {
      product: product.name,
      image: product.image,
      userEmail: LoggedInUserInfo.email,
    };
    console.log(data);
    try {
      const response = await axios.post(uri, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Checkout</h1>
      <div className="col-md-12 card shadow border-0">
        <div className="card-body">
          <table className="table fs-6 fw-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <img src={product.image} alt="product" width="100px" />
                </td>
                <td>{product.name}</td>
                <td>1</td>
                <td>{product.gender}</td>
                <td>$ {product.price}</td>
              </tr>
              <tr className="border-0">
                <td className="border-0" colSpan="5">
                  Total
                </td>
                <td className="border-0">$ {product.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary my-4" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Checkout;
