import React  from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import Coin from './Coin'

function App() {
  // các get lấy Api
  const [coins, setcoins] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    Axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setcoins(res.data);
       
      })
      .catch(error => console.log(error))
  },[]);

  const handleChange = e => {
    setSearch(e.target.value)  
  }
  
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency </h1>
        <form>
          <input 
            type="text" 
            placeholder='Search' 
            className='coin-input' 
            onChange={handleChange}
          />
        </form>
      </div> 
    <div className="test">
      {filteredCoins.map(coin => {
        return(
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            volume={coin.market_cap}
            image={coin.image}
            pricechange={coin.price_change_percentage_24h}
            marketcap={coin.total_volume}
          />
        )
      })} 
    </div>
     
    </div>
  );
}

export default App;
