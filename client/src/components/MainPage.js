import React, { useState, useEffect } from "react";
import recipesData from "../recipes.json";
import RecipeCard from "./recipeCard";
import SearchComponent from "./SearchComponent";
import Modal from "./modal";

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [displayIndex1, shiftDisplayIndex1] = useState(0);
  const [displayIndex2, shiftDisplayIndex2] = useState(5);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setCards(recipesData);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };
  const shiftDisplay = () => {
    if (displayIndex2 < recipesData.length) {
      shiftDisplayIndex1((prevIndex) => prevIndex + 5);
      shiftDisplayIndex2((prevIndex) => prevIndex + 5);
    } else if (
      displayIndex1 < recipesData.length - 5 &&
      displayIndex2 > recipesData.length - 5
    ) {
      shiftDisplayIndex1((prevIndex) => prevIndex + 5);
      shiftDisplayIndex2(recipesData.length);
    } else {
      shiftDisplayIndex1(0);
      shiftDisplayIndex2(5);
    }
  };
  const handleSearch = (searchTerm) => {
    // The code for searching goes here. I just have the searchbar itself done it's not hooked to for anything yet. 
    console.log("Search Term:", searchTerm);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
      {/* The cards */}

      <div style={{ position: "absolute", zIndex: "0" }}>
        {cards.slice(displayIndex1, displayIndex2).map((card) => (
          <RecipeCard
            key={card.name}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
        <button
          onClick={shiftDisplay}
          style={{
            fontSize: "25px",
            fontWeight: "700",
            width: "70px",
            height: "30px",
            alignSelf: "end",
            color: "rgb(244 239 82)",
            border: "none",
            backgroundColor: "rgb(0 0 0 / 67%)",
            marginTop: "-19px",
            // marginRight: "-19px",
          }}
        >
          More
        </button>
        <div style={{ marginBottom: "-15px" }}> </div>
      </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
        <div style={{marginTop:'12vh'}}><SearchComponent onSearch={handleSearch} style={{display:'flex',flexDirection:'row'}} /></div>
        {/* The Modal */}
        {selectedCard && (
          <div style={{ marginTop: "13vh",display:'flex',flexDirection:'row' }}>
            <Modal selectedCard={selectedCard} closeModal={closeModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
