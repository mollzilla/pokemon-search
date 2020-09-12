let fetch1= fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(response => response.json());
let fetch2= fetch("https://pokeapi.co/api/v2/pokemon/eevee").then(response => response.json());
let fetch3= fetch("https://pokeapi.co/api/v2/pokemon/flareon").then(response => response.json());

Promise.all([fetch1, fetch2, fetch3])
  .then(data =>  {
    console.log(data)
    data.forEach(x => addToDOM(x));
  }).catch(err => {
    console.log(err);
  }) ;

  function addToDOM(info) {
    let ctn=document.createElement('div');
    let name=document.createElement('h2')
    name.textContent=`${info.name} #${info.id}`;
    let img=document.createElement('img');
    img.setAttribute("src", info.sprites.front_default);
    ctn.appendChild(name);
    ctn.appendChild(img);

    document.querySelector(".pokecont").appendChild(ctn);
  }


  /* genera un array con 10 posiciones numericas */

  let array=[1,2,3,4,5,6,7,8,9,10];
  
  /* tres aleatorios */

  let number1=Math.floor(Math.random()*10);
  let number2=Math.floor(Math.random()*10);
  let number3=Math.floor(Math.random()*10);

  let pos1=array[number1];
  let pos2=array[number2];
  let pos3=array[number3];


let fetch1= fetch("https://pokeapi.co/api/pokemon"+pos1).then(data => data.json());
let fetch2= fetch("https://pokeapi.co/api/pokemon"+pos2).then(data => data.json());
let fetch3= fetch("https://pokeapi.co/api/pokemon"+pos3).then(data => data.json());

/* la que resuelva primero */

Promise.race([fetch1, fetch2, fetch3]).then(result => {
  console.log(result);
});

/* que una de error*/


let array=[1,2,3,4,5,"bart",7,8,9,10];
  
/* tres aleatorios */

let number21=Math.floor(Math.random()*10);
let number22=Math.floor(Math.random()*10);
let number23=Math.floor(Math.random()*10);

let pos21=array[number21];
let pos22=array[number22];
let pos23=array[number23];


let fetch21= fetch("https://pokeapi.co/api/pokemon"+pos1).then(data => data.json());
let fetch22= fetch("https://pokeapi.co/api/pokemon"+pos2).then(data => data.json());
let fetch23= fetch("https://pokeapi.co/api/pokemon"+pos3).then(data => data.json());

/* la que resuelva primero */

Promise.race([fetch21, fetch22, fetch23]).then(result => {
console.log(result);
});
