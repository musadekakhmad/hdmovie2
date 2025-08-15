// components/MovieDetailInfo.js
import React from 'react';
import WatchNowButton from './WatchNowButton';

const MovieDetailInfo = ({ movie }) => {
  if (!movie) {
    return null;
  }

  // Gunakan SVG yang benar dan lengkap
  const languageIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="M2 12h20"></path>
    </svg>
  );

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
        {movie.title || movie.name}
      </h1>
      <p className="text-gray-400 text-lg mb-6">{movie.tagline}</p>
      
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex items-center text-yellow-400 font-bold text-lg">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center text-gray-300">
          <span className="bg-gray-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
          </span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center text-gray-300">
          <span className="bg-gray-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {movie.genres.map(genre => genre.name).join(', ')}
          </span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center text-gray-300">
          {languageIcon}
          <span className="ml-2">
            {movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}
          </span>
        </div>
      </div>

      <p className="text-gray-300 text-base leading-relaxed mb-6">
        {movie.overview}
      </p>

      {/* Komponen WatchNowButton (ini harus Client Component) */}
      <WatchNowButton movieId={movie.id} />
    </div>
  );
};

export default MovieDetailInfo;
