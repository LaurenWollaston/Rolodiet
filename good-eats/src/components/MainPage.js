import React, { useState, useEffect } from 'react';
import recipesData from '../recipes.json';

const fetchDataFromDatabase = () => {
  // Simulate the GraphQL mutation by returning a Promise with the recipes data
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(recipesData);
    }, 1000);
  });
};

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Fetch data from the database on component mount
    fetchDataFromDatabase().then(data => setCards(data));
  }, []);

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        {cards.map(card => (
          <div
            key={card.name}
            style={{
              border: '1px solid #000000',
              borderRadius: '4px',
              margin: '10px',
              padding: '0px',
              paddingLeft:'5px',
              cursor: 'pointer',
              textAlign: 'left',
              backgroundColor:'#282929'
            }}
            onClick={() => handleCardClick(card)}
          ><div style={{display: 'inline-flex'}}>
            <h3>{card.name}</h3>   
            <p style={{
                fontSize:'14px',
                fontWeight:'700',
                marginTop:'23px'
            }}>By {card.author}</p></div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div
          style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '20px',
              backgroundColor: '#fff',
              maxWidth: '400px',
            }}
          >
            <h2>{selectedCard.name}</h2>
            <p>{selectedCard.recipeText}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
