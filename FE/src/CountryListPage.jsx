import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CountryListPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/available-countries');
        
        if (!response.ok) throw new Error('Error fetching countries');
        
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(term)
    );
    
    setFilteredCountries(filtered);
  };

  if (loading) return <div className="text-center p-4 text-gray-500">Loading countries...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Country List</h1>
      
      <input 
        type="text" 
        placeholder="Search countries..." 
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="bg-gray-50 rounded-lg shadow-sm">
        {filteredCountries.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No countries found</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredCountries.map((country) => (
              <li 
                key={country.alpha2Code} 
                className="px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <Link 
                  to={`/country/${country.countryCode}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {country.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CountryListPage;