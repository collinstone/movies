const API_KEY = "b9f5da6dec91b97480653e1b8e0682da";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularmovies = async() =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    return data.results;
};

export const searchMovies = async(query) =>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data.results;
};