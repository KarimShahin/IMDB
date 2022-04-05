const darkMode = document.querySelector(".dark-mode");
const lightMode = document.querySelector(".light-mode");
const movieList = document.querySelector(".movie-list");
let movieArray = JSON.parse(localStorage.getItem("watchlist")) || [];

function render() {
	if (movieArray.length !== 0) {
		movieList.innerHTML = "";
		movieArray.forEach((movie) => {
			fetch(`http://www.omdbapi.com/?apikey=e4c61544&i=${movie}&r=json`)
				.then((res) => res.json())
				.then((data) => {
					movieList.innerHTML += `<div class="movie">
                        <img src="${data.Poster}" />
                        <div class="movie-data">
                            <h1>${data.Title}<span><i class="fa-solid fa-star"></i>
                            ${data.Ratings[0].Value.split("/")[0]}</span></h1>
                            <div class="movie-subtitle">
                                <h2>${data.Runtime}</h2>
                                <h2>${data.Genre}</h2>
                                <button id="${data.imdbID}" 
                                onclick="removeFromWatchlist('${data.imdbID}')" 
                                class="wishlist"><i class="fa-solid fa-circle-minus"></i>remove</button>
                            </div>
                            <p>${data.Plot}</p>
                        </div>
                    </div>`;
				});
		});
	}
}

window.onload = render();

darkMode.addEventListener("click", () => {
	darkMode.style.display = "none";
	lightMode.style.display = "block";
	movieList.style.background = "#121212";
	movieList.style.color = "#fff";
	document.body.style.background = "#121212";
});
lightMode.addEventListener("click", () => {
	lightMode.style.display = "none";
	darkMode.style.display = "block";
	movieList.style.background = "#fff";
	movieList.style.color = "#000";
	document.body.style.background = "#fff";
});

function removeFromWatchlist(id) {
	movieArray = movieArray.filter((movieID) => movieID != id);
	localStorage.setItem("watchlist", JSON.stringify(movieArray));
	render();
}
