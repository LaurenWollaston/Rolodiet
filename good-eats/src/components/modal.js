import React from "react";

const Modal = ({ selectedCard, closeModal }) => {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "20px",
          backgroundColor: "#fff",
          maxWidth: "400px",
        }}
      >
        <h2>{selectedCard.name}</h2>
        <p style={{marginTop:"-12px",marginBottom:"-20px"}}>by</p>
        <h4>{selectedCard.author}</h4>
        <p>{selectedCard.ingredients}</p>
        <p>{selectedCard.text}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;