let container = document.querySelector(".poke-container") 


let pokeFetch = (pokeName) => fetch("https://pokeapi.co/api/v2/pokemon/"+pokeName).then(response => {
  if(response.status!=200)
    throw new Error("Lo sentimos, ese Pokemon no existe")
  else
    return response.json();
}).catch(err => alert(err));


document.querySelector(".search").addEventListener("click", (e) => {
  e.preventDefault();

  function sleep(duration) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, duration * 1000)
    })
  }

  container.innerHTML="";

  let pokeInputs = Array.from(document.querySelectorAll(".pokemon")).map(input => input.value);

  new Promise((resolve, reject) => {
    setTimeout(resolve, 1500)
    })
    .then(()=>
    {
      return pokeFetch(pokeInputs[0])
    })
    .then(pokemon => {
      let abilities=pokemon.abilities.map(ability => ability.ability.name)

      pokeAppend(pokeInputs[0], pokemon.sprites.front_shiny, abilities)
    })
    .then(()=>
    {
      return sleep(1.5)
    })
    .then((loading)=>
    {
      console.log(loading)
      return pokeFetch(pokeInputs[1])
    })
    .then(pokemon => {
      let abilities=pokemon.abilities.map(ability => ability.ability.name)

      pokeAppend(pokeInputs[1], pokemon.sprites.front_shiny, abilities)
    })
    .then(()=>
    {
      return sleep(1.5)
    })
    .then(()=>
    {
      return pokeFetch(pokeInputs[2])
    })
    .then(pokemon => {
      let abilities=pokemon.abilities.map(ability => ability.ability.name)

      pokeAppend(pokeInputs[2], pokemon.sprites.front_shiny, abilities)
    })


}) // addEventListener



function pokeAppend(name, image, abilities) {

  let pokeDiv=document.createElement("div");
  pokeDiv.classList.add("poke-div")
  let pokeTitle=document.createElement("h3");
  pokeTitle.setAttribute("class", "poke-title")
  pokeTitle.textContent=`Elegiste a ${name}!`;
  let pokeImg=document.createElement("img");
  pokeImg.setAttribute("src", image);
  pokeImg.style.width="150px";
  let pokeAbilities=document.createElement("h3");
  pokeAbilities.textContent="Habilidades:";
  pokeAbilities.classList.add("poke-title");
  pokeAbilities.style.fontSize="14px";
  let pokeAbilitiesUl=document.createElement("ul");

  abilities.forEach(ability => {
    let abilityLi=document.createElement("li");
    abilityLi.textContent=ability;
    abilityLi.style.color="#888";

    pokeAbilitiesUl.appendChild(abilityLi)
  });

  let content=[pokeTitle, pokeImg, pokeAbilities, pokeAbilitiesUl];

  content.forEach(element => pokeDiv.appendChild(element));

  container.appendChild(pokeDiv);
}