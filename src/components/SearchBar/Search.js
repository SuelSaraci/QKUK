import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.css";

const testData = [
  { name: "John", age: 25 },
  { name: "Jane", age: 32 },
  { name: "Bob", age: 45 },
  { name: "Sara", age: 18 },
  { name: "John", age: 25 },
  { name: "Jane", age: 32 },
  { name: "Bob", age: 45 },
  { name: "Sara", age: 18 },
  { name: "John", age: 25 },
  { name: "Jane", age: 32 },
  { name: "Bob", age: 45 },
  { name: "Sara", age: 18 },
];

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const filteredResults = testData.filter((data) =>
      data.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <div className="search-container">
      <div className="search-icon-input-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={handleSearch}
          value={searchValue}
        />
        <FontAwesomeIcon className="search-icon" icon="fa-search" />
      </div>
      {searchValue.length > 0 ? (
        <div>
          {results.length > 0 ? (
            <div className="results-container">
              {results.map((result, index) => (
                <div className="result" key={index}>
                  <p>Name: {result.name}</p>
                  <p>Age: {result.age}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No Results Found</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
