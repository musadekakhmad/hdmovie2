// app/search/[query]/page.js

// Hapus 'use client' dari sini dan biarkan di file terpisah jika Anda masih membutuhkannya
import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { Suspense } from 'react';

// Konfigurasi API
const API_KEY = ''; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// Fungsi untuk fetch data
const fetchSearchResults = async (query) => {
  if (!query) {
    notFound();
  }
  const url = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const json = await response.json();
    return json.results;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

// Komponen SearchPage utama (sekarang Server Component)
export default async function SearchPage({ params }) {
  const searchQuery = params.query;
  const results = await fetchSearchResults(searchQuery);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        Hasil Pencarian untuk "{decodeURIComponent(searchQuery)}"
      </h1>
      
      {/* Menggunakan Suspense untuk menangani state loading */}
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      }>
        <SearchResultsDisplay results={results} />
      </Suspense>
    </div>
  );
}

// Komponen Client yang terpisah untuk menampilkan hasil
function SearchResultsDisplay({ results }) {
  if (results.length > 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {results
          .filter(item => item.poster_path) // Filter item tanpa poster
          .map(item => (
            <MovieCard key={item.id} media={item} mediaType={item.media_type} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-xl text-gray-500">Tidak ada hasil yang ditemukan.</p>
    </div>
  );
}
