import { notFound } from 'next/navigation';
// Import dengan path relatif untuk menghindari masalah alias
import MovieImage from '../../components/MovieImage';
import MovieCard from '../../components/MovieCard';
import WatchNowButton from '../../components/WatchNowButton';
import Link from 'next/link';

// Import komponen MovieDetailInfo yang baru
import MovieDetailInfo from '../../components/MovieDetailInfo';

const API_KEY = '';
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getMediaDetails(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
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

async function getMediaVideos(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`);
  if (!res.ok) {
    return { results: [] };
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

async function getMediaReviews(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}/reviews?api_key=${API_KEY}`);
  if (!res.ok) {
    return { results: [] };
  }
  return res.json();
}

const getDirector = (crew) => {
  return crew.find(member => member.job === 'Director')?.name || 'Unknown';
};

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

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden md:flex">
          <div className="md:w-1/3 p-4">
            <MovieImage
              src={details.poster_path ? `${IMAGE_BASE_URL}${details.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
              alt={`Poster for ${mediaTitle}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-2">{mediaTitle}</h1>
            {mediaTagline && (
              <h2 className="text-xl font-light text-gray-400 mb-4">{mediaTagline}</h2>
            )}
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Movie Details</h2>
              <div className="flex items-center text-yellow-500 mb-2">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-300">{details.vote_average?.toFixed(1)}</span>
                <span className="mx-2 text-gray-500">|</span>
                <span className="text-gray-300">{mediaReleaseDate}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {details.genres?.map(genre => (
                  <Link key={genre.id} href={`/genre/${mediaType}/${genre.id}`} className="bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
                    {genre.name}
                  </Link>
                ))}
              </div>
              
              {/* Gunakan komponen MovieDetailInfo untuk menggantikan detail lama */}
              <MovieDetailInfo
                  status={details.status}
                  duration={details.runtime || details.episode_run_time?.[0]}
                  originalLanguage={details.original_language}
                  homepage={details.homepage}
                  director={director}
              />

              {/* Detail cast yang tidak berubah */}
              <div className="text-base text-gray-300 mb-1 leading-relaxed flex mt-4">
                <span className="mr-2">鹿</span>
                <div>
                  <strong>Actors:</strong>
                  <div className="mt-1">{cast.map(actor => actor.name).join(', ')}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-2">Synopsis</h3>
          <p className="text-gray-300 leading-relaxed text-justify">{mediaOverview}</p>
        </div>

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
            <p className="text-gray-500">No trailer available.</p>
          )}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">You Might Also Like</h3>
          {similarMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {similarMovies.map(item => (
                <MovieCard key={item.id} media={item} mediaType={mediaType} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No similar movies available.</p>
          )}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">User Reviews</h3>
          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map(review => (
                <div key={review.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-lg text-white">{review.author}</p>
                    {review.author_details.rating && (
                      <div className="flex items-center ml-4 text-yellow-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm ml-1 text-gray-300">{review.author_details.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm italic">Created on: {new Date(review.created_at).toLocaleDateString()}</p>
                  <p className="text-gray-300 mt-4 leading-relaxed">{review.content.split(' ').slice(0, 50).join(' ')}... <Link href={review.url} target="_blank" className="text-blue-400 hover:text-blue-300">Read more</Link></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </div>
        
        <div className="flex justify-center mt-12 mb-8">
          <WatchNowButton mediaType={mediaType} mediaId={id} />
        </div>
      </div>
    </div>
  );
}
