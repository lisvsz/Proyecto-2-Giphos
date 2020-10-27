//Variables Mis favoritos


/*fetch(`https://api.giphy.com/v1/gifs?api_key=PlzoJMPs7k0ixQrxRj53HDBKPN2s0zqT&ids=${ids}`).then(response => response.json())
.then(json => {
    let arrayMyG = json.data;
    console.log(arrayMyG);

    for( let i=0; i < arrayMyG.length; i++) {
    noMine.style.display = 'none';

    let imgMyGif = arrayMyG[i].images.downsized.url;
    console.log(imgMyGif);

    let myGifTitle = arrayMyG[i].title;
    console.log(myGifTitle);
    
    let myGifUser = arrayMyG[i].username;
    console.log(myGifUser);

    let myGifImg = document.createElement('img');
    myGifImg.alt = 'gif';    
    myGifImg.src = imgMyGif;

    let cardMGif = document.createElement('div');
    cardMGif.append(myGifImg);
    gridMyGif.className = 'gridFormat'; 
    gridMyGif.appendChild(cardMGif);
    }
})*/

///

//cuando se pulsa en "agregar a favoritos"
document.getElementById("agregar-favoritos").addEventListener("click", function(e) {

  // hacemos que no se ejecute el enlace
  e.preventDefault();

  // leemos los datos clave del producto y los guardamos en un objeto
  var datos = {
    id: document.getElementById("producto-id").value,
    nombre: document.getElementById("producto-nombre").textContent,
    url: document.location.href
  };

  // leemos los favoritos del localStorage
  var favoritos = localStorage.getItem("favoritos") || "[]";
  favoritos = JSON.parse(favoritos);

  // buscamos el producto en la lista de favoritos
  var posLista = favoritos.findIndex(function(e) { return e.id == datos.id; });
  if (posLista > -1) {
    // si está, lo quitamos
    favoritos.splice(posLista, 1);
  } else {
    // si no está, lo añadimos
    favoritos.push(datos);
  }

  // guardamos la lista de favoritos 
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

});
