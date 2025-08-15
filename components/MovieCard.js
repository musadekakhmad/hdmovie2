// MovieCard.js
// components/MovieCard.js

// Import Link dan Image jika diperlukan
import Link from 'next/link';

// Konfigurasi URL dasar gambar
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ media, mediaType }) {
  // PERBAIKAN: Tambahkan validasi untuk memastikan 'media' bukan undefined atau null
  if (!media) {
    return null; // Jangan render apa pun jika media tidak valid
  }

  const mediaTitle = media.title || media.name;
  const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
  // PERBAIKAN: Tambahkan validasi untuk string kosong di poster_path
  const posterPath = media.poster_path && media.poster_path !== "" 
    ? `${IMAGE_BASE_URL}${media.poster_path}` 
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
