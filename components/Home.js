// Home.js
"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard'; // Gunakan komponen MovieCard dari folder components

// URL dasar untuk API
const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hooks
// ===================================

/**
 * Custom hook untuk mengambil data dari API secara efisien.
 * Menggunakan useCallback untuk mencegah re-render yang tidak perlu.
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return { data, loading, error };
};


// ===================================
// Home Component
// ===================================

export default function Home() {
  // Ganti endpoint trending dengan endpoint untuk genre "Romance"
  const genreId = 10749; // ID untuk genre Romance
  const { data: genreData, loading: genreLoading, error: genreError } = useFetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section - Tinggi Disesuaikan dan Diberi Efek */}
      {/* Menambahkan efek rounded-xl dan shadow-2xl untuk mempercantik tepi */}
      <div className="relative w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl" suppressHydrationWarning={true}>
          <img
              src="https://live.staticflickr.com/65535/54723855118_220a5f1b1c_b.jpg.jpg"
              alt="Estreno Ya Banner"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Estreno Ya';
              }}
          />
      </div>
      
      {/* Container utama untuk konten dengan padding */}
      <div className="px-4 md:px-8">
        {/* About Section */}
        <section className="bg-gray-800 rounded-2xl p-8 shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-3xl font-bold text-white mb-4">Estreno Ya: Free HD Movie & TV Show Streaming</h1>
          <p className="text-gray-300 text-justify leading-relaxed">
            Estreno Ya is your one-stop destination for high-quality, free streaming of movies and TV shows. Explore our collection of popular movies, trending films, and the most talked-about TV series. With an easy-to-use interface and smooth video player, we ensure a pleasant viewing experience. Start streaming today!
          </p>
        </section>

        {/* Genre Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Romantic Movies</h2>
          {genreLoading && <p className="text-center text-gray-400">Loading romantic movies...</p>}
          {genreError && <p className="text-center text-red-400">Error: {genreError}</p>}
          {genreData && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {genreData.results.filter(movie => movie.poster_path).slice(0, 20).map((movie) => (
                <MovieCard key={movie.id} media={movie} mediaType="movie" />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
