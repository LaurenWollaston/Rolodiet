import React from 'react';

const RecipeCard = ({ card, onClick }) => (
  <div
    key={card.name}
    style={{
      margin: '50px',
      padding: '0px',
      paddingLeft: '5px',
      cursor: 'pointer',
      textAlign: 'left',
      backgroundColor: 'rgba(33, 33, 33, 0.78)',
      width:'40vw'
    }}
    onClick={onClick}
  >
    <div style={{ display: 'flex', flexDirection:'column', marginTop:'-20px' }}>
      <div style={{display: 'flex', flexDirection:'row', padding: '0', backgroundColor:'rgb(14 14 14 / 84%)', marginLeft:'-5px', verticalAlign:}}>
      <h2 style={{color:"green"}}>{card.name}</h2>
      </div><div style={{display: 'flex',flexDirection:'row'}}>
      <p
        style={{
          fontSize: '14px',
          fontWeight: '700',
          marginTop: '30px'
        }}
      >
          by <span style={{color:"yellow"}}>{card.author}</span>
      </p>
    </div>
    </div>
  </div>
);

export default RecipeCard;
