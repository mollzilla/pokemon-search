let container = document.querySelector(".poke-container");

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


function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, duration * 1000)
  })
}


async function search() {

  async function pokeSearch(pokeName) {

    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`; //  la api keyla pide dentro del querystring

      const res = await fetch(url);

      if (res.status != 200)
      {
        document.querySelector(".loading").style.display = "none";
        throw new Error("Lo sentimos, ese Pokemon no existe");
      }
      else
      {
        const info = await res.json();
        return info;
      }

    } catch (err) {
      alert(err)
    }
  }

  container.innerHTML = "";

  let pokeInputs = Array.from(document.querySelectorAll(".pokemon")).map(input => input.value);

  if (pokeInputs.find(x => x == "") != undefined) {
    console.log("entro")
    alert("Por favor insertá 3 Pokemones");
    return;
  }

    async function pokeMerge(pokeInput) {

    let pokemon = await pokeSearch(pokeInput);
    if(pokemon)
    {
      await progressBar();
      await sleep(1.5);
      let abilities = pokemon.abilities.map(ability => ability.ability.name);
      await pokeAppend(pokeInput, pokemon.sprites.front_shiny, abilities)
    }
  }

  await pokeMerge(pokeInputs[0]);
  await pokeMerge(pokeInputs[1]);
  await pokeMerge(pokeInputs[2]);
  
  setTimeout(() => { document.querySelector(".loading").style.display = "none" }, 200);
}


document.querySelector(".search").addEventListener("click", (e) => {
  e.preventDefault();
  search();
});


//  Async produce la impresión incorrecta sobre el flujo del programa
//  hace que parezca que el programa se frena esperando la función asíncrona
//  si a  func(args) le ponés async adelante es lo mismo que ponerle  (args) =>  Promise.resolve(func(args))(args)
//  o sea, modifica la función para que devuelva una promesa que resuleva a lo que devuelve la función
//  y poner await es lo mismo que poner .then() a esa pomesa
