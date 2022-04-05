const darkMode = document.querySelector(".dark-mode");
const lightMode = document.querySelector(".light-mode");
const searchBar = document.querySelector(".search-bar");
const movieList = document.querySelector(".movie-list");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
let movieArray = JSON.parse(localStorage.getItem("watchlist")) || [];

darkMode.addEventListener("click", () => {
	darkMode.style.display = "none";
	lightMode.style.display = "block";
	searchBar.style.border = "none";
	searchBar.style.background = "#2e2e2f";
	for (let i = 0; i < searchBar.childElementCount; i++) {
		searchBar.children[i].style.background = "#2e2e2f";
		searchBar.children[i].style.color = "#a5a5a5";
	}
	movieList.style.background = "#121212";
	movieList.style.color = "#fff";
	document.body.style.background = "#121212";
});
lightMode.addEventListener("click", () => {
	lightMode.style.display = "none";
	darkMode.style.display = "block";
	searchBar.style.border = "1px solid #9ca3af";
	searchBar.style.background = "#fff";
	for (let i = 0; i < searchBar.childElementCount; i++) {
		searchBar.children[i].style.background = "#fff";
		searchBar.children[i].style.color = "#374151";
	}
	movieList.style.background = "#fff";
	movieList.style.color = "#000";
	document.body.style.background = "#fff";
});

searchBtn.addEventListener("click", () => {
	fetch(`http://www.omdbapi.com/?apikey=e4c61544&s=${searchInput.value}&r=json`)
		.then((res) => res.json())
		.then((data) => {
			movieList.innerHTML = "";
			if (data.Response == "True") {
				data.Search.forEach((movie) => {
					fetch(`http://www.omdbapi.com/?apikey=e4c61544&i=${movie.imdbID}`)
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
                                        onclick="addToWatchlist('${data.imdbID}')" 
                                        class="wishlist"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
                                    </div>
                                    <p>${data.Plot}</p>
                                </div>
                            </div>`;
							if (movieArray.includes(data.imdbID)) {
								const currentWatchlistItem = document.getElementById(data.imdbID);
								currentWatchlistItem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Added`;
							}
						})
						.catch((error) => console.log(error));
				});
			} else {
				movieList.innerHTML = `<p class="empty-par">Unable to find what you're lookin for.Please try another search.</p>`;
			}
			searchInput.value = "";
		})
		.catch((error) => console.log(error));
});

function addToWatchlist(id) {
	if (!movieArray.includes(id)) {
		movieArray.push(id);
		localStorage.setItem("watchlist", JSON.stringify(movieArray));
		const currentWatchlistItem = document.getElementById(id);
		currentWatchlistItem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Added`;
	}
}
