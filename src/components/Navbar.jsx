import React from 'react';
import {FaCoins} from 'react-icons/fa';
import {Link} from 'react-router-dom';

//style
import './Navbar.scss'

const Navbar = () => {

    
    return (

        <div className='navbar'>
            <Link to='/'>
                <h1><FaCoins className='icon'/>
                    Coin
                    <span>Search</span>
                </h1>
            </Link>

            {/* !!! IMPORTANT !!! */}

            {/* complete 'search functionality' in the future*/}

            {/* <form className='search' >
                <input 
                id='name'
                type="text" 
                placeholder='Coin name..' 
                />
            </form> */}
        </div>

    );
}

export default Navbar;
