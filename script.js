const apiKey = '';
const apiUrl = '';
const movieList = document.getElementById('movies');
const movieDetails = document.getElementById('movie-details');
const detailsContainer = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const favoritesList = document.getElementById('favorites-list');
const addToFavoritesButton = document.getElementById('add-to-favorites');
let selectedMovieId = null;
let selectedMovies = JSON.parse(localStorage.getItemL('favorites')) || [];

//para obtener peliculas populares//
async function fetchPopularMovies() {
    try {
        const response = await fetch(apiUrl);
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching popular movies', error);
    }
}

//Display movies
function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach (movie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <span>${movie.title}</span>
            `;
            li.onclick = () => showMovieDetails(movie.id);//muestra detalles al hacer click en la pelicula
            movieList.appendChild(li);
    });
}

//muestra detalles de peliculas
async function showMovieDetails(movieId) {
    try {
        
    } catch (error) {
        console.error('Error fetching movie details',error);
    }
}

//busca peliculas
searchButton.addEventListener('click', async() => {
    const query = searchInput.value;
    if(query) {
        try {
            
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }
});

//Añade a peliculas favoritas
addToFavoritesButton.addEventListener('click', () => {
    if(selectedMovieId) {
        const favoriteMovie = {
            id: selectedMovieId,
            title: document.querySelector('#details h3').textContent
        };
        if(!favoriteMovies.some(movie => movie.id === selectedMovieId)) {
            favoriteMovie.push(favoriteMovie);
            localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
            //guarda en localStorage
            displayFavorites();//muestra la lista actualiza de favoritos
        }
    }
});
//mostra peliculas favoritas
function displayFavorites() {
    favoritesList.innerHTML = '';//Limpia la lista de favoritas
    favoriteMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        favoritesList.appendChild(li);
    });
}
//busqueda inicial de peliculas populares y favoritos de visualizacion
fetchPopularMovies();
displayFavorites();