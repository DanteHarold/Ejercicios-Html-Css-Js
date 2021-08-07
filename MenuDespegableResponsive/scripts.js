let btn = document.querySelector('.icon-bar');
let sidebar = document.querySelector('.sidebar');
let search = document.querySelector('.search');


btn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
 })

search.addEventListener('click', () => {
    sidebar.classList.toggle('active');
})