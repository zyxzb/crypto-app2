import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {FaCoins} from 'react-icons/fa';

//style
import './Navbar.scss'

const Navbar = ({coins}) => {
    const [searched, setSearched] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    console.log(isInputFocused);

    const coinsArray = [...coins]

    const findMatches = (name, coinsArray) => {
        return coinsArray.filter(coin => {
            const regex = new RegExp(name, 'gi');
            return coin.name.match(regex) || coin.symbol.match(regex)
        })
    }

    const displayMatches = (e) => {
        const matchArray = findMatches(e.target.value, coinsArray);
        setSearched(matchArray)
    }
    useEffect(() => {
        window.addEventListener('click', (e) => { 
            if (e.target.classList.contains('input')) {
                setIsInputFocused(true)
            } else{
                setIsInputFocused(false)
            }})
    },[])

    return (

        <div className='navbar'>
            <Link to='/'>
                <h1><FaCoins className='icon'/>
                    Coin
                    <span>Search</span>
                </h1>
            </Link>
            <form className='search' autocomplete="off">
                <input 
                    id='name'
                    className='input'
                    type="text" 
                    placeholder='Search...'
                    onChange={displayMatches} 
                    onFocus={() => setIsInputFocused(true)}
                />
                <div className={isInputFocused && searched.length !== coinsArray.length ? 'searched active' : 'searched'}>
                    {searched.length !== coinsArray.length ? (
                        <>
                            {searched.map(item => {
                                return(
                                    <ul>
                                        <li>
                                            <Link to={`/${item.id}`}
                                                key={item.id}
                                                onClick={() => setIsInputFocused(false)}
                                                >
                                                {item.name}
                                                <img src={item.image} alt="" srcset="" />
                                                
                                            </Link>
                                        </li>
                                    </ul>
                                    )
                            })}
                        </>
                    ) : null}
                </div>
            </form>
        </div>

    );
}

export default Navbar;
