// components/MovieCard.js
"use client";
import Link from 'next/link';
// usePathname dihilangkan untuk mencegah hydration error
// import { usePathname } from 'next/navigation';

// Konfigurasi URL dasar gambar
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ media, mediaType }) {
  // Tambahkan validasi untuk memastikan 'media' bukan undefined atau null
  if (!media) {
    return null; // Jangan render apa pun jika media tidak valid
  }

  const mediaTitle = media.title || media.name;
  
  // Perbaikan: Membuat slug dari judul film untuk URL yang lengkap
  const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
  // Tambahkan validasi untuk string kosong di poster_path
  const posterPath = media.poster_path && media.poster_path !== "" 
    ? `${IMAGE_BASE_URL}${media.poster_path}` 
    : 'https://placehold.co/500x750?text=No+Image';

  // Perbaikan: Mengembalikan URL lengkap dengan 'slug'
  const targetUrl = `/${mediaType}/${media.id}/${mediaSlug}`;

  // Logika isSelected dan usePathname dihilangkan untuk memperbaiki hydration error
  // const pathname = usePathname();
  // const isSelected = pathname.includes(`/${mediaType}/${media.id}`);

  return (
    <div 
      className={`relative group rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:shadow-yellow-500/50`}
    >
      <Link href={targetUrl}>
        {/* Kontainer untuk gambar dan overlay */}
        <div className="relative">
          <img
            src={posterPath}
            alt={mediaTitle}
            className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-sm md:text-base font-semibold truncate">{mediaTitle}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
