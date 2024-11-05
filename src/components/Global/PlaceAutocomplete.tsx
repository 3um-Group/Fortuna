import React from 'react';
import Autosuggest from 'react-autosuggest';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface PlaceAutocompleteProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Location[];
  setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>;
  onLocationSelected: () => void;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  onLocationSelected,
}) => {
  const fetchSuggestions = async (value: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
    );
    const results = await response.json();
    setSuggestions(results);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Location) => suggestion.display_name;

  const renderSuggestion = (suggestion: Location) => (
    <div className="p-2 hover:bg-gray-200">{suggestion.display_name}</div>
  );

  const onSuggestionSelected = (event: React.FormEvent, { suggestion }: { suggestion: Location }) => {
    setQuery(suggestion.display_name);
    onLocationSelected();
  };

  return (
    <div className="w-full max-w-md mx-auto my-10">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Search for a location...',
          value: query,
          onChange: (_, { newValue }) => setQuery(newValue),
          className: 'w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200',
        }}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};

export default PlaceAutocomplete;
