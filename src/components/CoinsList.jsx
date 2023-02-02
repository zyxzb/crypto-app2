import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Coin from './pages/Coin';
import CoinItem from './CoinItem';
import Loader from './loader/Loader';
import Pagination from './pagination/Pagination';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

//style
import './CoinsList.scss';

const Coins = ({ coins, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [postsPerPage, setPostsPerPage] = useState(50);
  const [sortedByRank, setSortedByByRank] = useState(false);
  const [sortedByPrice, setSortedByPrice] = useState(false);
  const [sortedByPercentage, setSortedByPercentage] = useState(false);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = coins.slice(firstPostIndex, lastPostIndex);

  const sortByRank = () => {
    if (!sortedByRank) {
      coins.sort((a, b) => (a.market_cap_rank > b.market_cap_rank ? -1 : 1));
      setSortedByByRank(true);
    } else {
      coins.sort((a, b) => (a.market_cap_rank < b.market_cap_rank ? -1 : 1));
      setSortedByByRank(false);
    }
  };

  const sortByPrice = () => {
    if (!sortedByPrice) {
      coins.sort((a, b) => (a.current_price > b.current_price ? -1 : 1));
      setSortedByPrice(true);
    } else {
      coins.sort((a, b) => (a.current_price < b.current_price ? -1 : 1));
      setSortedByPrice(false);
    }
  };

  const sortByPercentage = () => {
    if (!sortedByPercentage) {
      coins.sort((a, b) =>
        a.market_cap_change_percentage_24h > b.market_cap_change_percentage_24h
          ? -1
          : 1,
      );
      setSortedByPercentage(true);
    } else {
      coins.sort((a, b) =>
        a.market_cap_change_percentage_24h < b.market_cap_change_percentage_24h
          ? -1
          : 1,
      );
      setSortedByPercentage(false);
    }
  };

  return (
    <>
      {coins.length > 0 ? (
        <div className='container'>
          <div className='heading'>
            <div className='rank'>
              <p onClick={sortByRank}>
                #{sortedByRank ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
              </p>
            </div>
            <div className='symbol'>
              <p>Coin</p>
            </div>
            <div className='price'>
              <p onClick={sortByPrice}>
                Price
                {sortedByPrice ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
              </p>
            </div>
            <div className='percentage'>
              <p onClick={sortByPercentage}>
                24h
                {sortedByPercentage ? (
                  <TiArrowSortedDown />
                ) : (
                  <TiArrowSortedUp />
                )}
              </p>
            </div>
            <div className='hide-mobile volume'>
              <p>Volume</p>
            </div>
            <div className='hide-mobile cap'>
              <p>Mcap</p>
            </div>
          </div>
          {currentPost.map((coin) => {
            return (
              <Link to={`${coin.id}`} element={<Coin />} key={coin.id}>
                <CoinItem coin={coin} error={error} />
              </Link>
            );
          })}
          <Pagination
            totalPosts={coins.length}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <>{error ? <p>{error}</p> : <Loader />}</>
      )}
    </>
  );
};

export default Coins;
