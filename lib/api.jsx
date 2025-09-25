// api.jsx

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TMDB_API_URL;

// Fungsi helper untuk fetch data
const fetchApi = async (path, options = {}) => {
  if (!apiKey || !apiUrl) {
    throw new Error('API keys are not configured. Please check your .env.local file.');
  }

  const url = `${apiUrl}${path}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url, {
    cache: 'no-store', // Memastikan data selalu baru
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`API Error: ${errorData.status_message}`);
  }

  return res.json();
};

// Fungsi untuk mendapatkan film berdasarkan ID
export async function getMovieById(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan ID
export async function getTvSeriesById(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series details for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan video (trailer) film
export async function getMovieVideos(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/videos`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan video (trailer) serial TV
export async function getTvSeriesVideos(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/videos`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series videos for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) film
export async function getMovieCredits(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie credits for ID ${movieId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan film
export async function getMovieReviews(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie reviews for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan kredit (aktor dan kru) serial TV
export async function getTvSeriesCredits(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV series credits for ID ${tvId}:`, error);
    return null;
  }
}

// Fungsi untuk mendapatkan ulasan serial TV
export async function getTvSeriesReviews(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series reviews for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film atau serial TV berdasarkan query
export async function searchMoviesAndTv(query, page = 1) {
  try {
    const data = await fetchApi(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching search results for query '${query}':`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan kategori
export async function getMoviesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/movie/${category}?page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan kategori
export async function getTvSeriesByCategory(category, page = 1) {
  try {
    const data = await fetchApi(`/tv/${category}?page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} TV series:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film serupa
export async function getSimilarMovies(movieId) {
  try {
    const data = await fetchApi(`/movie/${movieId}/similar`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV serupa
export async function getSimilarTvSeries(tvId) {
  try {
    const data = await fetchApi(`/tv/${tvId}/similar`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar TV series for ID ${tvId}:`, error);
    return [];
  }
}

// Fungsi untuk mencari film berdasarkan judul
export const getMovieByTitle = async (title) => {
    try {
        const data = await fetchApi(`/search/movie?query=${encodeURIComponent(title)}`);
        return data.results && data.results.length > 0 ? data.results : null;
    } catch (error) {
        console.error(`Error fetching movie by title: ${title}`, error);
        return null;
    }
};

// Fungsi untuk mencari serial TV berdasarkan judul
export const getTvSeriesByTitle = async (title) => {
  try {
    const data = await fetchApi(`/search/tv?query=${encodeURIComponent(title)}`);
    return data.results && data.results.length > 0 ? data.results : null;
  } catch (error) {
    console.error(`Error fetching TV series by title: ${title}`, error);
    return null;
  }
};

// Fungsi untuk mendapatkan daftar genre film
export async function getMovieGenres() {
  try {
    const data = await fetchApi('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan daftar genre serial TV
export async function getTvSeriesGenres() {
  try {
    const data = await fetchApi('/genre/tv/list');
    return data.genres;
  } catch (error) {
    console.error('Error fetching TV series genres:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan genre
export async function getMoviesByGenre(genreId, page = 1) {
  try {
    const data = await fetchApi(`/discover/movie?with_genres=${genreId}&page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movies by genre ID ${genreId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV berdasarkan genre
export async function getTvSeriesByGenre(genreId, page = 1) {
  try {
    const data = await fetchApi(`/discover/tv?with_genres=${genreId}&page=${page}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV series by genre ID ${genreId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film trending harian
export async function getTrendingMoviesDaily(page = 1) {
  try {
    const data = await fetchApi(`/trending/movie/day?page=${page}`);
    return data.results;
  } catch (error) {
    console.error('Error fetching daily trending movies:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan serial TV trending harian
export async function getTrendingTvSeriesDaily(page = 1) {
  try {
    const data = await fetchApi(`/trending/tv/day?page=${page}`);
    return data.results;
  } catch (error) {
    console.error('Error fetching daily trending TV series:', error);
    return [];
  }
}

// Fungsi untuk mendapatkan film berdasarkan keyword ID (erotic)
export async function getMoviesByKeyword(keywordId = 256466, page = 1) {
  try {
    console.log(`Fetching movies by keyword: ${keywordId}, page: ${page}`);
    const data = await fetchApi(`/discover/movie?with_keywords=${keywordId}&page=${page}`);
    console.log(`Movies by keyword result:`, data.results?.length || 0);
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching movies by keyword ID ${keywordId}:`, error);
    return [];
  }
}

// Fungsi untuk mendapatkan film dari list ID (adult)
export async function getMoviesByList(listId = "143347", page = 1) {
  try {
    console.log(`Fetching movies from list: ${listId}, page: ${page}`);
    const data = await fetchApi(`/list/${listId}?page=${page}`);
    console.log(`Movies from list result:`, data.items?.length || 0);
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching movies from list ID ${listId}:`, error);
    return [];
  }
}

// Fungsi untuk membuat slug dari judul
export const createSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Hapus karakter tidak valid
    .replace(/\s+/g, '-') // Ganti spasi dengan dash
    .replace(/-+/g, '-') // Gabungkan multiple dash
    .trim();
};