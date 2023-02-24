import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Dummy data
  const data = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Alice', age: 35 },
  ];

  // Function to handle search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <div>{item.name} - {item.age}</div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}

export default Search;

