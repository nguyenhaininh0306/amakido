import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

//log reducer
// import logger from 'use-reducer-logger'

//create initialState
const initialStateProduct = {
  products: [],
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
        products: action.payload,
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

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialStateProduct
  )

  //   const [products, setProducts] = useState([])

  //fetch data từ server
  useEffect(() => {
    const fetchData = async () => {
      dispatch(FETCH_REQUEST)
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: FETCH_SUCCESS, payload: result.data })
      } catch (error) {
        dispatch({ type: FETCH_FAIL, payload: error.message })
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Featured Products</h1>
      <div className='products'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
