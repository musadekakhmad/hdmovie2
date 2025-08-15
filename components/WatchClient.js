// app/watch/[mediaType]/[id]/WatchClient.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react'; // Menggunakan Lucide React untuk ikon

// Konfigurasi API
const API_KEY = ''; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';
const BACKDROP_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// Komponen utama halaman player (CLIENT COMPONENT)
export default function WatchClient({ mediaType, id, initialDetails, initialSimilarMedia }) {
  const [details] = useState(initialDetails);
  const [streamUrl, setStreamUrl] = useState(null);
  const title = details.title || details.name;

  // Data film romantis statis sesuai permintaan
  const romanceMovies = [
    { id: '1', title: 'The Notebook', mediaType: 'movie' },
    { id: '2', title: 'La La Land', mediaType: 'movie' },
    { id: '3', title: 'Before Sunrise', mediaType: 'movie' },
    { id: '4', title: '500 Days of Summer', mediaType: 'movie' },
    { id: '5', title: 'When Harry Met Sally...', mediaType: 'movie' },
    { id: '6', title: 'Eternal Sunshine of the Spotless Mind', mediaType: 'movie' },
  ];

  // Handler untuk memilih stream
  const handleStreamSelect = () => {
    // URL stream vidsrc.to yang akan digunakan
    const baseUrl = "https://vidsrc.to/embed/";
    setStreamUrl(`${baseUrl}${mediaType}/${id}`);
  };

  return (
    <main
      className="relative bg-gray-900 text-white min-h-screen p-4 md:p-8 lg:p-12"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.5)), url(${BACKDROP_IMAGE_URL}${details.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto z-10 relative">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-yellow-400 text-center">{title}</h1>

        {/* Bagian Utama: Video Player & Deskripsi */}
        <div className="w-full">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-4 mb-6">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => handleStreamSelect()}
                className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition duration-200 shadow-md transform hover:scale-105"
              >
                Stream 1
              </button>
              <button
                onClick={() => handleStreamSelect()}
                className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-200 shadow-md transform hover:scale-105"
              >
                Stream 2
              </button>
            </div>

            {/* Area Pemutar Video */}
            <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-xl">
              {streamUrl ? (
                <iframe
                  src={streamUrl}
                  title={`${title} Player`}
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 bg-gray-900">
                  <PlayCircleIcon size={64} className="mb-4 text-gray-600" />
                  Pilih salah satu tombol stream di atas untuk memulai
                </div>
              )}
            </div>
          </div>
          
          {/* Area Deskripsi untuk semua ukuran layar */}
          <div className="text-gray-300 mt-6">
            <h2 className="text-2xl font-bold mb-2">Sinopsis</h2>
            <p>{details.overview}</p>
          </div>
        </div>

        {/* Bagian "Like To This" yang telah diubah */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Like To This</h2>
          <div className="flex flex-wrap gap-4">
            {romanceMovies.map((movie) => (
              <Link href={`/${movie.mediaType}/${movie.id}`} key={movie.id} passHref>
                <div className="text-white bg-gray-800 hover:bg-gray-700 transition duration-200 py-2 px-4 rounded-lg shadow-md font-medium cursor-pointer">
                  {movie.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
