import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  height: 35px;
`;
const SubmitButton = styled.button`
  background-color: #e5bc04;
  border-radius: 0 4px 4px 0;
  color: black;
  font-weight: 600;
  height: 35px;
  margin: -4px;
  padding: 0.5rem;
`;

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            value={value}
            onChange={handleChange}
            placeholder='Search image'
          />
          <div style={{ marginLeft: '0.25rem' }}>
            <SubmitButton className='button2' type='submit'>
              Search
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
