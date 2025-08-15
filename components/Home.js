// Home.js
"use client";
import { useState, useEffect, useCallback } from 'react';
// Import komponen MovieCard yang akan kita definisikan di sini untuk menjaga kode tetap mandiri.
import Link from 'next/link'; // Tambahkan impor Link di sini

// URL dasar untuk API
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
// MovieCard Component
// ===================================
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-xl transition-transform duration-300 transform hover:scale-105">
      {/* Ubah tag <a> menjadi <Link> dan hapus passHref */}
      <Link href={`/${movie.media_type || 'movie'}/${movie.id}`}>
        <img
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
          alt={movie.title || movie.name}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-4 w-full">
            <h3 className="text-white text-lg font-bold mb-1">{movie.title || movie.name}</h3>
            <div className="flex items-center text-yellow-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};


// ===================================
// Home Component
// ===================================
const Home = () => {
  // PENGGUNAAN useFetch untuk mendapatkan data trending
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useFetch(`${BASE_URL}/trending/all/day?api_key=`);

  // PENGGUNAAN useFetch untuk mendapatkan film populer
  const { data: popularMovies, loading: popularLoading, error: popularError } = useFetch(`${BASE_URL}/movie/popular?api_key=`);

  return (
    // Kelas `container mx-auto px-4 max-w-7xl` digunakan untuk memastikan konten memiliki lebar maksimum yang sama
    // dengan header dan terpusat dengan padding yang konsisten.
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div id="hero-section" className="relative mb-12 rounded-xl overflow-hidden shadow-2xl">
          <img
              src="https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg"
              alt="Estreno Ya Movie Streaming Banner"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1280x720/0a0a0a/ededed?text=Estreno+Ya+Movie+Streaming+Banner';
              }}
          />
      </div>

      {/* About Section */}
      <section className="bg-gray-800 rounded-2xl p-8 shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-white mb-4">Estreno Ya: Free HD Movie & TV Show Streaming</h1>
        <p className="text-gray-300 text-justify leading-relaxed">
          Estreno Ya is your one-stop destination for high-quality, free streaming of movies and TV shows. Explore our collection of popular movies, trending films, and the most talked-about TV series. With an easy-to-use interface and smooth video player, we ensure a pleasant viewing experience. Start streaming today!
        </p>
      </section>

      {/* Trending Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Trending Today</h2>
        {trendingLoading && <p className="text-center text-gray-400">Loading trending...</p>}
        {trendingError && <p className="text-center text-red-400">Error: {trendingError}</p>}
        {trendingData && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {trendingData.results.filter(movie => movie.poster_path).slice(0, 20).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;

