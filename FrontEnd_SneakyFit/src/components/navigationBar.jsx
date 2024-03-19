import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { useState } from 'react'


function NavigationBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isauthenticated=useSelector(state => state.auth.status)

  // logout the user
  const logoutUser = () => {
    // clear the session storage changes
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('mobile')
    sessionStorage.removeItem('profileImage')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')

    // hide the navigation bar
    dispatch(logout())

    // redirect to login page
    navigate('/')
  }

  // const adminLogin=()=>{
  //   navigate('/adminLogin')
  // }

  // const validate=()=>{
  //    console.log(isauthenticated)
  //   if(sessionStorage.getItem('token')!='')
  //   navigate('/profile')

  // }


  return (
    <div>
      
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand'>Store</a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link' to='/product-gallery'>
                  Products
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/cart'>
                  Cart
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/my-orders'>
                  Orders
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/profile'>
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className='d-flex'>
            <button onClick={adminLogin()} className='btn'>
              ADMIN
            </button>
          </div> */}
          <div className='d-flex'>
            {sessionStorage.getItem('firstName')}
            <label style={{width:10}}></label>
          </div>

          <div className='d-flex'>
            <button className='btn btn-success'>
            <Link className='nav-link' to='/admin-login'>
                  ADMIN
                </Link>

            </button>
          
          </div>

          <div className='d-flex'>
            <button onClick={logoutUser} className='btn'>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
