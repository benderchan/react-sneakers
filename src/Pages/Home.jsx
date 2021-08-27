import React  from 'react';
import Card from '../components/Card';

const Home = ({loading, items, onAddToCart, onLikeClick, searchValue, onChangeInput, setSearchValue}) => {

  const renderItems = () => {
    const filteredItems = items.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (
      (loading ? [...Array(7)] : filteredItems)
        .map((item, index) =>
        <Card
          key={index}
          onAddButtonClick={(el) => onAddToCart(el)}
          onLikeClick={(el) => onLikeClick(el)}
          {...item}
          loading={loading}
        />)
    )
  }

  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>{searchValue ? `Searching: '${searchValue}'` : 'All sneakers'} </h1>
        <div className='searchBlock d-flex'>
          <img src='img/search.svg' alt='Search'/>
          <input value={searchValue} onChange={onChangeInput} type='text' placeholder='Search...'/>
          {
            searchValue && <img
              onClick={() => setSearchValue('')}
              className='removeBtn clearBtn'
              src='img/btn-remove.svg'
              alt='Remove'/>
          }
        </div>
      </div>
      <div className='d-flex flex-wrap cardsBlock'>
        {renderItems()}
      </div>
    </div>
  );
};

export default Home;