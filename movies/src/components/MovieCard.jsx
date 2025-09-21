import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/useMovieContext';
function MovieCard ({movie}) {
    const { isFavorites, addToFavorites, removeFavorites } = useMovieContext();
    const favorite = isFavorites(movie.id);

    const likeButton = (e) => {
        e.preventDefault()
        if(favorite) {
            removeFavorites(movie.id)
        }

        else {
            addToFavorites(movie)
        }
    }
    return(
    
            <div className = "movie-card">
                <div className = "movie-poster">
                    <img src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt = {movie.title} />
                </div>
                <div className = "movie-overlay">
                   <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={likeButton}
                        type="button"
                        >
                        🤍
                    </button>
                 </div>
                <div className = "movie-info">
                    <h3> {movie.title}</h3>
                    <p> {movie.release_date?.split("-")[0]} </p>
                </div>
            </div>
    );

}
export default MovieCard;