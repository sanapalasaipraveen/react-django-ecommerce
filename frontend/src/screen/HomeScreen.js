
import React,{ useState,useEffect } from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../componenets/Product'
import Loader from '../componenets/Loader'
import Message from '../componenets/Message'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
// import Product from '../components/Product'; // Corrected the path from 'componenets'
import { fetchProducts } from '../slices/productSlice'; // 1. Import your action


function HomeScreen() {
  // 2. Get the dispatch function
  const dispatch = useDispatch();

  // 3. Select the data you need from the Redux store
  const { products, loading, error } = useSelector((state) => state.productList);

  // 4. On component load, dispatch the action to fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>

      {/* 5. Handle loading and error states */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;