import React from 'react';
import CardStack from './components/CardStack';
import './App.css';

function App() {
  // Token stack data with realistic crypto prices
  const tokenStack = [
    { id: 1, name: "SHIB", price: "$0.00001399", change: "+3.53%" },
    { id: 2, name: "DOGE", price: "$0.08234", change: "+5.21%" },
    { id: 3, name: "PEPE", price: "$0.00000123", change: "+150.45%" },
    { id: 4, name: "BTC", price: "$43,250.67", change: "+2.18%" },
    { id: 5, name: "ETH", price: "$2,650.89", change: "+8.52%" },
    { id: 6, name: "ADA", price: "$0.4567", change: "-1.23%" },
    { id: 7, name: "SOL", price: "$98.45", change: "+12.34%" }
  ];

  const handleSwipe = (token, direction) => {
    console.log(`Card ${token.name} swiped ${direction}`);
    // You can add more logic here for different swipe actions
  };

  return (
    <div className="app">
      <div className="card-container">
        <CardStack 
          tokens={tokenStack} 
          onSwipe={handleSwipe}
        />
      </div>
    </div>
  );
}

export default App;
