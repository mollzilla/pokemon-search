let container = document.querySelector(".poke-container");

let pokeFetch = (pokeName) => fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName).then(response => {
  if (response.status != 200)
    throw new Error("Lo sentimos, ese Pokemon no existe")

  else
    return response.json();
}).catch(err =>{
   document.querySelector(".loading").style.display="none";
   alert(err)
  });


document.querySelector(".search").addEventListener("click", (e) => {
  e.preventDefault();

  function sleep(duration) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, duration * 1000)
    })
  }

  container.innerHTML = "";

  let pokeInputs = Array.from(document.querySelectorAll(".pokemon")).map(input => input.value);
  // Valida que los 3 inputs estén completos y sean numéricos al momento de presionar buscar.




  new Promise((resolve, reject) => {
    progressBar();
    resolve(sleep(1.5))
  })
    .then(() => {
      return pokeFetch(pokeInputs[0])
    })
    .then(pokemon => {
      let abilities = pokemon.abilities.map(ability => ability.ability.name)

      pokeAppend(pokeInputs[0], pokemon.sprites.front_shiny, abilities)
    })
    .then(() => {
      progressBar();
      return sleep(1.5)
    })
    .then((loading) => {
      console.log(loading)
      return pokeFetch(pokeInputs[1])
    })
    .then(pokemon => {
      let abilities = pokemon.abilities.map(ability => ability.ability.name)

      pokeAppend(pokeInputs[1], pokemon.sprites.front_shiny, abilities)
    })
    .then(() => {
      progressBar();
      return sleep(1.5)
    })
    .then(() => {
      return pokeFetch(pokeInputs[2])
    })
    .then(pokemon => {
      let abilities = pokemon.abilities.map(ability => ability.ability.name)

      pokeAppend(pokeInputs[2], pokemon.sprites.front_shiny, abilities)
    }).then(() => {
      setTimeout(() => {document.querySelector(".loading").style.display="none"}, 200);
    })


}) // addEventListener



function pokeAppend(name, image, abilities) {

  let pokeDiv = document.createElement("div");
  pokeDiv.classList.add("poke-div", "poke-div-results");
  let pokeTitle = document.createElement("h3");
  pokeTitle.setAttribute("class", "poke-title")
  pokeTitle.textContent = `Elegiste a ${name}!`;
  let pokeImg = document.createElement("img");
  pokeImg.setAttribute("src", image);
  pokeImg.style.width = "150px";
  let pokeAbilities = document.createElement("h3");
  pokeAbilities.textContent = "Habilidades:";
  pokeAbilities.classList.add("poke-title");
  pokeAbilities.style.fontSize = "14px";
  let pokeAbilitiesUl = document.createElement("ul");

  abilities.forEach(ability => {
    let abilityLi = document.createElement("li");
    abilityLi.textContent = ability;
    abilityLi.style.color = "#888";

    pokeAbilitiesUl.appendChild(abilityLi)
  });

  let content = [pokeTitle, pokeImg, pokeAbilities, pokeAbilitiesUl];

  content.forEach(element => pokeDiv.appendChild(element));

  container.appendChild(pokeDiv);
}

function progressBar() {
  document.querySelector(".loading").style.display = "block";

  /* progress bar */

  let percent = document.querySelector(".percent");
  let progress = document.querySelector(".progress");
  let percentText = document.querySelector(".percent-text");
  let count = 4;
  let per = 16;
  let loading = setInterval(animate, 15)

  function animate() {

    if (count == 100 && per == 400) {
      percentText.style.display = "block";
      clearInterval(loading);
    } else {
      per = per + 4;
      count = count + 1;
      progress.style.width = per + 'px';
      percent.textContent = count + '%'
    }

  }
}

