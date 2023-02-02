import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import debounce from 'lodash/debounce';
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

  const displayMatches = () => {
    const matchArray = findMatches(localSearch, coinsArray);
    console.log(matchArray);
    setSearched(matchArray);
  };

  const debounceFn = useMemo(
    () => debounce(displayMatches, 1200),
    // eslint-disable-next-line
    [localSearch],
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
          onChange={(e) => {
            setLocalSearch(e.target.value);
            debounceFn();
          }}
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
                return (
                  <ul key={item.id}>
                    <li>
                      <Link
                        to={`/${item.id}`}
                        onClick={() => {
                          setIsInputFocused(false);
                          setLocalSearch('');
                          setSearched([]);
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
