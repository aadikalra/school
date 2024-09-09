import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Input = ({ onAddressSelection }) => { // Accept the callback as a prop
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // New state to store selected address

  // Fetch suggestions on every query change
  useEffect(() => {
    if (query.length > 2) {
      axios.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => console.error(error));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name);
    setResults([]); // Clear suggestions on selection
    setSelectedAddress(suggestion.display_name); // Set selected address
    onAddressSelection(suggestion.display_name); // Notify parent about the selected address
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedAddress) {
      // Pass the selected address to the parent component (HomePage)
      console.log("Selected address:", selectedAddress); // You can replace this with sending the address to HomePage through props
      onAddressSelection(selectedAddress); // Notify parent about the selected address
    } else {
      console.error("No address selected");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='w-1/2'>
        <label className="input input-bordered flex items-center gap-2 -mt-7 w-full relative">
          <input
            type="text"
            className="grow"
            placeholder="Report an address"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit">
            <i className="fa-solid fa-recycle text-transparent bg-clip-text bg-gradient-to-tr from-[#77d95b] to-[#1e803f]"></i>
          </button>
          {results.length > 0 && (
            <ul className="absolute left-0 w-full bg-base-100 border border-gray-300 rounded-b-lg shadow-lg overflow-y-auto max-h-40 top-full">
              {results.map(result => (
                <li key={result.osm_id} className="hover:bg-indigo-100 dark:hover:bg-indigo-900 px-4 py-2 cursor-pointer">
                  <button onClick={() => handleSuggestionClick(result)} className="text-left w-full">
                    {result.display_name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>
      </form>
    </>
  );
};

export default Input;