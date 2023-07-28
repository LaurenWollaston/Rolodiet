import React from "react";

function RecipeCard ({ card, onClick }) {
  const truncatedName = card.title.length > 35 ? `${card.title.slice(0, 35)}...` : card.title;
  const truncatedText = card.description.length > 145 ? `${card.description.slice(0, 145)}...` : card.description;
  return (
    <div
      style={{
        margin: "50px",
        padding: "0px",
        paddingLeft: "5px",
        cursor: "pointer",
        textAlign: "left",
        backgroundColor: "rgba(33, 33, 33, 0.78)",
        width: "40vw",
      }}
      class="recipeCard"
      onClick={onClick}
    >
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "-20px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: "15px",
            backgroundColor: "rgb(14 14 14 / 84%)",
            marginLeft: "-5px",
            verticalAlign: "middle",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <h2
              style={{
                color: "white",
                marginTop: "5px",
                display: "flex",
                flexDirection: "row",
                fontSize: "40px",
                marginBottom: "0",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              class="cardTitle"
            >
              {truncatedName}
            </h2>
            <p
              class="recipeierInfo"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "-10px",
                marginBottom: "4px",
                textAlign: "right",
                justifyContent: "right",
                marginRight: "10px",
                color:'rgb(187 187 187)'
              }}
            >
                by <span style={{ color: "#e3e38f" }}>{card.authors}</span>
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "700",
              marginTop: "5px",
              color:'rgb(187 187 187)',
              textAlign:'center',
              marginLeft:'0px',
              marginRight:'10px'
            }}
          >
            {card.ingredients} -
          </p>
        </div>
        <hr style={{width:"85%",borderRadius:"25px",border:'2px dotted white',marginTop:'-5px'}}></hr>
        <div style={{display:'flex',flexDirection:'row',margin:"15px",marginTop:'0px',color:"white"}}>{truncatedText}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
