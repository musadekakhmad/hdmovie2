// app/search/[query]/page.js
// This page is a Server Component, responsible for fetching search results.

import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

// Konfigurasi API
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;

/*
  Fungsi Pengambil Data untuk Halaman Pencarian
  Ini adalah fungsi asinkron yang mengambil hasil pencarian dari API.
  Fungsi ini dipanggil langsung di dalam Server Component.
*/
async function getSearchResults(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // Mengembalikan array kosong jika ada kesalahan
  }
}

/*
  Komponen Halaman Pencarian Utama
  Ini adalah komponen React asinkron yang merender seluruh halaman hasil pencarian.
  Komponen ini mengambil query dari URL dan memuat data yang sesuai.
*/
export default async function SearchPage({ params }) {
  // Menunggu params untuk mendapatkan properti query
  const awaitedParams = await params;
  const searchQuery = awaitedParams.query;

  // Memeriksa jika searchQuery tidak ada, jika demikian, tampilkan halaman 404
  if (!searchQuery) {
    notFound();
  }

  // Mengambil hasil pencarian langsung di komponen server
  const results = await getSearchResults(searchQuery);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        Hasil Pencarian untuk "{decodeURIComponent(searchQuery)}"
      </h1>
      
      {/* Menampilkan hasil pencarian jika ada */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results
            .filter(item => item.poster_path) // Filter item tanpa poster
            .map(item => (
              <MovieCard key={item.id} media={item} mediaType={item.media_type || 'movie'} />
            ))}
        </div>
      ) : (
        // Menampilkan pesan jika tidak ada hasil
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">Maaf, tidak ada hasil yang ditemukan untuk pencarian Anda.</p>
          <p className="text-gray-500 mt-2">Coba kata kunci lain atau kembali ke <Link href="/" className="text-blue-500 hover:underline">Halaman Utama</Link>.</p>
        </div>
      )}
    </div>
  );
}
