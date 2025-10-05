import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMovies } from "../../../src/hooks/useMovies";  // adjust the path
import MovieCard from "../MovieCard";
import "../../css/Home.css";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const { movies, loading, error, hasMore, loadMore, doSearch } = useMovies();

  const handleSearch = (e) => {
    e.preventDefault();
    doSearch(searchInput);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for Movies..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p>Error: {error.toString()}</p>}

      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading…</h4>}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <b>You have seen all the movies!</b>
          </p>
        }
      >
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </InfiniteScroll>

      {loading && movies.length === 0 && <h4>Loading initial movies...</h4>}
    </div>
  );
}

export default Home;
