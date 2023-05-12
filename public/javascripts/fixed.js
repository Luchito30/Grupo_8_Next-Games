window.addEventListener("scroll", function () {
    const bloker= document.querySelector("#bloker");
    bloker.classList.toggle("scroll__bloker--nav", window.scrollY > 1);
});
window.addEventListener("scroll", function () {
    const fixed= document.querySelector("#fixed");
    fixed.classList.toggle("scroll__fixer--nav", window.scrollY > 1);
});

window.addEventListener("scroll", function () {
    const carritofixed= document.querySelector("#carritof");
    carritofixed.classList.toggle("carrito__scroll", window.scrollY > 1);
});