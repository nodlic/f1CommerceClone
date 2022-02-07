let homeInfo = document.querySelectorAll(".home--info");;
let homeContent = document.querySelector(".home--content");
const infoPageLink = document.querySelectorAll(".infoPageLink--page");
let idx = 1;

//Função necessária para que o carrossel de elementos 
//saia do ultimo para o primeiro elemento de forma suave
//Ela clona as os dois ultimos elementos
function circularCarousel() {
    const last = homeInfo[homeInfo.length-1].outerHTML;
    const lastButOne = homeInfo[homeInfo.length-2].outerHTML;
    let homeContentHTML = homeContent.innerHTML;

    homeContent.innerHTML = lastButOne + last + homeContentHTML;
    homeContent = document.querySelector(".home--content");
    homeInfo = document.querySelectorAll(".home--info");
}
circularCarousel();


//Funções que impedem um card de passar sem que o outro tenha terminado
let transition = true;
homeContent.addEventListener("transitionrun", () => {
  transition = false;  
})
homeContent.addEventListener("transitionend", () => {
    transition = true;  
  })

function toBack() {
    if(transition){
        idx++;

        homeContent.style.transition = "all ease 0.4s";
        homeContent.style.transform = `translateX(-${idx*100}vw)`;

        homeContent.addEventListener("transitionend", () => {
            if(idx >= homeInfo.length-1) {
                idx = 1;
                homeContent.style.transition = "none";
                homeContent.style.transform = `translateX(-${idx*100}vw)`;
            }
        })   
        GetinfoPageLink(idx)
    }
}

function toNext() {
    if(transition){
        idx--;

        homeContent.style.transition = "all ease 0.4s";
        homeContent.style.transform = `translateX(-${idx*100}vw)`;

        homeContent.addEventListener("transitionend", () => {
            if(idx <= 0) {
                idx = homeInfo.length-2;
                homeContent.style.transition = "none";
                homeContent.style.transform = `translateX(-${idx*100}vw)`;
            }
        })   
        GetinfoPageLink(idx)
    }
}

function GetinfoPageLink(number) {
    for(let x = 0; x < 3; x++){
        infoPageLink[x].classList.remove("selected");
    }

    let pageNumber = homeInfo[number].getAttribute("value");
    if(pageNumber>=0 && pageNumber<=2){
        infoPageLink[pageNumber].classList.add("selected");
    }
}

function changePage(element) {
    let pageNumber = element.getAttribute("value");
    homeContent.style.transition = "all ease 0.4s";
    homeContent.style.transform = `translateX(-${pageNumber*100}vw)`;
    GetinfoPageLink(pageNumber)
}