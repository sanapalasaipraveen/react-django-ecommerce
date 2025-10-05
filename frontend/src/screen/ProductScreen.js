import React ,{ useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card,Form } from 'react-bootstrap'
import Rating from '../componenets/Rating'
import { useDispatch, useSelector } from 'react-redux';
// import products from '../products'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { fetchProductDetails } from '../slices/productSlice';
import Loader from '../componenets/Loader'
import Message from '../componenets/Message'
import { cartAddItem } from '../slices/cartSlice';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty]=useState(1)
  const dispatch = useDispatch();

  // Select the product details state from the Redux store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    // Dispatch the action to fetch details for this specific product ID
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler=()=>{
     dispatch(
      cartAddItem({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: Number(qty), // Ensure qty is a number
      })
    );
    navigate(`/cart/${id}?qty=${qty}`);
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                  color={'#f8e825'}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>$ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock >0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:
                      </Col>
                      <Col xs="auto" className='my-1'>
                      <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map((x)=>(
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                        

                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;