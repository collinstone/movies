import { useState, useEffect, useCallback } from "react";

const API_KEY = "b9f5da6dec91b97480653e1b8e0682da";
const BASE_URL = "https://api.themoviedb.org/3";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [mode, setMode] = useState("popular"); // or "search"
  const [searchQuery, setSearchQuery] = useState(""); // store current search term

  const fetchPopular = useCallback(async (pageToFetch) => {
    try {
      setLoading(true);
      const resp = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageToFetch}`
      );
      if (!resp.ok) {
        throw new Error(`Popular fetch error: ${resp.status}`);
      }
      const data = await resp.json();
      if (data && data.results) {
        setMovies(prev => [...prev, ...data.results]);
        if (pageToFetch >= data.total_pages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSearch = useCallback(async (query, pageToFetch) => {
    try {
      setLoading(true);
      const resp = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=${pageToFetch}`
      );
      if (!resp.ok) {
        throw new Error(`Search fetch error: ${resp.status}`);
      }
      const data = await resp.json();
      if (data && data.results) {
        if (pageToFetch === 1) {
          // first page after new search: replace
          setMovies(data.results);
        } else {
          // subsequent pages: append
          setMovies(prev => [...prev, ...data.results]);
        }
        if (pageToFetch >= data.total_pages) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        if (pageToFetch === 1) {
          setMovies([]);
        }
        setHasMore(false);
      }
      setError(null);
    } catch (err) {
      console.error("Error searching movies:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage(prev => prev + 1);
  };

  // When "mode" or "page" changes, trigger fetch
  useEffect(() => {
    if (mode === "popular") {
      fetchPopular(page);
    } else if (mode === "search") {
      fetchSearch(searchQuery, page);
    }
  }, [mode, searchQuery, page, fetchPopular, fetchSearch]);

  const doSearch = (query) => {
    // Called by component to start a search
    if (!query.trim()) {
      // If empty query, revert to popular mode
      setMode("popular");
      setMovies([]);  // clear
      setPage(1);
      setHasMore(true);
      setSearchQuery("");
      return;
    }
    setMode("search");
    setMovies([]);   // reset old results
    setPage(1);
    setHasMore(true);
    setSearchQuery(query);
    // fetchSearch will be triggered by effect
  };

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
    doSearch,
  };
}
