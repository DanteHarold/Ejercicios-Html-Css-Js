let listelement = document.querySelectorAll('.list__buttom--click');

listelement.forEach(e => {
    e.addEventListener('click',()=>{
        e.classList.toggle('arrow');
        
        let height = 0 ;
        let menu = e.nextElementSibling;
        
        if(menu.clientHeight== "0"){
            height=menu.scrollHeight;
        }
        menu.style.height = `${height}px`;
    })
});