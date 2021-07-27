let images = ["assets/img1.jpg","assets/img2.jpg","assets/img3.jpg"]

//Elemento para cargar el slide
let slider = document.getElementById("slider-js")

//Elemento general del slider
let slidercontainer = document.getElementById("slider-container")

//Establecemos anhco del contenedor en funcion de la imagnes
slider.style.width = images.length*100+"%"

//Elemento para cargar la navegacion
let slidernav = document.getElementById("slider-navigation")

//Variable para saber si el slider esta activo 
let active = true

//Evento para saber si el raton esta sobre el slide
slidercontainer.addEventListener("mouseover", ()=>{
    if(active) active = false
})

slidercontainer.addEventListener("mouseover", ()=>{
    if(!active) active = true
})

//Evento al pulsar en la navegacion
slidernav.addEventListener("click",(e)=>{
    slideImage(e.target.id.slice(-1))
})

//Dibujar slide y navegacion
for(let img in images){
    //CargarImagenes
    slider.innerHTML += `<img src="${images[img]}" class="slider-img" style="width:${100/images.length}%"
    >`

    //cargar navegacion
    slidernav.innerHTML += `<span class="${img==0 ? 'slider-nav slider-nav--active' : 'slider-nav'}" id="slider-nav-${img}">`;
}


//Variable contador de imagenes
let cont = 0 
//intervalos de tiempo para el contador
const startinterval = () => setInterval(counter,2000)

//Inicier el contador
startinterval()

//funcion que cambie de imagen
function counter(){
    if(active){
        cont++;
        if(cont>=images.length) cont=0
        setInterval(slideImage(cont),2000);
        setInterval(setActive(cont),2000)
    }
}

function slideImage(id){
    if(!active && !isNaN(id)){
        cont=id
        setActive(id)
    }
    slider.style.left = "-" + id + "00%"
}

let navIcons = [...document.getElementsByClassName("slider-nav")]
console.log(navIcons);
function setActive(id){
    // for(let icon in navIcons){
    //     if(ican<navIcons.length){
    //         if(navIcons[icon].id == "slider-nav"+id)
    //             document.getElementById(navIcons[icon].id).classList.add("slider-nav active")
    //         else 
    //             document.getElementById(navIcons[id]).classList.remove("slider-nav--active")
    //     }
    // }

    navIcons.map(idValue => idValue.attributes.id.nodeValue.slice(-1) == id ?
                            idValue.classList.add("slider-nav--active") :
                            idValue.classList.remove("slider-nav--active"))
                             
                             
}