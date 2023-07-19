import React, { useState, useEffect } from "react";
import recipesData from "../recipes.json";
import RecipeCard from "./recipeCard";
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

  return (
    <div style={{ display: "flex" }}>
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
            backgroundColor: "rgb(255 255 255 / 5%)",
            marginTop: "-19px",
            // marginRight: "-19px",
          }}
        >
          More
        </button>
        <div style={{ marginBottom: "-15px" }}> </div>
      </div>

      {/* The Modal */}
      {selectedCard && (
        <div style={{ zIndex: "3", marginLeft: "60vw", marginTop: "25vh" }}>
          <Modal selectedCard={selectedCard} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
