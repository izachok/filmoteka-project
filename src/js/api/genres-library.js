import genres from '../../data/genres.json';

//genreIds - array with ids
export const getGenresByIds = function (genreIds) {
  if (!Array.isArray(genreIds)) return [];
  return genres.filter(genre => genreIds.includes(genre.id));
};
