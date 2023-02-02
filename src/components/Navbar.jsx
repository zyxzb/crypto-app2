import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';

//style
import './Navbar.scss';

const Navbar = ({ coins }) => {
  const [localSearch, setLocalSearch] = useState('');
  const [searched, setSearched] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const coinsArray = [...coins];

  const findMatches = (name, coinsArray) => {
    return coinsArray.filter((coin) => {
      const regex = new RegExp(name, 'gi');
      return coin.name.match(regex) || coin.symbol.match(regex);
    });
  };

  const searchList = (e) => {
    if (e.target.classList.contains('input')) {
      setIsInputFocused(true);
    } else {
      setIsInputFocused(false);
    }
  };

  const debounce = () => {
    let timeoutID;
    console.log('debounce called');
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        const matchArray = findMatches(e.target.value, coinsArray);
        setSearched(matchArray);
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(
    () => debounce(),
    // eslint-disable-next-line
    [],
  );

  useEffect(() => {
    window.addEventListener('click', searchList);
    return () => window.removeEventListener('click', searchList);
  }, [isInputFocused]);

  return (
    <div className='navbar'>
      <Link to='/'>
        <h1>
          <FaCoins className='icon' />
          Coin
          <span>Search</span>
        </h1>
      </Link>
      <form className='search' autoComplete='off'>
        <input
          id='name'
          className='input'
          type='text'
          value={localSearch}
          placeholder='Search...'
          onChange={optimizedDebounce}
          onFocus={() => setIsInputFocused(true)}
        />
        <div
          className={
            isInputFocused && searched.length !== coinsArray.length
              ? 'searched active'
              : 'searched'
          }
        >
          {searched.length !== coinsArray.length ? (
            <>
              {searched.map((item) => {
                console.log(item);
                return (
                  <ul key={item.id}>
                    <li>
                      <Link
                        to={`/${item.id}`}
                        onClick={() => {
                          setIsInputFocused(false);
                          setLocalSearch('');
                        }}
                      >
                        {item.name}
                        <img src={item.image} alt='coin-img' />
                      </Link>
                    </li>
                  </ul>
                );
              })}
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Navbar;
