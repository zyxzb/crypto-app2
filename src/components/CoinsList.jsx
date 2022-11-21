import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Coin from './pages/Coin';
import CoinItem from './CoinItem';
import Loader from './loader/Loader'
import Pagination from './pagination/Pagination';

//style
import './CoinsList.scss'

const Coins = ({coins, error}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(50);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostindex = lastPostIndex - postsPerPage;
    const currentPost = coins.slice(firstPostindex, lastPostIndex);
    return (
        <>
        {coins.length > 0 ? (
            <div className='container'>
                <div className='heading'>
                    <p className='rank'>#</p>
                    <p className='symbol'>Coin</p>
                    <p className='price'>Price</p>
                    <p className='percentage'>24h</p>
                    <p className='hide-mobile volume'>Volume</p>
                    <p className='hide-mobile cap'>Mcap</p>
                </div>
                {currentPost.map((coin) => {
                    return (
                    <Link 
                        to={`${coin.id}`} 
                        element={<Coin/>} 
                        key={coin.id}>
                        <CoinItem coin={coin} error={error}/>
                    </Link>
                    )
                })}
                <Pagination
                    totalPosts={coins.length} 
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage} 
                />
            </div>
        ) : (
            <>
                {error ? <p>{error}</p> : <Loader />}
            </>
        )}
        </>
    );
}


export default Coins;
