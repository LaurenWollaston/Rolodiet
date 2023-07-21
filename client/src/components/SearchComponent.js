import React, { useState } from 'react';
import searchIcon from '../images/search.svg';
const size='10px';

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
    <form onSubmit={handleSubmit} style={{display:'inline-flex',width:'90%'}}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        style={{
            backgroundColor:'rgb(0 0 0 / 82%)',
            border:'3px solid #4f4f4fb8',
            borderRadius:'15px',
            width:'90%',
            height:'2vh',
            color:'white'
        }}
      />
      <button type="submit"style={{position: 'absolute',right: '6.3vw', backgroundColor:'rgb(0 0 0 / 52%)',borderRadius:'30px',border:'3px solid #8181813d',color:'white',height:'27px',width:'27px',marginTop:'0.00vh', overflow:'hidden'}}><img src={searchIcon} alt='search button' width={size} height={size}/></button>
    </form>
    </div>
  );
};

export default SearchComponent;
