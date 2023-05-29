window.addEventListener("load", async function() {
    const loader = document.querySelector(".loader");
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    loader.classList.add("loader__hidden");
  });