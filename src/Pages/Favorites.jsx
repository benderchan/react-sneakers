import React, { useContext } from 'react';
import Card from '../components/Card';
import { AppContext } from '../context';


const Favorites = () => {

  const {liked, onLikeClick} = useContext(AppContext)
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1> My favorites</h1>
      </div>
      <div className='d-flex flex-wrap cardsBlock'>
        {
          liked.map((item, index) =>
            <Card
              favorited={true}
              key={index}
              onLikeClick={onLikeClick}
              {...item}
            />)
        }
      </div>
    </div>
  );
};

export default Favorites;