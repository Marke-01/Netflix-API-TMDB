// API key from TMDB
const api_key = "fed2c5b7cd99d8debc709214c9d62577";
// Base URL of the site
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${api_key}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?api_key=${api_key}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?api_key=${api_key}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function setBanner() {
    fetch(requests.fetchNetflixOriginals)
        .then((res) => res.json())
        .then((data) => {
            const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
            const banner = document.getElementById("banner");
            const banner_title = document.getElementById("banner_title");
            const banner_desc = document.getElementById("banner_description");

            banner.style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
            banner_desc.innerText = truncate(setMovie.overview, 150);
            banner_title.innerText = setMovie.name;
        });
}

function createRow(title, fetchURL, className) {
    fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";

            headrow.appendChild(row);

            const rowTitle = document.createElement("h2");
            rowTitle.className = "row_title";
            rowTitle.innerText = title;
            row.appendChild(rowTitle);

            const rowPosters = document.createElement("div");
            rowPosters.className = "row_posters";
            row.appendChild(rowPosters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row_poster";
                const posterId = movie.id;
                poster.id = posterId;
                poster.src = `${img_url}${movie.poster_path}`;
                rowPosters.appendChild(poster);
            });
        });
}

// Call the functions to set the banner and create rows
setBanner();
createRow("NETFLIX ORIGINALS", requests.fetchNetflixOriginals, "netflixrow");
createRow("Top Rated", requests.fetchTrending, "");
createRow("Action Movies", requests.fetchActionMovies, "");
createRow("Comedy Movies", requests.fetchComedyMovies, "");
createRow("Horror Movies", requests.fetchHorrorMovies, "");
createRow("Romance Movies", requests.fetchRomanceMovies, "");
createRow("Documentaries", requests.fetchDocumentaries, "");