const apiKey = 'd48b550f5add6c862a9ba5b8d330b873';
const apiUrl = 'https://api.themoviedb.org/3';
const movieList = document.getElementById('movies');
const movieDetails = document.getElementById('movie-details');
const detailsContainer = document.getElementById('details');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const favoritesList = document.getElementById('favorites-list');
const addToFavoritesButton = document.getElementById('add-to-favorites');
let selectedMovieId = null;
let favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];

//para obtener peliculas populares//
async function fetchPopularMovies() {
    try {
        const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`);
        const movies = await response.json();
        displayMovies(movies.results);
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
        const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
        const details = await response.json();
    //muestra los detalles
        detailsContainer.innerHTML = `
        <h2>${details.title}</h2>
       
        <img src="https://image.tmdb.org/t/p/w500${details.poster_path}"alt="${details.title}">
        <p>${details.overview}</p>
        <p>Fecha de lanzamiento: ${details.release_date}</p>`;
        movieDetails.classList.remove('hidden');
        selectedMovieId = details.id;//id de la pelicula selecionada
        
    } catch (error) {
        console.error('Error fetching movie details',error);
    }
}

//busca peliculas
searchButton.addEventListener('click', async() => {
    const query = searchInput.value.trim();//trim para eliminar espacios inecesarios
    if(query) {
        try {
            const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
            const results = await response.json();
            displayMovies(results.results);//muestra resultados de busqueda
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
            title: document.querySelector('#details h2').textContent
        };
        if(!favoriteMovies.some(movie => movie.id === selectedMovieId)) {
            favoriteMovies.push(favoriteMovie);
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