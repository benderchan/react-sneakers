import React, { useState } from 'react';
import Info from '../info';
import axios from 'axios';
import { useCart } from '../../Hooks/useCart';
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

const Drawer = ({opened ,closeCart, items = [], onRemove}) => {
  const [ isOrderCompleted, setIsOrderCompleted ] = useState(false)
  const [ orderId, setOrderId ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const {totalPrice, cartItems, setCartItems} = useCart()

  const onOrderClick = async () => {
    try {
      setLoading(true)
      const {data} = await axios.post(`https://6121174324d11c001762ef4c.mockapi.io/orders`, {
        items: cartItems
      })
      setOrderId(data.id)
      setIsOrderCompleted(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(`https://6121174324d11c001762ef4c.mockapi.io/cart/${item.id}`)
        delay(1000)
      }
    } catch (e) {
      alert('Cant order')
    }
    setLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened && styles.overlayVisible}` }>
      <div className={styles.drawer}>
        <h2 className='mb-30 d-flex justify-between'>Cart
          <img onClick={closeCart} className='removeBtn cu-p' src='/img/btn-remove.svg' alt='Close'/>
        </h2>
        {
          items.length > 0
            ?
            <div className='flex flex-column d-flex'>
              <div className='items flex'>
                {
                  items.map((el) => (
                    <div key={el.id} className='cartItem d-flex align-center mb-20'>
                      <div style={{backgroundImage: `url(${el.imageUrl})`}} className='cartItemImg'>
                      </div>
                      <div className='mr-20 flex'>
                        <p className='mb-5'>{el.name}</p>
                        <b>{el.price}$</b>
                      </div>
                      <img onClick={() => onRemove(el.id)} className='removeBtn' src='/img/btn-remove.svg'
                           alt='Remove'/>
                    </div>
                  ))
                }
              </div>
              <div className='cartTotalBlock'>
                <ul>
                  <li>
                    <span>Total</span>
                    <div></div>
                    <b>{totalPrice}$</b>
                  </li>
                  <li>
                    <span>Tax 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice * 0.05) }$</b>
                  </li>
                </ul>
                <button disabled={loading} onClick={onOrderClick} className='greenButton'>Order <img
                  src='/img/arrow.svg' alt=''/></button>
              </div>
            </div>
            :
            <Info
              title={isOrderCompleted ? 'Order completed' : 'Cart is empty'}
              image={isOrderCompleted ? '/img/order.jpg' : '/img/empty-cart.jpg'}
              desc={isOrderCompleted ? `Your order is #${orderId}` : 'Add at least one pair before order'}
            />
        }
      </div>
    </div>
  );
};

export default Drawer;