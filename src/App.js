import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer/';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import { AppContext } from './context';
import Orders from './Pages/Orders';


function App() {
  const [ items, setItems ] = useState([])
  const [ cartItems, setCartItems ] = useState([])
  const [ cartOpened, setCartOpened ] = useState(false)
  const [ searchValue, setSearchValue ] = useState('')
  const [ liked, setLiked ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [ cartData, likedData, sneakersData ] = await Promise.all([
          axios.get('https://6121174324d11c001762ef4c.mockapi.io/cart'),
          axios.get('https://6121174324d11c001762ef4c.mockapi.io/liked'),
          axios.get('https://6121174324d11c001762ef4c.mockapi.io/items')
        ])

        setIsLoading(false)

        setCartItems(cartData.data)
        setLiked(likedData.data)
        setItems(sneakersData.data)
      } catch (e) {
        alert('Cant fetch data')
        console.log(e)
      }

    }
    fetchData()


  }, [])

  const onAddToCart = async (item) => {
    try {
      if (cartItems.find(obj => Number(obj.id) === Number(item.id))) {
        setCartItems(prev => prev.filter(obj => Number(item.id) !== Number(obj.id)))
        await axios.delete(`https://6121174324d11c001762ef4c.mockapi.io/cart/${item.id}`, item)
      } else {
        await axios.post('https://6121174324d11c001762ef4c.mockapi.io/cart', item)
        setCartItems(prev => [ ...prev, item ])
      }

    } catch (e) {
      alert('Cant add item')
    }

  }
  const onLikeClick = async (obj) => {
    try {
      if (liked.find(fav => Number(fav.id) === Number(obj.id))) {
        await axios.delete(`https://6121174324d11c001762ef4c.mockapi.io/liked/${obj.id}`)
        setLiked(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const {data} = await axios.post('https://6121174324d11c001762ef4c.mockapi.io/liked', obj)
        setLiked(prev => [ ...prev, data ])
      }
    } catch (err) {
      alert('Cant add to favorite')
    }

  }

  const removeCartItem = async (id) => {
    try {
      setCartItems(prev => prev.filter(el => el.id !== id))
      await axios.delete(`https://6121174324d11c001762ef4c.mockapi.io/cart/${id}`)
    } catch (e) {
      console.log(e)
      alert('Cant remove item from cart')
    }
  }

  const onChangeInput = (e) => {
    setSearchValue(e.target.value)
  }


  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  const openCart = () => {
    setCartOpened(true)
  }
  const closeCart = () => {
    setCartOpened(false)
  }

  return (
    <AppContext.Provider
      value={{cartItems, liked, items, isItemAdded, onLikeClick, setCartOpened, setCartItems, onAddToCart}}
    >
      <div className='wrapper clear'>
        <Drawer
          items={cartItems}
          closeCart={closeCart}
          onRemove={removeCartItem}
          opened={cartOpened}
        />

        <Header cartItems={cartItems} openCart={openCart}/>

        <Route path='/' exact>
          <Home
            cartItems={cartItems}
            searchValue={searchValue}
            items={items}
            onAddToCart={onAddToCart}
            onLikeClick={onLikeClick}
            onChangeInput={onChangeInput}
            setSearchValue={setSearchValue}
            loading={isLoading}
          />
        </Route>
        <Route path='/react-sneakers/favorites' exact>
          <Favorites/>
        </Route>
        <Route path='/react-sneakers/orders' exact>
          <Orders/>
        </Route>

      </div>
    </AppContext.Provider>

  );
}

export default App;
