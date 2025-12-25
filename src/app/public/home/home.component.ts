import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Use global Swiper from CDN
    const Swiper = (window as any).Swiper;

    // Initialize Swiper for the services slider
    new Swiper('.services-slider', {
      slidesPerView: 1,           // Default: 1 card visible on small screens
      spaceBetween: 20,
      loop: true,                 // Continuous loop
      autoplay: {
        delay: 5000,              // Auto-slide every 5 seconds
        disableOnInteraction: false, // Keep autoplay after user interaction
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,          // Allow clicking on dots to jump to slide
      },
      breakpoints: {
        768: { slidesPerView: 2 }, // Show 2 cards on medium screens
        992: { slidesPerView: 1 }, // Show 1 card on large screens (adjust if you want more)
      },
    });

    // Scroll-triggered animation observer (unchanged)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    );

    // Observe all elements with the animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  }
}