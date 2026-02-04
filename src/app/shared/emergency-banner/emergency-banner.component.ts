import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-emergency-banner',
  templateUrl: './emergency-banner.component.html',
  styleUrls: ['./emergency-banner.component.css']
})
export class EmergencyBannerComponent implements AfterViewInit {

  ngAfterViewInit() {
    // 1. Scroll animation observer (your existing code)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.emergency-content.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // 2. Video play/pause toggle
    const video = document.querySelector('.emergency-video') as HTMLVideoElement;
    const overlay = document.querySelector('.video-overlay') as HTMLElement;

    if (video && overlay) {
      overlay.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          overlay.classList.add('playing');
        } else {
          video.pause();
          overlay.classList.remove('playing');
        }
      });

      // Optional: Hide overlay when video starts playing (if not already handled by CSS)
      video.addEventListener('play', () => {
        overlay.classList.add('playing');
      });
      video.addEventListener('pause', () => {
        overlay.classList.remove('playing');
      });
    }
  }
}