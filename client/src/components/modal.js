import React from "react";

function Modal({ selectedCard, closeModal }) {
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
          border: "8px solid #1212128f",
          borderRadius: "4px",
          padding: "20px",
          backgroundColor: "rgb(28 28 28 / 91%)",
          maxWidth: "400px",
          display:'flex',
          flexDirection:'column',
          color:'white'
        }}
      >
        <div style={{backgroundColor:'rgb(0 0 0 / 55%)',margin:'-20px',marginBottom:'20px'}}>
        <h2 style={{display:'flex',flexDirection:'row',justifyContent:'center',color:'white'}}>{selectedCard.title}</h2>
        </div>
        <p style={{marginTop:"-12px",marginBottom:"-20px"}}>by</p>
        <h4 style={{color:'#e3e38f'}}>{selectedCard.authors}</h4>
        <p style={{color:'rgb(211 119 119)'}}>{selectedCard.ingredients}</p>
        <p style={{ whiteSpace: "pre-line" }}>{selectedCard.description}</p>
        <button onClick={closeModal} style={{fontSize:'25px',fontWeight:'700',width:'30px',height:'30px',position:'absolute',alignSelf:'end',color:'#8d437a',border:'none',backgroundColor:'rgb(255 255 255 / 4%)',marginTop:'-19px',marginRight:'-19px'}}>×</button>
      </div>
    </div>
  );
};

export default Modal;