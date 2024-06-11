"use client";
import React, { useState } from "react";
import "./app.css";
const GeoapifyAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (value) => {
    const apiKey = "1ca2930e08584a7fa5359a43e7079041";
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      value
    )}&apiKey=${apiKey}`;

    try {
      const res = await fetch(url);
      const response = await res.json();
      setSuggestions(response.data.features);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a place"
        className="autocomplete-input"
      />
      {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.properties.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="autocomplete-suggestion"
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeoapifyAutocomplete;
