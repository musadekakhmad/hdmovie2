// app/[mediaType]/[id]/[slug]/page.js

import { notFound } from 'next/navigation';
import MovieImage from '@/components/MovieImage';
import MovieCard from '@/components/MovieCard';
import WatchNowButton from '@/components/WatchNowButton';
import Link from 'next/link';
import Image from 'next/image';

/*
  Konfigurasi API
  Jangan lupa untuk mengisi API KEY Anda di sini.
  BASE_URL mengarah ke proxy TMDB untuk menghindari masalah CORS.
  IMAGE_BASE_URL adalah URL dasar untuk gambar poster.
*/
const API_KEY = 'tmdb-api-proxy.argoyuwono119.workers.dev'; // <-- SILAKAN ISI DENGAN API KEY TMDB ANDA DI SINI
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';
// URL dasar untuk gambar OG (backdrop)
const IMAGE_BASE_URL_OG = 'https://image.tmdb.org/t/p/w1280';
// URL dasar untuk gambar poster
const IMAGE_BASE_URL_POSTER = 'https://image.tmdb.org/t/p/w500';

/*
  Fungsi untuk mendapatkan metadata dinamis (Penting untuk SEO)
  Ini akan membuat tag Open Graph dan Twitter Card yang spesifik untuk setiap halaman.
*/
export async function generateMetadata({ params }) {
  // Periksa apakah API Key telah diisi
  if (!API_KEY) {
    console.error("Kesalahan: API KEY belum diisi. Silakan tambahkan TMDB API Key Anda.");
    return {
      title: 'Kesalahan Konfigurasi',
      description: 'API Key belum diisi. Silakan periksa konfigurasi.',
    };
  }

  const awaitedParams = await params;
  const { mediaType, id, slug } = awaitedParams;

  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  const details = res.ok ? await res.json() : null;

  if (!details) {
    return {};
  }

  const title = `${details.title || details.name} | Libra Sinema`;
  const description = details.overview || 'Pusat Streaming film dan acara TV gratis berkualitas tinggi untuk Anda.';

  // Perbaikan utama: Prioritaskan gambar backdrop untuk Open Graph.
  // Gambar backdrop (w1280) lebih cocok dengan rasio 1.91:1
  const ogImageUrl = details.backdrop_path
    ? `${IMAGE_BASE_URL_OG}${details.backdrop_path}`
    : 'https://placehold.co/1200x630/000000/FFFFFF?text=No+Image';

  // Gambar poster tetap digunakan untuk tampilan di dalam halaman.
  const posterUrl = details.poster_path
    ? `${IMAGE_BASE_URL_POSTER}${details.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://LibraSinema.netlify.app/${mediaType}/${id}/${slug}`,
      siteName: 'Libra Sinema',
      images: [
        {
          url: ogImageUrl,
          // Gunakan dimensi yang sesuai dengan gambar backdrop
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
      locale: 'id_ID', // Ganti en_US ke id_ID
      type: 'website',
      appId: 'cut.erna.984',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WatchStream123',
      creator: '@WatchStream123',
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

/*
  Fungsi Pengambil Data untuk Halaman Detail
  Ini adalah kumpulan fungsi async yang mengambil data dari API.
  Setiap fungsi memiliki penanganan error dasar.
*/

// Fungsi untuk mendapatkan detail media
async function getMediaDetails(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

// Fungsi untuk mendapatkan kredit (pemain dan kru)
async function getMediaCredits(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`);
  if (!res.ok) {
    return { cast: [], crew: [] };
  }
  return res.json();
}

// Fungsi untuk mendapatkan video (trailer)
async function getMediaVideos(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`);
  if (!res.ok) {
    return { results: [] };
  }
  return res.json();
}

// Fungsi untuk mendapatkan media serupa
async function getSimilarMedia(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/similar?api_key=${API_KEY}`);
  if (!res.ok) {
    return { results: [] };
  }
  return res.json();
}

// Fungsi untuk mendapatkan ulasan pengguna
async function getMediaReviews(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/reviews?api_key=${API_KEY}`);
  if (!res.ok) {
    return { results: [] };
  }
  return res.json();
}

// Fungsi untuk mendapatkan nama sutradara dari kru
const getDirector = (crew) => {
  return crew.find(member => member.job === 'Director')?.name || 'Unknown';
};

/*
  Komponen Halaman Utama
  Ini adalah komponen React asinkron yang merender seluruh halaman detail.
  Ini mengambil semua data yang diperlukan dan menampilkannya.
*/
export default async function MediaDetailPage({ params }) {
  const awaitedParams = await params;
  const { mediaType, id } = awaitedParams;

  const [details, credits, videos, similar, reviews] = await Promise.all([
    getMediaDetails(mediaType, id),
    getMediaCredits(mediaType, id),
    getMediaVideos(mediaType, id),
    getSimilarMedia(mediaType, id),
    getMediaReviews(mediaType, id)
  ]);

  if (!details) {
    notFound();
  }

  const director = getDirector(credits.crew);
  const officialTrailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const trailerKey = officialTrailer ? officialTrailer.key : null;
  const cast = credits.cast.slice(0, 10);
  const similarMovies = similar.results.slice(0, 6);
  const userReviews = reviews.results.slice(0, 5);

  const mediaTitle = details.title || details.name;
  const mediaTagline = details.tagline;
  const mediaOverview = details.overview;
  const mediaReleaseDate = details.release_date || details.first_air_date;
  const runtime = details.runtime;
  const episodeRuntime = details.episode_run_time?.[0];
  const status = details.status;
  const originalLanguage = details.original_language;
  const homepage = details.homepage;

  return (
    <div className="bg-gray-850 text-gray-200 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden md:flex flex-col md:flex-row items-start">
          
          {/* Movie Poster Section */}
          <div className="md:w-1/3 flex-shrink-0 p-6 md:p-8 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
              <MovieImage
                src={details.poster_path ? `${IMAGE_BASE_URL_POSTER}${details.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
                alt={`Poster for ${mediaTitle}`}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Movie Details Section */}
          <div className="md:w-2/3 flex flex-col p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-wide mb-2">
              {mediaTitle}
            </h1>
            {mediaTagline && (
              <h2 className="text-lg italic font-light text-gray-400 mb-6">
                &quot;{mediaTagline}&quot;
              </h2>
            )}

            {/* Rating and Release Date */}
            <div className="flex items-center text-gray-300 space-x-4 mb-6">
              <div className="flex items-center text-yellow-500">
                {/* Star Icon */}
                <svg className="w-5 h-5 fill-current mr-1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#facc15"/>
                </svg>
                <span className="font-semibold text-lg">{details.vote_average?.toFixed(1)}</span>
              </div>
              <span className="text-2xl font-light text-gray-700">|</span>
              <div className="flex items-center">
                {/* Calendar Icon */}
                <svg className="w-5 h-5 fill-current mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4h-2V3a1 1 0 00-2 0v1H9V3a1 1 0 00-2 0v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM5 8h14v11a1 1 0 01-1 1H6a1 1 0 01-1-1V8z" fill="#38bdf8"/>
                </svg>
                <span className="text-base">{mediaReleaseDate}</span>
              </div>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
              {/* Director */}
              <div className="flex items-center text-gray-300">
                {/* Director Icon (User) */}
                <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#facc15"/>
                </svg>
                <span className="font-semibold text-sm">Sutradara:</span>
                <span className="ml-2 text-sm text-gray-400">{director}</span>
              </div>

              {/* Status */}
              <div className="flex items-center text-gray-300">
                {/* Status Icon (Checkmark) */}
                <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#4ade80"/>
                </svg>
                <span className="font-semibold text-sm">Status:</span>
                <span className="ml-2 text-sm text-gray-400">{status}</span>
              </div>
              
              {/* Duration */}
              {(runtime || episodeRuntime) && (
                <div className="flex items-center text-gray-300">
                  {/* Duration Icon (Clock) */}
                  <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" fill="#f87171"/>
                    <path d="M12 6v6l4 2-1 2-5-3V6z" fill="#f87171"/>
                  </svg>
                  <span className="font-semibold text-sm">Durasi:</span>
                  <span className="ml-2 text-sm text-gray-400">
                    {runtime ? `${runtime} min` : `${episodeRuntime} min`}
                  </span>
                </div>
              )}

              {/* Original Language */}
              {originalLanguage && (
                <div className="flex items-center text-gray-300">
                  {/* Language Icon (Globe) */}
                  <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2a10 10 0 00-7.3 16.7A9.92 9.92 0 0012 22a10 10 0 007.3-3.3A9.92 9.92 0 0012 2zM6.5 12a1 1 0 11-1-1 1 1 0 011 1zM17.5 12a1 1 0 11-1-1 1 1 0 011 1zM12 7.5a1 1 0 11-1 1 1 1 0 011-1zM12 16.5a1 1 0 11-1-1 1 1 0 011 1z" fill="#38bdf8"/>
                  </svg>
                  <span className="font-semibold text-sm">Bahasa Asli:</span>
                  <span className="ml-2 text-sm text-gray-400">{originalLanguage.toUpperCase()}</span>
                </div>
              )}

              {/* Homepage */}
              {homepage && (
                <div className="flex items-center text-gray-300">
                  {/* Homepage Icon (Home) */}
                  <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81z" fill="#60a5fa"/>
                  </svg>
                  <span className="font-semibold text-sm">Homepage:</span>
                  <Link href={homepage} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-blue-400 hover:underline">
                    Kunjungi
                  </Link>
                </div>
              )}
            </div>

            {/* Actors List */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Aktor</h3>
              <p className="text-sm text-gray-400 leading-relaxed text-justify">
                {cast.map(actor => actor.name).join(', ')}
              </p>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {details.genres?.map(genre => (
                <Link
                  key={genre.id}
                  href={`/genre/${mediaType}/${genre.id}`}
                  className="bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Synopsis Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Sinopsis</h3>
          <p className="text-gray-300 leading-relaxed text-justify">{mediaOverview}</p>
        </div>
        
        {/* Trailer Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Trailer</h3>
          {trailerKey ? (
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada trailer yang tersedia.</p>
          )}
        </div>

        {/* You Might Also Like Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Anda Mungkin Juga Menyukai</h3>
          {similarMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {similarMovies.map(item => (
                <MovieCard key={item.id} media={item} mediaType={item.media_type} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada film serupa yang tersedia.</p>
          )}
        </div>

        {/* User Reviews Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Ulasan Pengguna</h3>
          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map(review => (
                <div key={review.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-lg text-white">{review.author}</p>
                    {review.author_details.rating && (
                      <div className="flex items-center ml-4 text-yellow-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="#facc15"/>
                        </svg>
                        <span className="text-sm ml-1 text-gray-300">{review.author_details.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm italic">Dibuat pada: {new Date(review.created_at).toLocaleDateString()}</p>
                  <p className="text-gray-300 mt-4 leading-relaxed text-justify">{review.content.split(' ').slice(0, 50).join(' ')}... <Link href={review.url} target="_blank" className="text-blue-400 hover:text-blue-300">Baca selengkapnya</Link></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada ulasan yang tersedia.</p>
          )}
        </div>
        
        <div className="flex justify-center mt-12 mb-8">
          <WatchNowButton mediaType={mediaType} mediaId={id} />
        </div>
      </div>
    </div>
  );
}
