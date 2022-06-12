import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import Coin from './routes/Coin';
import CoinItem from './CoinItem';
import ReactPaginate from 'react-paginate';

//style
import './Coins.scss'

const Coins = ({coins}) => {


    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 50;

    useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    
    setCurrentItems(coins.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(coins.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, coins]);

    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % coins.length;
   
    setItemOffset(newOffset);

 };

    return (
        <div className='container'>
            <div className='heading'>
                <p>#</p>
                <p className='coin-name'>Coin</p>
                <p>Price</p>
                <p>24h</p>
                <p className='hide-mobile'>Volume</p>
                <p className='hide-mobile'>Mcap</p>
            </div>
            {currentItems.map((coin) => {
                return (
                 <Link 
                 to={`/coin/${coin.id}`} 
                 element={<Coin/>} 
                 key={coin.id}>
                    <CoinItem coins={coin} />
                </Link>
                )
            })}
            <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< "
                renderOnZeroPageCount={null}
                activeLinkClassName ='active'
            />
        </div>
    );
}


export default Coins;
