// app/search/[query]/page.js

'use client';
import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';

// Konfigurasi API
const API_KEY = ''; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// Custom Hook untuk fetch data
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

export default function SearchPage({ params }) {
  const searchQuery = params.query;
  const { data, loading, error } = useFetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(searchQuery)}&api_key=${API_KEY}`);

  if (!searchQuery) {
    notFound();
  }

  const results = data?.results || [];

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        Hasil Pencarian untuk "{decodeURIComponent(searchQuery)}"
      </h1>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message p-4 bg-red-800 rounded-md">
          <p>Terjadi kesalahan saat mengambil data: {error}. Pastikan API key Anda valid.</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results
            .filter(item => item.poster_path) // Filter item tanpa poster
            .map(item => (
              <MovieCard key={item.id} media={item} mediaType={item.media_type} />
            ))}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">Tidak ada hasil yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}
