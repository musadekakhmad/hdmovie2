'use client';

// app/[mediaType]/[id]/page.js
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Konfigurasi API
const API_KEY = ''; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// ====================================================================================
// FUNGSI UNTUK MENDAPATKAN DATA
// ====================================================================================
async function getMediaDetails(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    // Memastikan 404 dipanggil jika data tidak ditemukan
    notFound();
  }
  return res.json();
}

async function getMediaCredits(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`);
  if (!res.ok) {
    return { cast: [], crew: [] };
  }
  return res.json();
}

async function getSimilarMedia(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/similar?api_key=${API_KEY}`);
  if (!res.ok) {
    return { results: [] };
  }
  return res.json();
}

// ===================================
// KOMPONEN MovieCard
// ===================================
const MovieCard = ({ media }) => {
  // Memastikan media_type tersedia, jika tidak, gunakan 'movie' sebagai fallback
  const mediaType = media.media_type || 'movie';
  const mediaTitle = media.title || media.name;
  const posterPath = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : 'https://placehold.co/500x750?text=No+Image';

  // Menambahkan slug ke URL untuk SEO
  const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return (
    <Link href={`/${mediaType}/${media.id}/${mediaSlug}`}>
      <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img
          src={posterPath}
          alt={mediaTitle}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-3">
          <p className="text-sm font-semibold text-white truncate">{mediaTitle}</p>
        </div>
      </div>
    </Link>
  );
};


// ====================================================================================
// KOMPONEN UTAMA HALAMAN PLAYER
// ====================================================================================
export default function PlayerPage({ params }) {
  const { mediaType, id } = params;
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMedia, setSimilarMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const detailsData = await getMediaDetails(mediaType, id);
        const creditsData = await getMediaCredits(mediaType, id);
        const similarMediaData = await getSimilarMedia(mediaType, id);
        setDetails(detailsData);
        setCredits(creditsData);
        setSimilarMedia(similarMediaData.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mediaType, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="error-message p-4 bg-red-800 rounded-md">
          <p>Terjadi kesalahan saat mengambil data: {error}</p>
        </div>
      </div>
    );
  }

  if (!details) {
    notFound();
  }

  const title = details.title || details.name;
  const director = credits?.crew.find(
    (member) => member.job === 'Director'
  )?.name;
  const status = details.status;
  const duration = details.runtime || details.episode_run_time?.[0];
  const originalLanguage = details.original_language?.toUpperCase();
  const homepage = details.homepage;
  const cast = credits?.cast.slice(0, 5)
  .map((actor) => actor.name)
  .join(', ');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            details.backdrop_path
              ? `${BACKDROP_IMAGE_URL}${details.backdrop_path}`
              : 'https://placehold.co/1920x1080/000000/FFFFFF?text=No+Image'
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300">
            {details.tagline}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto p-4 md:p-8 -mt-20 z-10 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Details Section */}
          <div className="w-full lg:w-2/3">
            {/* Player Container */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl aspect-w-16 aspect-h-9 bg-black">
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                Player akan dimuat di sini.
              </div>
            </div>

            {/* Details and Description */}
            <div className="mt-8 text-gray-300 space-y-4">
                <p className="text-sm">{details.overview}</p>
                <div className="text-sm">
                    {/* Director */}
                    {director && (
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1.5c-4.694 0-8.5 3.806-8.5 8.5s3.806 8.5 8.5 8.5 8.5-3.806 8.5-8.5-3.806-8.5-8.5-8.5zm0 2.5c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zM12 11.5a1 1 0 100 2 1 1 0 000-2z"/>
                            </svg>
                            <span className="font-semibold">Director:</span>  {director}
                        </p>
                    )}
                    {/* Status */}
                    {status && (
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span className="font-semibold">Status:</span>  {status}
                        </p>
                    )}
                    {/* Duration */}
                    {duration && (
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13h1v6l5.25 3.15-.45.76L11.5 14z"/>
                            </svg>
                            <span className="font-semibold">Duration:</span>  {duration} minutes
                        </p>
                    )}
                    {/* Original Language */}
                    {originalLanguage && (
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.96-7-8.93 0-5.52 4.48-10 10-10 4.1 0 7.5 2.58 9.07 6H13v-2h6.92c-.22-.38-.45-.76-.69-1.14L15.43 14H13l-2.47-5.06L9 9v2H7V9H5.08L6.5 6.27l1.76 1.76L9 6v2h2V6.27L12 5.08V4H10.59C9.76 2.87 8.54 2 7 2c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.54 0 2.76-.87 3.59-1.93L13 18.08V20h1.41l1.76-1.76L18 20.08v1.07h-2.58L15 22.08l1.42 1.41.92-.91L18 24l1.58-1.58L22 22.58v-1.08h-2.58l-1.42-1.41.91-.92L20.08 18l-.58-.58-.91.91zM8 12c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                            </svg>
                            <span className="font-semibold">Original Language:</span>  {originalLanguage}
                        </p>
                    )}
                    {/* Homepage */}
                    {homepage && (
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.96-7-8.93 0-5.52 4.48-10 10-10 4.1 0 7.5 2.58 9.07 6H13v-2h6.92c-.22-.38-.45-.76-.69-1.14L15.43 14H13l-2.47-5.06L9 9v2H7V9H5.08L6.5 6.27l1.76 1.76L9 6v2h2V6.27L12 5.08V4H10.59C9.76 2.87 8.54 2 7 2c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.54 0 2.76-.87 3.59-1.93L13 18.08V20h1.41l1.76-1.76L18 20.08v1.07h-2.58L15 22.08l1.42 1.41.92-.91L18 24l1.58-1.58L22 22.58v-1.08h-2.58l-1.42-1.41.91-.92L20.08 18l-.58-.58-.91.91zM8 12c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                            </svg>
                            <span className="font-semibold">Homepage:</span>  <Link href={homepage} target="_blank" className="text-yellow-500 hover:underline">{homepage}</Link>
                        </p>
                    )}
                </div>
                {/* Actors */}
                {cast && (
                    <p className="flex items-start">
                        <span className="font-semibold">Actors:</span>  {cast}
                    </p>
                )}
            </div>
          </div>

          {/* Poster Area */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={details.poster_path ? `${IMAGE_BASE_URL}${details.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* =================================== */}
        {/* Bagian "You might like also" */}
        {/* =================================== */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might like also</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Memastikan `media` memiliki `media_type` sebelum merender */}
            {similarMedia.map((media) => (
              media.media_type && <MovieCard key={media.id} media={media} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ====================================================================================
// FUNGSI UNTUK MENDAPATKAN METADATA DINAMIS (Penting untuk SEO)
// ====================================================================================
export async function generateMetadata({ params }) {
  const { mediaType, id } = params;

  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  const details = res.ok ? await res.json() : null;

  if (!details) {
    return {};
  }

  const title = `${details.title || details.name} | Estrenoya`;
  const description = details.overview || 'Tujuan utama Anda untuk streaming film dan acara TV gratis berkualitas tinggi.';
  const imageUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/original${details.poster_path}`
    : 'https://placehold.co/1200x630/000000/FFFFFF?text=Estrenoya';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://estrenoya.netlify.app/${mediaType}/${id}`,
      siteName: 'Estrenoya',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
