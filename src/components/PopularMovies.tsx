import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PopularMovies.css";

const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("now_playing");
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (err: any) {
        console.error("Error fetching genres: ", err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiUrl = `https://api.themoviedb.org/3/movie/${selectedTopic}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`;
        const response = await axios.get(apiUrl);
        setMovies(response.data.results || []);
        setTotalPages(response.data.total_pages); 
        setError(null);
      } catch (err: any) {
        setError("Ocurrió un error al buscar las películas.");
        console.error(err);
      }
    };

    fetchMovies();
  }, [currentPage, selectedTopic]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const calculateStars = (rating: number) => {
    return Math.round((rating / 10) * 5);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="PopularMovies-categories">
        <button
          className={selectedTopic === "now_playing" ? "selected" : ""}
          onClick={() => setSelectedTopic("now_playing")}
        >
          Now Playing
        </button>
        <button
          className={selectedTopic === "popular" ? "selected" : ""}
          onClick={() => setSelectedTopic("popular")}
        >
          Popular
        </button>
        <button
          className={selectedTopic === "top_rated" ? "selected" : ""}
          onClick={() => setSelectedTopic("top_rated")}
        >
          Top Rated
        </button>
        <button
          className={selectedTopic === "upcoming" ? "selected" : ""}
          onClick={() => setSelectedTopic("upcoming")}
        >
          Upcoming
        </button>
      </div>
      <div className="PopularMovies-container">
        {movies.slice(0, 15).map((movie: any) => (
          <div className="PopularMovies-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-details">
              <h4>{movie.title}</h4>
              <p>Year: {movie.release_date.split("-")[0]}</p>
              <p>
                Genres:{" "}
                {movie.genre_ids
                  .map(
                    (id: number) =>
                      genres.find((genre) => genre.id === id)?.name
                  )
                  .join(", ")}
              </p>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < calculateStars(movie.vote_average) ? "filled" : ""
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>
                Description:{" "}
                {movie.overview.length > 80
                  ? movie.overview.substring(0, 77) + "..."
                  : movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="PopularMovies-pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Anterior</button>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>{" "}
        {/* Mostrar el total de páginas */}
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
};

export default PopularMovies;
