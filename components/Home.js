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
  const animationGenreId = 16;
  
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [allMovieData, setAllMovieData] = useState([]);
  const [allTvData, setAllTvData] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [tvLoading, setTvLoading] = useState(true);
  const [movieError, setMovieError] = useState(null);
  const [tvError, setTvError] = useState(null);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [hasMoreTv, setHasMoreTv] = useState(true);

  // Effect untuk mengambil data film
  useEffect(() => {
    const fetchMovies = async () => {
      setMovieLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${animationGenreId}&page=${moviePage}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = await response.json();
        setAllMovieData(prevData => [...prevData, ...json.results]);
        // Cek apakah ada lebih banyak halaman untuk dimuat
        setHasMoreMovies(json.results.length === 20);
      } catch (err) {
        setMovieError(err.message);
        console.error("Fetch movie error:", err);
      } finally {
        setMovieLoading(false);
      }
    };
    fetchMovies();
  }, [moviePage]);

  // Effect untuk mengambil data TV
  useEffect(() => {
    const fetchTv = async () => {
      setTvLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${animationGenreId}&page=${tvPage}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = await response.json();
        setAllTvData(prevData => [...prevData, ...json.results]);
        // Cek apakah ada lebih banyak halaman untuk dimuat
        setHasMoreTv(json.results.length === 20);
      } catch (err) {
        setTvError(err.message);
        console.error("Fetch TV error:", err);
      } finally {
        setTvLoading(false);
      }
    };
    fetchTv();
  }, [tvPage]);

  const handleLoadMoreMovies = () => {
    setMoviePage(prevPage => prevPage + 1);
  };

  const handleLoadMoreTv = () => {
    setTvPage(prevPage => prevPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Bagian Hero - Tinggi Disesuaikan, menambahkan jarak dengan bagian atas */}
      <div className="relative mt-8 w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl" suppressHydrationWarning={true}>
          <img
              src="https://live.staticflickr.com/65535/54734663743_992c7169cc_b.jpg"
              alt="Libra Sinema Banner"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Libra-Sinema';
              }}
          />
      </div>
      
      {/* Kontainer utama untuk konten dengan padding */}
      <div className="px-4 md:px-8">
        {/* Menambahkan tag h1 di sini */}
        <h1 className="text-3xl font-bold text-center mt-8 mb-12 text-yellow-500 leading-tight md:text-4xl">
          Libra Sinema: Pusat nonton streaming film dan acara TV gratis berkualitas tinggi untuk Anda.
        </h1>
        
        {/* Bagian Film Animasi */}
        <section className="mt-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Film Animasi</h2>
          {movieLoading && <p className="text-center text-gray-400">Memuat film animasi...</p>}
          {movieError && <p className="text-center text-red-400">Kesalahan: {movieError}</p>}
          {allMovieData.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {allMovieData.filter(movie => movie.poster_path).map((movie) => (
                  <MovieCard key={movie.id} media={movie} mediaType="movie" />
                ))}
              </div>
              {hasMoreMovies && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMoreMovies}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
                  >
                    Tampilkan Lebih
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Bagian Serial TV Animasi */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Serial TV Animasi</h2>
          {tvLoading && <p className="text-center text-gray-400">Memuat serial TV animasi...</p>}
          {tvError && <p className="text-center text-red-400">Kesalahan: {tvError}</p>}
          {allTvData.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {allTvData.filter(tv => tv.poster_path).map((tv) => (
                  <MovieCard key={tv.id} media={tv} mediaType="tv" />
                ))}
              </div>
              {hasMoreTv && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMoreTv}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
                  >
                    Tampilkan Lebih
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
