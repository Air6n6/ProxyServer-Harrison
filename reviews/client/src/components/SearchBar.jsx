import React from 'react';
import styled from 'styled-components';

const SearchContainer =styled.div`
display: flex;
justify-content: flex-end;
`;





const SearchBar = (props) => {
  return (
    <SearchContainer>
      <form onSubmit={props.handleSubmit}>
        <label>
          <input type='text' name='name' placeholder='Search reviews' value={props.value} onChange={props.handleChange}/>
        </label>
        <input type='submit' value='Submit'/>
    </form>
    </SearchContainer>
  )
}

export default SearchBar;