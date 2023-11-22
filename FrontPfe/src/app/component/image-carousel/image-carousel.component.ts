import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class ImageCarouselComponent implements OnInit {
  currentIndex = 0;
  images = [
    'assets/images/avis6.jpg',
    'assets/images/avis1.jpg',
    'assets/images/avis2.jpg',
    'assets/images/avis3.jpg',
    'assets/images/avis4.jpg',
    'assets/images/avis5.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
