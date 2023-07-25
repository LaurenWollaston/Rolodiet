import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import searchIcon from "../images/search.svg";

const size = "10px";

const AUTOCOMPLETE_RECIPES_QUERY = gql`
  query AutocompleteRecipes($searchTerm: String!) {
    autocompleteRecipes(searchTerm: $searchTerm) {
      title
      recipeId
    }
  }
`;

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [getAutocompleteRecipes, { loading, data }] = useLazyQuery(
    AUTOCOMPLETE_RECIPES_QUERY
  );

  console.log("searchTerm:", searchTerm);
  console.log("loading:", loading);
  console.log("data:", data);
  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    // Fetch autocomplete suggestions as the user types
    getAutocompleteRecipes({
      variables: { searchTerm: newSearchTerm },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    onSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "inline-flex", width: "90%" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(0 0 0 / 82%)",
            border: "3px solid #4f4f4fb8",
            borderRadius: "15px",
            width: "90%",
            height: "2vh",
            color: "white",
          }}
        />
        <button
          type="submit"
          style={{
            position: "absolute",
            right: "6.3vw",
            backgroundColor: "rgb(0 0 0 / 52%)",
            borderRadius: "30px",
            border: "3px solid #8181813d",
            color: "white",
            height: "27px",
            width: "27px",
            marginTop: "0.00vh",
            overflow: "hidden",
          }}
        >
          <img src={searchIcon} alt="search button" width={size} height={size} />
        </button>
      </form>
      {/* Display autocomplete suggestions */}
      {loading && <p>Loading...</p>}
      {data && data.autocompleteRecipes && data.autocompleteRecipes.length > 0 && (
        <div>
          <p>Autocomplete Suggestions:</p>
          <ul>
            {data.autocompleteRecipes.map((recipe) => (
              <li key={recipe.recipeId}>{recipe.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
