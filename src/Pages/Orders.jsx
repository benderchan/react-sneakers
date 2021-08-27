import React, {  useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const Orders = () => {

  const [ orders, setOrders ] = useState([])
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getOrders = async () => {
      try {
        const {data} = await axios.get('https://6121174324d11c001762ef4c.mockapi.io/orders')
        setOrders(data.map(obj => obj.items).flat())
        setIsLoading(false)
      }
      catch (e) {
       alert('Error getting orders')
        console.log(e)
      }
    }
    getOrders()
  }, [])
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1> My orders</h1>
      </div>
      <div className='d-flex flex-wrap cardsBlock'>
        {
          (loading ? [...Array(4)] : orders)
          .map((item, index) =>
            <Card
              key={index}
              {...item}
              loading={loading}
            />)
        }
      </div>
    </div>
  );
};

export default Orders;