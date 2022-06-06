import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react'
import { Store } from './Store'
import CartScreen from './pages/CartScreen'
import SigninScreen from './pages/SigninScreen'
import ShippingAddressScreen from './pages/ShippingAddressScreen'

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
  }

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header className='App-header'>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>amakido</Navbar.Brand>
              </LinkContainer>
              <Nav className=''>
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
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/shipping' element={<ShippingAddressScreen />} />
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
