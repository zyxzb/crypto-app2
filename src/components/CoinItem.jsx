import React from 'react';
//style
import './CoinItem.scss'

const CoinItem = ({coin}) => {

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='coin-row'>
            <p className='rank'>{coin.market_cap_rank}</p>
            <p className='img-symbol'>
                <img src={coin.image} alt='coin_image'/>
                <span>{coin.symbol.toUpperCase()}</span>
            </p>
            <p className='price'>${coin.current_price.toFixed(2)}</p>
            <p className={`${coin.market_cap_change_percentage_24h <= 0 ? `red percentage` : 'green percentage'}`}>{coin.market_cap_change_percentage_24h.toFixed(2)}%</p>
            <p className='hide-mobile volume'>${numberWithCommas(coin.total_volume)}</p>
            <p className='hide-mobile cap'>${numberWithCommas(coin.market_cap)}</p>
        </div>
    );
}

export default CoinItem;
