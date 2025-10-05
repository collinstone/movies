import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // Initialize state from localStorage (so the first render uses stored data, not empty array)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    // Only write to localStorage if favorites changed
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage:", e);
    }
  }, [favorites]);

  const addFavorites = (movie) => {
    setFavorites(prev => {
      // Prevent duplicates
      if (prev.some(m => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorites = (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId));
  };

  const isFavorites = (movieId) => {
    return favorites.some(m => m.id === movieId);
  };

  const value = {
    favorites,
    addFavorites,
    removeFavorites,
    isFavorites,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
