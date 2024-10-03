let watchlist = JSON.parse(localStorage.getItem("list")) || [];
async function handleSearch() {
  document.getElementById("film-list").innerHTML = "";
  let searchText = await document.getElementById("search-input").value;
  console.log(searchText);
  const promise = await fetch(
    `http://www.omdbapi.com/?apikey="your-key"&/type=movie&t=${searchText}`
  );
  const res = await promise.json();
  console.log(res);
  searchResult(res);
}

function handleAdd(id, item) {
  let i = {
    key: `${id}`,
    value: `${item}`,
  };
  watchlist.push(i);
  localStorage.setItem("list", JSON.stringify(watchlist));
  let x = JSON.parse(localStorage.getItem("list"));
  
  console.log(x);
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("watchlist")) {
      renderWatchlist(watchlist);
    }
  });

function searchResult(res) {
  let item = ` <li id="${res.Title}">
                        <img src="${res.Poster}">
                        <div id="card">
                            <h3>${res.Title} <p>${res.imdbRating}</p></h3> 
                            <div id="sum">
                            <p>${res.Runtime}</p>
                            <p>${res.Genre}</p>
                            <button id="add-btn">
                            <i class="fa fa-plus" style="font-size:12px;"></i>
                            Watchlist
                            </button>
                            </div>
                            <p id="plot">${res.Plot}</p>
                            
                        </div>
                    </li>`;
let item2 = ` <li id="${res.Title}">
                        <img src="${res.Poster}">
                        <div id="card">
                            <h3>${res.Title} <p>${res.imdbRating}</p></h3> 
                            <div id="sum">
                            <p>${res.Runtime}</p>
                            <p>${res.Genre}</p>
                            </div>
                            <p id="plot">${res.Plot}</p>
                            
                        </div>
                    </li>`;
  let id = `${res.Title}`;
  document.getElementById("film-list").innerHTML = item;
  document.getElementById("add-btn").addEventListener("click", function () {
    handleAdd(id, item2);
  });

  return item;
}

function renderWatchlist(list) {
  console.log(list);
  document.getElementById("watchlist").innerHTML = "";

  for (let i=0;i<list.length;i++) {
    document.getElementById("watchlist").innerHTML += list[i].value;
  };
   
}

const searchbtnEl = document.getElementById("search-btn");
if (searchbtnEl) {
  searchbtnEl.addEventListener("click", handleSearch);
}
