// app/[mediaType]/category/[category]/page.js

import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';
// import { useRouter } from 'next/router'; // BARIS INI TELAH DIHAPUS

// Konfigurasi API
const API_KEY = ''; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

/*
  Fungsi Pengambil Data untuk Halaman Kategori
  Ini adalah fungsi asinkron yang mengambil film atau acara TV berdasarkan kategori.
  Fungsi ini dipanggil langsung di dalam Server Component.
*/
async function getCategoryData(mediaType, category) {
  try {
    // Perbaikan: menggunakan variabel 'category' untuk memanggil API
    const response = await fetch(`${BASE_URL}/${mediaType}/${category}?api_key=${API_KEY}`);
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
  Fungsi untuk mengubah nama kategori menjadi judul yang lebih mudah dibaca
*/
const formatCategoryTitle = (category) => {
  if (!category) return '';
  return category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

/*
  Komponen Halaman Kategori Utama
  Ini adalah komponen React asinkron yang merender daftar film atau acara TV.
  Komponen ini mengambil mediaType dan kategori dari URL dan memuat data yang sesuai.
*/
export default async function CategoryPage({ params }) {
  const awaitedParams = await params;
  const { mediaType, category } = awaitedParams;

  // Pastikan mediaType valid
  if (mediaType !== 'movies' && mediaType !== 'tv') {
    notFound();
  }

  // Mengambil data berdasarkan mediaType
  const data = await getCategoryData(mediaType.replace('s', ''), category);

  const mediaTitle = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
  const formattedCategory = formatCategoryTitle(category);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        {mediaTitle} - {formattedCategory}
      </h1>
      
      {data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data
            .filter(item => item.poster_path)
            .map(item => (
              // Meneruskan mediaType secara eksplisit ke MovieCard
              <MovieCard key={item.id} media={item} mediaType={mediaType.replace('s', '')} />
            ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">Maaf, tidak ada konten yang ditemukan untuk kategori ini.</p>
          <p className="text-gray-500 mt-2">Coba kategori lain atau kembali ke <Link href="/" className="text-blue-500 hover:underline">Halaman Utama</Link>.</p>
        </div>
      )}
    </div>
  );
}
