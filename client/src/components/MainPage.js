import React, { useState, useEffect } from "react";
import RecipeCard from "./recipeCard";
import SearchComponent from "./SearchComponent";
import { useQuery, gql } from "@apollo/client";
import Modal from "./modal";

const RECIPES_QUERY = gql`
  query Query($page: Int, $perPage: Int) {
    findAllRecipes(page: $page, perPage: $perPage) {
      ingredients
      description
      authors
      title
    }
  }
`;
const AUTOCOMPLETE_RECIPES_QUERY = gql`
  query SearchRecipes($page: Int, $perPage: Int, $searchTerm: String) {
    searchRecipes(page: $page, perPage: $perPage, searchTerm: $searchTerm) {

      authors
      title
    }
  }
`;


const MainPage = () => {
  const perPage = 5; // Number of recipes per page
  const [page, setPage] = useState(1); // Current page number

  const { loading, error, data, fetchMore } = useQuery(RECIPES_QUERY, {
    variables: { page, perPage },
  });
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (!loading && !error) {
      // When data is fetched, update the state
      setCards(data?.findAllRecipes || []);
    }
  }, [data, loading, error]);

  const shiftDisplay = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  
    fetchMore({
      variables: { page: nextPage, perPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
  
        const newRecipes = fetchMoreResult.findAllRecipes;
        if (newRecipes.length < perPage) {
          setPage(1); // Reset to the first page if the number of fetched recipes is less than perPage
        }
  
        return {
          findAllRecipes: newRecipes,
        };
      },
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleSearch = (searchTerm) => {
    // The code for searching goes here. I just have the searchbar itself done it's not hooked to for anything yet. 
    console.log("Search Term:", searchTerm);
  };
  return (
  <div style={{ display: "flex" }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
      {/* The cards */}
      <div style={{ position: "absolute", zIndex: "0" }}>
      {cards.slice(0, perPage).map((card) => (
        <RecipeCard
          key={card.recipeId}
          card={card}
          onClick={() => handleCardClick(card)}
        />
      ))}
      {cards.length === 0 && <p>No recipes found.</p>}
      <div style={{marginBottom:'3vh',marginTop:'-2vh'}}>
      <button
  onClick={() => setPage(page - 1)}
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
  ←
</button>
      {cards.length > 0 && cards.length % perPage === 0 && (
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
          →
        </button>
      )}</div>
      <div style={{ marginBottom: "-15px" }}> </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
      <div style={{ marginTop: '12vh' }}>
        <SearchComponent onSearch={handleSearch} style={{ display: 'flex', flexDirection: 'row' }} />
      </div>
      {/* The Modal */}
      {selectedCard && (
        <div style={{ marginTop: "13vh", display: 'flex', flexDirection: 'row' }}>
          <Modal selectedCard={selectedCard} closeModal={closeModal} />
        </div>
      )}
    </div>
  </div>
);
};

export default MainPage;
