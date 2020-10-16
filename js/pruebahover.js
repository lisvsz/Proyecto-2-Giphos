function createPurpleGif(user, titleGifo, url, index) {

    // se crean los tags que componen al tag purple.
    let principalDiv = document.createElement("div");
    let imgHover = document.createElement("img");
    let downDiv = document.createElement("div");
    let imgDown = document.createElement("img");
    let maxDiv = document.createElement("div");
    let maxImg = document.createElement("img");
    let paragraph = document.createElement("p");
    let title = document.createElement("h4");

    // se agregan los atributos de los tags.
    principalDiv.classList.add("cardResults");
    principalDiv.id = "cardResults";

    imgHover.src = paintHeartSearch (titleGifo);
    imgHover.alt = "iconFavCR";
    imgHover.id = "favCR";
    imgHover.classList.add("favCR");
    //se agrega el evento para el corazon.
    imgHover.onclick = () => { eraseHeartS (imgHover, user, titleGifo, url) };

    downDiv.classList.add("downCR");
    downDiv.id = "downCR";

    imgDown.src = "img/icon-download.svg";
    imgDown.alt = "iconDownCR";
    imgDown.id = "iconDownCR";
    imgDown.classList.add("iconDownCR");
    let downloadLink = createDownloadLink(imgDown, url);


    maxDiv.classList.add("maxCR");
    maxImg.src = "img/icon-max.svg";
    maxImg.alt = "iconMaxCR";
    maxImg.classList.add("iconMaxCR");
    maxImg.onclick = () => {
        expanRGIFS(url, user, titleGifo);
        sliderIndexExpR = index;
    }
    paragraph.innerHTML = user;
    paragraph.classList.add("pCR");
    title.innerHTML = titleGifo;
    title.classList.add("titleCR");

    // se hace append child para relacionar los tags
    downDiv.appendChild(downloadLink);
    maxDiv.appendChild(maxImg);

    principalDiv.appendChild(imgHover);
    principalDiv.appendChild(downDiv);
    principalDiv.appendChild(maxDiv);
    principalDiv.appendChild(paragraph);
    principalDiv.appendChild(title);
    return principalDiv;
}
