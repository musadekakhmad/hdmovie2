"use client";
import React, { useState, useRef } from 'react';
// Removed to avoid import error
// import Link from 'next/link';

const Header = () => {
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);
  // Add state for search input
  const [searchQuery, setSearchQuery] = useState('');

  const moviesTimeoutRef = useRef(null);
  const tvShowsTimeoutRef = useRef(null);

  const handleMoviesEnter = () => {
    clearTimeout(moviesTimeoutRef.current);
    setIsMoviesDropdownOpen(true);
  };
  const handleMoviesLeave = () => {
    moviesTimeoutRef.current = setTimeout(() => {
      setIsMoviesDropdownOpen(false);
    }, 200);
  };

  const handleTvShowsEnter = () => {
    clearTimeout(tvShowsTimeoutRef.current);
    setIsTvShowsDropdownOpen(true);
  };
  const handleTvShowsLeave = () => {
    tvShowsTimeoutRef.current = setTimeout(() => {
      setIsTvShowsDropdownOpen(false);
    }, 200);
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Redirect the user to the search page with the query in the URL path
      window.location.href = `/search/${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <style>
        {`
        /* CSS for rainbow effect */
        .rainbow-text-header {
            background: linear-gradient(to right, #ffffff, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.5s ease-in-out;
        }

        .rainbow-text-header:hover {
            background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .glow-on-hover {
            transition: all 0.3s ease;
            box-shadow: 0 0 5px #ff7f00, 0 0 10px #ff7f00, 0 0 15px #ff7f00;
        }

        .dropdown-menu {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
      <header className="sticky top-0 z-50 p-4 bg-gray-800 backdrop-blur-md bg-opacity-70 shadow-lg font-sans rounded-b-2xl shadow-2xl">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="text-xl md:text-4xl font-extrabold rainbow-text-header">Estreno Ya</a>
          </div>

          {/* Navigation Menu (Dropdowns) */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            <div className="relative" onMouseEnter={handleMoviesEnter} onMouseLeave={handleMoviesLeave}>
              <button className="text-white px-2 py-0.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center" aria-haspopup="true" aria-expanded={isMoviesDropdownOpen}>
                Movies
                <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMoviesDropdownOpen && (
                <div role="menu" className="dropdown-menu absolute top-full left-0 transition-all duration-300 bg-gray-700 text-white rounded-lg shadow-lg mt-2 py-2 z-10 w-48">
                  {/* Using <a> tags to avoid import issues */}
                  <a href="/movie/category/popular" className="block w-full text-left px-4 py-2 hover:bg-green-600">Popular</a>
                  <a href="/movie/category/now_playing" className="block w-full text-left px-4 py-2 hover:bg-green-600">Now Playing</a>
                  <a href="/movie/category/upcoming" className="block w-full text-left px-4 py-2 hover:bg-green-600">Upcoming</a>
                  <a href="/movie/category/top_rated" className="block w-full text-left px-4 py-2 hover:bg-green-600">Top Rated</a>
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={handleTvShowsEnter} onMouseLeave={handleTvShowsLeave}>
              <button className="text-white px-2 py-0.5 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center" aria-haspopup="true" aria-expanded={isTvShowsDropdownOpen}>
                TV Shows
                <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTvShowsDropdownOpen && (
                <div role="menu" className="dropdown-menu absolute top-full left-0 transition-all duration-300 bg-gray-700 text-white rounded-lg shadow-lg mt-2 py-2 z-10 w-48">
                  {/* Using <a> tags to avoid import issues */}
                  <a href="/tv/category/popular" className="block w-full text-left px-4 py-2 hover:bg-green-600">Popular</a>
                  <a href="/tv/category/airing_today" className="block w-full text-left px-4 py-2 hover:bg-green-600">Airing Today</a>
                  <a href="/tv/category/on_the_air" className="block w-full text-left px-4 py-2 hover:bg-green-600">On TV</a>
                  <a href="/tv/category/top_rated" className="block w-full text-left px-4 py-2 hover:bg-green-600">Top Rated</a>
                </div>
              )}
            </div>
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for movies or TV shows..."
                className="bg-gray-700 text-white rounded-full py-1 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-300 w-40 sm:w-auto"
              />
              <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
