const swiper = new Swiper('.swiper-notebook', {
    // Optional parameters
    slidesPerView: 3,
   
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