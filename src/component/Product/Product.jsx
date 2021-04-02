import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;
  return (
    <div className="col">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text d-inline">Gender: {product.gender}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <h4>${product.price}</h4>
          <Link to={`/checkout/${product._id}`} className="btn btn-info">
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
