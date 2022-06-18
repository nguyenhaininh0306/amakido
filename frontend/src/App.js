import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext, useState, useEffect } from 'react'
import { Store } from './Store'
import CartScreen from './pages/CartScreen'
import SigninScreen from './pages/SigninScreen'
import ShippingAddressScreen from './pages/ShippingAddressScreen'
import SignupScreen from './pages/SignupScreen'
import PaymentMethodScreen from './pages/PaymentMethodScreen'
import PlaceOrderScreen from './pages/PlaceOrderScreen'
import OrderScreen from './pages/OrderScreen'
import OrderHistoryScreen from './pages/OrderHistoryScreen'
import ProfileScreen from './pages/ProfileScreen'
import { getError } from './utils'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import SearchBox from './components/SearchBox'

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get('/api/products/categories')
  //       setCategories(data)
  //     } catch (error) {
  //       toast.error(getError(error))
  //     }
  //   }

  //   fetchCategories()
  // }, [])

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <header className='App-header'>
          <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
              <div>
                <Button
                  type='button'
                  variant='dark'
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <i className='fas fa-bars'></i>
                </Button>

                <LinkContainer to='/'>
                  <Navbar.Brand>amakido</Navbar.Brand>
                </LinkContainer>
              </div>

              <div>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                  <SearchBox />
                  <Nav className='me-auto'>
                    <Link to='/cart' className='nav-link'>
                      Cart
                      {cart.cartItem.length > 0 && (
                        <Badge pill bg='danger'>
                          {cart.cartItem.reduce((a, c) => a + c.quantity, 0)}
                          {/* {cart.cartItem.length} */}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id='basic-nav-dropdown'
                        className='title-name'
                      >
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Divider />

                        <Link
                          className='dropdown-item'
                          to='#signout'
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <Link className='nav-link' to='/signin'>
                        Sign In
                      </Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
        </header>

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className='flex-column text-while w-100 p-2'>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => {
              return (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={`/search?category=${category}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              )
            })}
          </Nav>
        </div>

        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/orderhistory' element={<OrderHistoryScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>

        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  )
}

export default App
