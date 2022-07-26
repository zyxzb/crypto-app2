import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import Coin from "./components/routes/Coin";
import Coins from "./components/Coins";


function App() {

  const[coins, setCoins]=useState([]);

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'

  useEffect(()=> {

    axios.get(url).then((response) => {

      setCoins(response.data)
      console.log(response.data);

    }).catch((error) => {
      console.log("error", error);
    });

  },[])

    
  return (
    <>
    <Navbar coins={coins} />
    <Routes>
    {/* /crypto-app2/ add for hihhubpages */}
      <Route path="/crypto-app2" element={<Coins coins={coins}/>}/>
      <Route path="/coin" element={<Coin/>}>
        <Route path=":coinId" element={<Coin/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
