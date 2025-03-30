// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.closest(".nav-item").classList.toggle("active");
    });
  });

  // Testimonial Slider
  // ----------------------------------------
  // new Swiper(".testimonial-slider", {
  //   spaceBetween: 24,
  //   loop: true,
  //   pagination: {
  //     el: ".testimonial-slider-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     992: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });

    // Service Slider
  // ----------------------------------------
  new Swiper(".testimonial-slider", {
    loop: true,
    spaceBetween: 24,
    centeredSlides: true,
    grabCursor: true,
    slidesPerView: 1.2,
    speed: 600,
    pagination: {
      el: ".testimonial-slider-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      480: {
        slidesPerView: 1.4,
      },
      640: {
        slidesPerView: 1.7,
      },
      768: {
        centeredSlides: false,
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  
  
})();
