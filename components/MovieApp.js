"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react';

// API Key is not needed here as we are using a proxy URL
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ===================================
// Custom Hooks
// ===================================

/**
 * Custom hook to fetch data from an API efficiently.
 * Uses useCallback to prevent unnecessary re-renders.
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
// MovieCard Component (Diintegrasikan di sini untuk kemudahan)
// ===================================
const MovieCard = ({ media, mediaType }) => {
  // Tambahkan validasi untuk memastikan 'media' bukan undefined atau null
  if (!media) {
    return null; // Jangan render apa pun jika media tidak valid
  }

  const mediaTitle = media.title || media.name;
  
  // Perbaikan: Membuat slug dari judul film untuk URL yang lengkap
  const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\\w-]+/g, '');
  
  // Tambahkan validasi untuk string kosong di poster_path
  const posterPath = media.poster_path && media.poster_path !== "" 
    ? `${IMAGE_BASE_URL}${media.poster_path}` 
    : 'https://placehold.co/500x750?text=No+Image';

  // Perbaikan: Mengembalikan URL lengkap
  const targetUrl = `/${mediaType}/${media.id}/${mediaSlug}`;

  return (
    <div 
      className={`relative group rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:shadow-yellow-500/50`}
    >
      <Link href={targetUrl}>
        {/* Kontainer untuk gambar dan overlay */}
        <div className="relative">
          <img
            src={posterPath}
            alt={mediaTitle}
            className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-bold">{mediaTitle}</h3>
            {media.vote_average && (
              <p className="text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {media.vote_average.toFixed(1)}
              </p>
            )}
            <PlayCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Link>
    </div>
  );
};

// ===================================
// Main App Component
// ===================================
export default function MovieApp() {
  // Gunakan useFetch hook untuk mengambil data film populer
  const { data, loading, error } = useFetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Bagian deskripsi situs */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Libra Sinema: Nonton Film Gratis dan Streaming Serial Tv</h1>
          <p className="text-gray-300 text-justify">
            Libra Sinema adalah tujuan utama Anda untuk streaming film dan acara TV gratis berkualitas tinggi. Jelajahi koleksi ekstensif kami dari film populer, film yang sedang tren, dan serial TV yang paling banyak dibicarakan. Dengan antarmuka yang mudah digunakan dan pemutar video yang mulus, kami memastikan pengalaman menonton yang menyenangkan. Mulai streaming hari ini!
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
          Popular Movies
        </h2>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>Terjadi kesalahan saat mengambil data: {error}. Pastikan Anda memiliki kunci API yang valid dan koneksi internet yang stabil.</p>
          </div>
        )}

        {!loading && !error && data && data.results && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {data.results.map(item => (
              <MovieCard key={item.id} media={item} mediaType="movie" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
