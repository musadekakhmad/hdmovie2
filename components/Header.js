"use client";
import React, { useState, useRef } from 'react';
// Removed to avoid import error
// import Link from 'next/link';

const Header = () => {
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search/${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <style>
        {`
        /* CSS for rainbow effect */
        .rainbow-text-header {
            background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.5s ease-in-out;
        }

        .rainbow-text-header:hover {
            background: linear-gradient(to right, #ffffff, #ffffff);
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
      <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-50 rounded-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
          {/* Logo atau Nama Situs */}
          <div className="flex items-center">
            {/* Mengubah tautan href ke halaman utama "/" */}
            <a href="/about" className="text-4xl font-extrabold tracking-tight cursor-pointer">
              <span className="rainbow-text-header">Libra Sinema</span>
            </a>
          </div>

          {/* Navigasi Utama */}
          <nav className="flex items-center space-x-6 mt-4 sm:mt-0">
            {/* Tombol Animasi mandiri */}
            <div>
              <a href="/" className="flex items-center px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10H6v-2h8m-8 4h8m-8 4h8M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"></path>
                </svg>
                Animasi
              </a>
            </div>
            
            {/* Tombol Movies dengan dropdown */}
            <div className="relative group" onMouseEnter={handleMoviesEnter} onMouseLeave={handleMoviesLeave}>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M4 8h16M4 12h16M4 16h16"></path>
                </svg>
                Film
              </a>
              {isMoviesDropdownOpen && (
                <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-xl py-2 z-20">
                  <a href="/movies/category/popular" className="block w-full text-left px-4 py-2 hover:bg-green-600">Terpopuler</a>
                  <a href="/movies/category/now_playing" className="block w-full text-left px-4 py-2 hover:bg-green-600">Sedang Tayang</a>
                  <a href="/movies/category/upcoming" className="block w-full text-left px-4 py-2 hover:bg-green-600">Segera Tayang</a>
                  <a href="/movies/category/top_rated" className="block w-full text-left px-4 py-2 hover:bg-green-600">Rating Tertinggi</a>
                </div>
              )}
            </div>

            {/* Tombol TV Shows dengan dropdown */}
            <div className="relative group" onMouseEnter={handleTvShowsEnter} onMouseLeave={handleTvShowsLeave}>
              <a href="#" className="flex items-center px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20h4M10 4h4M4 10v4M20 10v4M6 6l12 12M6 18l12-12"></path>
                </svg>
                Serial TV
              </a>
              {isTvShowsDropdownOpen && (
                <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-xl py-2 z-20">
                  <a href="/tv/category/popular" className="block w-full text-left px-4 py-2 hover:bg-green-600">Terpopuler</a>
                  <a href="/tv/category/airing_today" className="block w-full text-left px-4 py-2 hover:bg-green-600">Tayang Hari Ini</a>
                  <a href="/tv/category/on_the_air" className="block w-full text-left px-4 py-2 hover:bg-green-600">Di TV</a>
                  <a href="/tv/category/top_rated" className="block w-full text-left px-4 py-2 hover:bg-green-600">Rating Tertinggi</a>
                </div>
              )}
            </div>
          </nav>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari film atau serial TV..."
              className="bg-gray-700 text-white rounded-full py-1 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-300 w-40 sm:w-auto"
            />
            <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;