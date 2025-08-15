// app/watch/[mediaType]/[id]/WatchClient.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react'; // Menggunakan Lucide React untuk ikon

// Konfigurasi API
const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// ===================================
// KOMPONEN MovieCard
// ===================================
function MovieCard({ media }) {
    if (!media) {
      return null;
    }
    
    // Menggunakan media_type dari objek media jika ada, jika tidak, gunakan 'movie' sebagai default
    const mediaType = media.media_type || 'movie';
    const mediaTitle = media.title || media.name;
    const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const posterPath = media.poster_path && media.poster_path !== ""
      ? `${POSTER_IMAGE_URL}${media.poster_path}`
      : 'https://placehold.co/500x750?text=No+Image';
    
    const targetUrl = `/${mediaType}/${media.id}/${mediaSlug}`;
    
    return (
        <div className="relative group rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:shadow-yellow-500/50">
            <Link href={targetUrl}>
                <img
                    src={posterPath}
                    alt={mediaTitle}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
            </Link>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-sm md:text-base font-semibold truncate">{mediaTitle}</h3>
            </div>
        </div>
    );
}

// ===================================
// KOMPONEN UTAMA HALAMAN STREAMING
// ===================================
export default function WatchClient({ mediaType, id, initialDetails, initialSimilarMedia }) {
    const [details] = useState(initialDetails);
    const [streamUrl, setStreamUrl] = useState(null);
    const title = details.title || details.name;

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

                {/* Bagian Utama: Video Player */}
                <div className="w-full">
                    <div className="bg-gray-800 rounded-lg shadow-2xl p-4 mb-6">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
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
                        <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden shadow-xl">
                            {streamUrl ? (
                                <iframe
                                    src={streamUrl}
                                    title={`${title} Player`}
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full border-0"
                                ></iframe>
                            ) : (
                                <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-gray-400 bg-gray-900">
                                    <PlayCircleIcon size={64} className="mb-4 text-gray-600" />
                                    Pilih salah satu tombol stream di atas untuk memulai
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* =================================== */}
                {/* Bagian "You might like also" */}
                {/* =================================== */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">You might like also</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {initialSimilarMedia.map((media) => (
                            <MovieCard key={media.id} media={media} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
