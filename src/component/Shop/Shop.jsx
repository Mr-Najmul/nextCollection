import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const productUri = `https://pacific-refuge-87901.herokuapp.com/product`;
    try {
      const response = await axios.get(productUri);
      const data = response.data.product;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mb-5 pb-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products
          ? products.map((product, i) => (
              <Product key={i} product={product}></Product>
            ))
          : "Loading"}
      </div>
    </div>
  );
};

export default Shop;
