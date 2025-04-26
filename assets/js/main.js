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
// assets/js/main.js

window.initServiceSlider = function () {
  const el = document.querySelector('.service-slider');
  if (!el) return;

  // Destroy existing Swiper instance (if any)
  if (el.swiper) el.swiper.destroy(true, true);

  // Re-initialize Swiper
  new Swiper(el, {
    loop: true,
    spaceBetween: 24,
    centeredSlides: true,
    grabCursor: true,
    slidesPerView: 1.2,
    speed: 600,
    pagination: {
      el: ".service-slider-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      480: { slidesPerView: 1.4 },
      640: { slidesPerView: 1.7 },
      768: { centeredSlides: false, slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
};

// Also run once on full page load
window.addEventListener('load', () => {
  window.initServiceSlider();
});

  
  
})();


// Script for filetree shortcode collapsing/expanding folders used in the theme
// ======================================================================

document.addEventListener("DOMContentLoaded", function () {
  const folders = document.querySelectorAll(".filetree-folder");

  folders.forEach(function (folder) {
    folder.addEventListener("click", function () {
      const children = Array.from(folder.children);
      children.forEach(function (el) {
        if (el.dataset.state) {
          el.dataset.state = el.dataset.state === "open" ? "closed" : "open";
        }
      });

      const list = folder.nextElementSibling;
      if (list && list.dataset) {
        list.dataset.state = list.dataset.state === "open" ? "closed" : "open";
      }
    });
  });
});