// app/watch/[mediaType]/[id]/PlayerClient.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react';
import MovieCard from '@/components/MovieCard';

// Konfigurasi API
const BACKDROP_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// Komponen utama halaman player (CLIENT COMPONENT)
export default function PlayerClient({ mediaType, id, initialDetails, initialSimilarMedia, initialVideos, initialReviews }) {
  const [details] = useState(initialDetails);
  const [similarMedia] = useState(initialSimilarMedia);
  const [videos] = useState(initialVideos);
  const [reviews] = useState(initialReviews);
  const [selectedStream, setSelectedStream] = useState(null);

  // Fungsi untuk menangani klik tombol stream
  const handleStreamClick = (streamUrl) => {
    setSelectedStream(streamUrl);
  };

  const title = details.title || details.name;
  const overview = details.overview || 'Tidak ada deskripsi tersedia.';

  // Temukan trailer YouTube pertama
  const trailer = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header Halaman (Backdrop Image) */}
      <div
        className="relative h-[60vh] bg-cover bg-center overflow-hidden rounded-b-3xl shadow-2xl"
        style={{ backgroundImage: `url(${BACKDROP_IMAGE_URL}${details.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl hidden md:block">
            {overview}
          </p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="container mx-auto px-4 py-8">
        {/* Bagian Player Video */}
        <div className="-mt-32 md:-mt-48 relative z-10">
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            {/* Tombol-tombol stream */}
            <div className="flex flex-wrap p-4 bg-gray-800 border-b border-gray-700">
              <button
                onClick={() => handleStreamClick('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 mr-2 mb-2"
              >
                Stream Server 1
              </button>
              <button
                onClick={() => handleStreamClick('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 mr-2 mb-2"
              >
                Stream Server 2
              </button>
            </div>

            {/* Kotak Pemutar Video */}
            <div className="aspect-video w-full">
              {selectedStream ? (
                <iframe
                  className="w-full h-full"
                  src={selectedStream}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                  <PlayCircleIcon size={64} className="mb-4 text-gray-600" />
                  <p className="text-gray-400">Pilih salah satu tombol stream di atas untuk memulai</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail Informasi */}
        <div className="mt-12 p-8 bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-white">Detail Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="mb-2"><strong>Genre:</strong>{' '}
                {details.genres?.map((g, index) => {
                  const genreSlug = g.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <span key={g.id}>
                      <Link href={`/${mediaType}/genre/${g.id}/${genreSlug}`} className="text-red-500 hover:text-red-400 transition-colors duration-200">
                        {g.name}
                      </Link>
                      {index < details.genres.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </p>
              <p><strong>Rilis:</strong> {details.release_date || details.first_air_date}</p>
              {details.runtime && <p><strong>Durasi:</strong> {details.runtime} menit</p>}
              {details.episode_run_time && <p><strong>Durasi Episode:</strong> {details.episode_run_time[0]} menit</p>}
            </div>
            <div>
              <p><strong>Status:</strong> {details.status}</p>
              <p><strong>Bahasa Asli:</strong> {details.original_language?.toUpperCase()}</p>
              <p><strong>Skor:</strong> {details.vote_average?.toFixed(1)}/10 ({details.vote_count} votes)</p>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        {trailer && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Trailer</h2>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* User Reviews */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Review Pengguna</h2>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-white font-semibold mb-2">Review oleh: {review.author}</p>
                  <p className="text-gray-300 line-clamp-4 hover:line-clamp-none transition-all duration-300">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Belum ada review untuk media ini.</p>
          )}
        </div>

        {/* Bagian "Like To This" (Konten serupa) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Like To This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarMedia.map((media) => (
              <MovieCard key={media.id} media={media} mediaType={mediaType} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
