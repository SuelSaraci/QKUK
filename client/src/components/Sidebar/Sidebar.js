import React, { useState, useEffect } from "react";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";

function Sidebar({ onSearchResultClick }) {
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

  const handleCardClick = (name) => {
    const url = `http://localhost:3300/clinics/${name}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        onSearchResultClick(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="logo" />
      <ul className="workouts">
        <form className="form ">
          <div className="form__row">
            <div className="search-container">
              <div className="search-icon-input-container">
                <input
                  type="text"
                  placeholder="Kerko kliniken..."
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
                        <div
                          className="result"
                          key={index}
                          onClick={() => handleCardClick(result.name)}
                        >
                          <h4>Klinika: {result.name}</h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: result.image_url,
                            }}
                            style={{
                              width: "40px",
                              height: "40px",
                              fill: "white",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-results">No Results Found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <button className="form__btn">OK</button>
        </form>
      </ul>
      <p className="copyright">
        © Copyright by{" "}
        <a
          className="twitter-link"
          href="https://www.linkedin.com/in/suel-s-a37624171/"
        >
          Suel Saraçi
        </a>{" "}
        and{" "}
        <a
          className="twitter-link"
          href="https://www.linkedin.com/in/berat-ademi1/"
        >
          Berat Ademi
        </a>
      </p>
    </div>
  );
}

export default Sidebar;
