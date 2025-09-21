import "../../css/Favorites.css";
import { useMovieContext } from "../../contexts/useMovieContext";
import MovieCard from "../MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h1 className="favorites-heading">No Favorite Movie Yet</h1>
        <h3 className="favorites-subheading">
          Add movies to your favorite page and they will display here
        </h3>
      </div>
    );
  }

  return (
    <>
    <div className="movies-grid-fav">
      {favorites.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
    </>
  );
}

export default Favorites;
