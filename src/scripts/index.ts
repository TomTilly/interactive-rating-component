import InteractiveRating from './interactive-rating.js';

const interactiveRatingEl = document.querySelector('.interactive-rating');

if (interactiveRatingEl instanceof HTMLElement) {
  new InteractiveRating(interactiveRatingEl);
}
