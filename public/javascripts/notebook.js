
const swiper = new Swiper('.swiper-notebook1', {
  // Optional parameters
  slidesPerView: 1,
  spaceBrtween: 10,
  direction: 'horizontal',
  loop: true,
  autoplay:{
    delay:5000,
    pauseOnMouseEnter:true,
    disableOnInteraction:false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    dynamicBullets:true,
  },
  slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
       485: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
      },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper3 = new Swiper('.swiper-banner', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay:{
    delay:5000,
    pauseOnMouseEnter:true,
    disableOnInteraction:false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    dynamicBullets:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper4 = new Swiper('.swiper-banner2', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay:{
    delay:4000,
    pauseOnMouseEnter:true,
    disableOnInteraction:false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable:true,
    dynamicBullets:true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
