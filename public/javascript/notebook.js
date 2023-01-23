const swiper = new Swiper('.swiper-notebook1', {
    // Optional parameters
    slidesPerView: 5,
    spaceBrtween: 0,
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