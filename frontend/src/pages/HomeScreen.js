import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logger from 'use-reducer-logger'

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
    logger(reducer),
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
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div className='product' key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className='product-info'>
                <Link to={`/product/${product.slug}`}>
                  <p>
                    <strong>{product.name}</strong>
                  </p>
                </Link>
                <p>{product.price}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HomeScreen
