import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/useMovieContext';
function MovieCard ({movie}) {
    const { isFavorites, addFavorites, removeFavorites } = useMovieContext();
    const favorite = isFavorites(movie.id);

    const likeButton = (e) => {
        e.preventDefault()
        if(favorite) {
            removeFavorites(movie.id)
        }

        else {
            addFavorites(movie)
        }
    }
    return(
    
            <div className = "movie-card">
                <div className="movie-poster">
                    <a
                        href="https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011&linkCode=ll2&tag=austincolli04-20&linkId=f256cd6a725abfcae03cb777f4ece6bb&language=en_US&ref_=as_li_ss_tl"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ cursor: "pointer" }}
                        />
                    </a>
                </div>

                
                   <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={likeButton}
                        type="button"
                        >
                        🤍
                    </button>
                 
                <div className = "movie-info">
                    <h3> {movie.title}</h3>
                    <p> {movie.release_date?.split("-")[0]} </p>
                                    </div>
                    <a
                    href="https://www.amazon.com/Amazon-Video/b?ie=UTF8&node=2858778011&linkCode=ll2&tag=austincolli04-20&linkId=f256cd6a725abfcae03cb777f4ece6bb&language=en_US&ref_=as_li_ss_tl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold"
                    >
                    Watch it now on Amazon 🎬
                    </a>
            </div>
    );

}
export default MovieCard;