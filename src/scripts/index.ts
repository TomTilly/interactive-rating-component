import Rating from './Rating.js';

const interactiveRatingEl = document.querySelector('.interactive-rating');

if (interactiveRatingEl instanceof HTMLElement) {
  new Rating(interactiveRatingEl);
}
