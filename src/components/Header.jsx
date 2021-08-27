import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCart } from '../Hooks/useCart';

const Header = ({openCart}) => {

  const {totalPrice, newPrice} = useCart()
  return (
    <header className='d-flex justify-between align-center p-40'>

      <Link  to='/react-sneakers'>
        <div className='d-flex align-center'>
          <img width={40} height={40} src='img/logo.png' alt='HeaderLogo'/>
          <div>
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>Sneakers store</p>
          </div>
        </div>
      </Link>

      <ul className='d-flex '>
        <li className='mr-30'>
          <img onClick={openCart} className='cu-p' width='18px' height='18px' src='img/cart.svg' alt='Cart'/>
          <span className='fw-bold'>{newPrice} {totalPrice}</span>$
        </li>
        <li className='mr-10'>
          <Link to='/react-sneakers/favorites'>
            <img className='cu-p' width='18px' height='18px' src='img/heart.svg' alt='fav'/>
          </Link>
        </li>
        <li>
          <Link to='/react-sneakers/orders'>
            <img width='18px' height='18px' src='img/orders.svg' alt='User'/>
          </Link>
        </li>
      </ul>
    </header>

  );
};

export default Header;