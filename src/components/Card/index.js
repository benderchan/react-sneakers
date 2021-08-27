import React, { useContext, useState } from 'react';
import style from './Card.module.scss'
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../context';


const Card = ({
                loading = false,
                id,
                price,
                name,
                imageUrl,
                onAddButtonClick,
                onLikeClick,
                favorited = false
              }) => {

  const {isItemAdded} = useContext(AppContext)
  const [ isLiked, setIsLiked ] = useState(favorited)
  const onClickPlus = () => {
    onAddButtonClick({price, name, imageUrl, id})
  }
  const addToFav = () => {
    onLikeClick({price, name, imageUrl, id})
    setIsLiked(!isLiked)
  }
  return (
    <div className={style.card}>
      {
        loading
          ? (
            <ContentLoader
              speed={2}
              width={190}
              height={255}
              viewBox='0 0 160 200'
              backgroundColor='#f3f3f3'
              foregroundColor='#ecebeb'

            >
              <rect x='543' y='236' rx='3' ry='3' width='88' height='6'/>
              <rect x='545' y='236' rx='3' ry='3' width='52' height='6'/>
              <circle cx='571' cy='581' r='20'/>
              <rect x='0' y='-1' rx='10' ry='10' width='150' height='90'/>
              <rect x='0' y='101' rx='2' ry='2' width='150' height='15'/>
              <rect x='0' y='131' rx='3' ry='3' width='90' height='15'/>
              <rect x='0' y='172' rx='8' ry='8' width='80' height='24'/>
              <rect x='116' y='165' rx='8' ry='8' width='32' height='32'/>
            </ContentLoader>
          ) : (
          <>
            {onLikeClick &&
            <div className={style.favorite}>
              <img onClick={addToFav} src={isLiked ? 'img/heart1.svg' : 'img/heart0.svg'} alt='Favorite'/>
            </div>
            }
            <img width='100%' height='140px' src={imageUrl} alt=''/>
            <h5>{name}</h5>
            <div className='d-flex justify-between align-center'>
              <div className='d-flex flex-column'>
                <span>Price:</span>
                <b>{price}$</b>
              </div>
              {
                onAddButtonClick &&
                <img className={style.plus}
                     onClick={onClickPlus}
                     src={isItemAdded(id)
                       ? 'img/btn-check.svg'
                       : 'img/plus-button.svg'} alt='Add'
                />
              }
            </div>
          </>
          )
      }
    </div>
  );
};

export default Card;