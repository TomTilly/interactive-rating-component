import Rating from './Rating.js';

const ratingEl = document.querySelector('.rating');

if (ratingEl instanceof HTMLElement) {
  new Rating(ratingEl);
}
