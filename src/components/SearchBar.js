import React, { useState, useEffect, useRef } from "react";
import { fetchCitySuggestions } from "../utils/api";

const SearchBar = ({ onSearch, searchHistory, onHistoryClick, onClearHistory }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);

  // Fetch city suggestions with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (search.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      const results = await fetchCitySuggestions(search);
      setSuggestions(results);
      setIsLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [search]);

  const handleSearch = (city = search) => {
    if (city.trim()) {
      onSearch(city);
      setSearch("");
      setSuggestions([]);
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    const items = suggestions.length > 0 ? suggestions : searchHistory;

    if (e.key === "Enter") {
      if (activeIndex >= 0 && items[activeIndex]) {
        const selected = suggestions.length > 0
          ? suggestions[activeIndex].display
          : items[activeIndex];
        handleSearch(selected);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const handleSuggestionClick = (city) => {
    handleSearch(city.display);
  };

  const handleHistoryClick = (city) => {
    onHistoryClick(city);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    setActiveIndex(-1);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setActiveIndex(-1);
    }, 200);
  };

  const showSuggestions = showDropdown && suggestions.length > 0;
  const showHistory = showDropdown && suggestions.length === 0 && searchHistory.length > 0 && search.length === 0;

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <button className="search-button" onClick={() => handleSearch()}>
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-search"></i>
          )}
        </button>
      </div>

      {/* City Suggestions Dropdown */}
      {showSuggestions && (
        <div className="search-dropdown">
          <div className="dropdown-header">
            <i className="fas fa-map-marker-alt"></i>
            <span>Suggestions</span>
          </div>
          {suggestions.map((city, index) => (
            <div
              key={index}
              className={`dropdown-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleSuggestionClick(city)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <i className="fas fa-city"></i>
              <span>{city.display}</span>
            </div>
          ))}
        </div>
      )}

      {/* Search History Dropdown */}
      {showHistory && (
        <div className="search-dropdown">
          <div className="dropdown-header">
            <span>Recent Searches</span>
            <button className="clear-history" onClick={onClearHistory}>
              Clear
            </button>
          </div>
          {searchHistory.map((city, index) => (
            <div
              key={index}
              className={`dropdown-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleHistoryClick(city)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <i className="fas fa-history"></i>
              <span>{city}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
