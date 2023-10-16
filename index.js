const url = "https://japceibal.github.io/japflix_api/movies-data.json";
let pelis = [];

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        pelis = data;
    });

let boton = document.getElementById("btnBuscar")
boton.addEventListener("click", showData)

function showData() {

    const inputBuscar = document.getElementById("inputBuscar").value.toLowerCase();
    let lista = "";

    pelis.forEach((peli) => {
        const genr = peli.genres.map((genre) => " " + genre.name);
        const genres = JSON.stringify(genr).toLowerCase();
        if (
            peli.title.toLowerCase().includes(inputBuscar) ||
            peli.tagline.toLowerCase().includes(inputBuscar) ||
            peli.overview.toLowerCase().includes(inputBuscar) ||
            genres.includes(inputBuscar)
        ) {          
          let anio = peli.release_date.substring(0, 4);
            lista += `
          <div class="list-group-item list-group-item-dark list-group-item-action cursor-active">
            <div class="row" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
              <div class="col-10">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${peli.title}</h4>
                </div>
                <p class="mb-1">${peli.tagline}</p>
              </div>
              <div class="col-2 text-end">
              `+estrellas(peli.vote_average)+`
              </div>
            </div>
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">${peli.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
              ${peli.overview}
              </div>
               <div class="row offcanvas-body">
                  <div class="col-11 text-muted"><b>${genr}</b></div>
                  <div class="col-1">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><p class="dropdown-item">Year: ${anio}</p></li>
                  <li><p class="dropdown-item" >Runtime: ${peli.runtime} mins</p></li>
                  <li><p class="dropdown-item" >Budget: $${peli.budget}</p></li>
                  <li><p class="dropdown-item" >Revenue: $${peli.revenue}</p></li>
                </ul>
                </div>    
              </div>
            </div>
          </div>`;
          document.getElementById("lista").innerHTML = lista;
        }
      });
    }

function estrellas(voteAverage) {
  let votos = "";
  for (let i = 0; i < Math.floor(voteAverage); i++) {
    votos += '<i class="fa fa-star" aria-hidden="true"></i>';
  }
  if (voteAverage - Math.floor(voteAverage) >= 0.5) { 
    votos += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
  }
  return votos;
}