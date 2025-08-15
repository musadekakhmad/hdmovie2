"use client";
import React from 'react';
import Image from 'next/image'; // Menggunakan komponen Image dari Next.js

const MovieImage = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/500x750?text=No+Image';
  };

  const isPlaceholder = src && src.includes('placehold.co');

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={500} // Sesuaikan lebar yang sesuai
      height={750} // Sesuaikan tinggi yang sesuai
      unoptimized={isPlaceholder}
      onError={handleError}
    />
  );
};

export default MovieImage;
