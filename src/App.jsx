import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Coin from "./components/pages/Coin";
import CoinsList from "./components/CoinsList";
import {BrowserRouter} from 'react-router-dom';

function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState('');
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'

  useEffect(()=> {
    getAllCrypto()
  },[])

  const getAllCrypto = async () => {
    try {
      const response = await axios.get(url)
      setCoins(response.data)
    } catch(err){
      setError(`${err}`)
    }
  }

  return (
    <>
    <BrowserRouter>
      <Navbar coins={coins}/>
      <Routes>
        <Route path="/" index element={<CoinsList coins={coins} error={error} setCoins={setCoins}/>}/>
        <Route path=":coinId" element={<Coin/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
