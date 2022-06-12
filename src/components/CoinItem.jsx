import React from 'react';

//style
import './CoinItem.scss'

const CoinItem = ({coins}) => {
    return (
        <div className='coin-row'>
            <p>{coins.market_cap_rank}</p>
            <p className='img-symbol'>
                <img src={coins.image} alt=''/>
                <span>{coins.symbol.toUpperCase()}</span>
            </p>
            <p>${coins.current_price.toLocaleString()}</p>
            <p>{coins.market_cap_change_percentage_24h.toFixed(2)}%</p>
            <p className='hide-mobile'>${coins.total_volume.toLocaleString()}</p>
            <p className='hide-mobile'>${coins.market_cap.toLocaleString()}</p>
        </div>
    );
}

export default CoinItem;
