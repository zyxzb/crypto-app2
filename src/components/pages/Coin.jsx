import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Loader from '../loader/Loader';

//styleS
import './Coin.scss';

const Coin = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [error, setError] = useState('');

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    getCoin();
    // eslint-disable-next-line
  }, [params]);

  const getCoin = async () => {
    try {
      const response = await axios.get(url);
      setCoin(response.data);
    } catch (err) {
      setError(`${err}`);
    }
  };

  return (
    <>
      {coin.length !== 0 ? (
        <div className='coin-container'>
          <div className='content'>
            <h1>{coin.name}</h1>
          </div>
          <div className='content'>
            <div className='rank'>
              <div className='rank-btn'>Rank #{coin.market_cap_rank}</div>
            </div>
            <div className='info'>
              <div className='coin-heading'>
                {coin.image ? <img src={coin.image.small} alt='' /> : null}
                <p>{coin.name}</p>
                {coin.symbol ? (
                  <span>({coin.symbol.toUpperCase()}/USD)</span>
                ) : null}
              </div>
              <div className='coin-price'>
                {coin.market_data ? (
                  <h2>$ {coin.market_data.current_price.usd.toFixed(2)}</h2>
                ) : null}
              </div>
            </div>
          </div>
          <div className='content'>
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1y</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {coin.market_data ? (
                    <td>
                      {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        2,
                      )}
                      %
                    </td>
                  ) : null}
                  {coin.market_data ? (
                    <td>
                      {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        2,
                      )}
                      %
                    </td>
                  ) : null}
                  {coin.market_data ? (
                    <td>
                      {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        2,
                      )}
                      %
                    </td>
                  ) : null}
                  {coin.market_data ? (
                    <td>
                      {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        2,
                      )}
                      %
                    </td>
                  ) : null}
                  {coin.market_data ? (
                    <td>
                      {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        2,
                      )}
                      %
                    </td>
                  ) : null}
                  {coin.market_data ? (
                    <td>
                      {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        2,
                      )}
                      %
                    </td>
                  ) : null}
                </tr>
              </tbody>
            </table>
          </div>
          <div className='content'>
            <div className='stats'>
              <div className='left'>
                <div className='row'>
                  <h3>24h Low</h3>
                  <p>
                    {coin.market_data
                      ? `$${coin.market_data.low_24h.usd.toFixed(3)}`
                      : null}
                  </p>
                </div>
                <div className='row'>
                  <h3>24h High</h3>
                  <p>
                    {coin.market_data
                      ? `$${coin.market_data.high_24h.usd.toFixed(3)}`
                      : null}
                  </p>
                </div>
              </div>
              <div className='right'>
                <div className='row'>
                  <h3>M.Cap</h3>
                  <p>
                    {coin.market_data
                      ? `$${coin.market_data.market_cap.usd.toLocaleString()}`
                      : null}
                  </p>
                </div>
                <div className='row'>
                  <h3>C. Supply</h3>
                  <p>
                    {coin.market_data
                      ? coin.market_data.circulating_supply.toLocaleString()
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='about'>
              <h3>About</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    coin.description ? coin.description.en : 'Error',
                  ),
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>{error ? <h2>{error}</h2> : <Loader />}</>
      )}
    </>
  );
};

export default Coin;
