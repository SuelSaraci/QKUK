import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.css";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3300/clinics")
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setAllResults(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchValue(query);

    if (query.length > 0) {
      const filteredResults = allResults.filter((result) =>
        result.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults(allResults);
    }
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
      {searchValue.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchInput;
