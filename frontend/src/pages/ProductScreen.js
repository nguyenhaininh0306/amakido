import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from '../components/Rating'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'

//create initialState
const initialStateProduct = {
  product: [],
  loading: true,
  error: '',
}

//create constant
const FETCH_REQUEST = 'FETCH_REQUEST'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAIL = 'FETCH_FAIL'

//create reducer
const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      }
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

const ProductScreen = () => {
  const params = useParams()
  const { slug } = params

  const [{ loading, error, product }, dispatch] = useReducer(
    reducer,
    initialStateProduct
  )

  useEffect(() => {
    const fetchData = async () => {
      dispatch(FETCH_REQUEST)
      try {
        const result = await axios.get(`/api/products/slug/${slug}`)
        dispatch({ type: FETCH_SUCCESS, payload: result.data })
      } catch (error) {
        dispatch({ type: FETCH_FAIL, payload: getError(error) })
      }
    }
    fetchData()
  }, [slug])

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md='6'>
          <img className='img-large' src={product.image} alt={product.name} />
        </Col>

        <Col md='3'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md='3'>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button variant='primary'>Add to Card</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen