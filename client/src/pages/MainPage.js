// import React, { useState, useEffect } from "react";
// import RecipeCard from "./components/recipeCard";
// // import SearchComponent from "./SearchComponent";
// import { useQuery, gql } from "@apollo/client";
// import Modal from "./components/modal";

import { AuthContext } from "../context/authContext";
import { useContext } from "react";

// const RECIPES_QUERY = gql`
//   query Query($page: Int, $perPage: Int) {
//     findAllRecipes(page: $page, perPage: $perPage) {
//       ingredients
//       description
//       authors
//       title
//     }
//   }
// `;
// const AUTOCOMPLETE_RECIPES_QUERY = gql`
//   query Autocomplete($searchTerm: String) {
//     autocompleteRecipes(searchTerm: $searchTerm) {
//       title
//       description
//       authors
//       ingredients
//     }
//   }
// `;

function MainPage() {

  const { user } = useContext(AuthContext);

  // const perPage = 5; // Number of recipes per page
  // const [page, setPage] = useState(1); // Current page number

  // const [searchParams, setSearchParams] = useState(""); // Add state for searchParams (the string the user is searching for)

  // const { loading, error, data, fetchMore } = useQuery(RECIPES_QUERY, {
  //   variables: { page, perPage },
  // });

  // const [cards, setCards] = useState([]);
  // const [selectedCard, setSelectedCard] = useState(null);
  // const [isEmptySearch, setIsEmptySearch] = useState(false); // track empty search

  // useEffect(() => {
  //   if (!loading && !error) {
  //     setCards(data?.findAllRecipes || []);
  //   }
  // }, [data, loading, error]);

  // useEffect(() => {
  //   if (isEmptySearch) {
  //     // Set a timeout to remove the message after 5 seconds
  //     const timeoutId = setTimeout(() => {
  //       setIsEmptySearch(false);
  //     }, 5000);

  //     // Clear the timeout if the component is unmounted before 5 seconds
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isEmptySearch]);

  // const shiftDisplay = (direction) => {
  //   let nextPage;

  //   if (direction === "next") {
  //     nextPage = page + 1;
  //   } else if (direction === "prev") {
  //     // Ensure that the minimum value for page is 1
  //     nextPage = Math.max(page - 1, 1);
  //   } else {
  //     return; // Do nothing if an invalid direction is provided
  //   }
  //   setPage(nextPage);

  //   fetchMore({
  //     variables: { page: nextPage, perPage },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;

  //       const newRecipes = fetchMoreResult.findAllRecipes;
  //       if (newRecipes.length < perPage) {
  //         setPage(1); // Reset to the first page if the number of fetched recipes is less than perPage
  //       }

  //       return {
  //         findAllRecipes: newRecipes,
  //       };
  //     },
  //   });
  // };

  // const handleCardClick = (card) => {
  //   setSelectedCard(card);
  // };

  // const closeModal = () => {
  //   setSelectedCard(null);
  // };


  return (
    <>
      <h1>MainPage</h1>
      {/* <div style={{ display: "flex" }}> */}

      {/* If user is logged in, show welcome message with email, else show welcome message */}
            {user ?
                <>
                    <h2>Welcome {user.email}</h2>
                </>
                :
                <>
                    <h2>Welcome!</h2>
                    <h4>Please log in or register!</h4>
                </>
            }

        {/* {/* <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          {/* The cards */}
          {/* <div style={{ position: "absolute", zIndex: "0" }}>
            {cards.slice(0, perPage).map((card) => (
              <RecipeCard
                key={card._id}
                card={card}
                onClick={() => handleCardClick(card)}
              />
            ))}
            {isEmptySearch && (
              <h1>
                id="noResultsMessage"
                style={{
                  color: "red",
                  position: "absolute",
                  left: "50%",
                  right: "-50%",
                  top: "20%",
                  bottom: "-50%",
                  backgroundColor: "#000000e0",
                  overflow: "hidden",
                  marginBottom: "135vh",
                  marginLeft: "25%",
                  marginRight: "25%",
                  paddingTop: "2.3vh",
                }}
              
                No results found.
              </h1>
            )}
            <div style={{ marginBottom: "3vh", marginTop: "-2vh" }}>
              <button
                onClick={() => shiftDisplay("prev")}
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
                }}
              >
                ←
              </button>
              {cards.length > 0 && cards.length % perPage === 0 && (
                <button
                  onClick={() => shiftDisplay("next")}
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
                  }}
                >
                  →
                </button>
              )}
            </div>
            <div style={{ marginBottom: "-15px" }}></div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <div style={{ marginTop: "12vh" }}> */}
            {/* <SearchComponent
              onSearch={handleSearch}
              onAutocompleteItemClick={handleAutocompleteItemClick}
              style={{ display: "flex", flexDirection: "row" }}
            /> */}
          {/* </div>
          {/* The Modal */}
          {/* {selectedCard && (
            <div
              style={{ marginTop: "13vh", display: "flex", flexDirection: "row" }}
            >
              <Modal selectedCard={selectedCard} closeModal={closeModal} />
            </div>
          )}
        </div> */}
      {/* </div> */}
    </>
  );
};

export default MainPage;
