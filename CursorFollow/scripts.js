const d = document,
    w = window,
    cursor = d.querySelector('.cursor');

d.addEventListener('mousemove',e=>{
    cursor.setAttribute('style','top:'+(e.pageY - 10)+'px; left: '+(e.pageX-10)+'px;')
})
d.addEventListener('click',e=>{
    cursor.classList.add('expand')
    setTimeout(() => {
       cursor.classList.remove('expand') 
    }, 500);
})
