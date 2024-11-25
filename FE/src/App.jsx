import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CountryListPage from "./CountryListPage.jsx";
import CountryInfoPage from "./CountryInfoPage.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white w-full overflow-x-hidden">
        <div className="flex flex-col min-h-screen w-full">
          <nav className="bg-blue-200 w-full text-white p-4">
            <div className="container mx-auto w-full flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                Country Explorer
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-blue-200">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
            <Routes>
              <Route path="/" element={<CountryListPage />} />
              <Route path="/country/:countryCode" element={<CountryInfoPage />} />
            </Routes>
          </main>

          <footer className="bg-gray-800 w-full text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Country Explorer. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
