import { setAttribute, removeAttribute } from './utilities.js';

/**
 * The Interactive Rating component expects the following HTML structure:
 * <div class="interactive-rating">
 *  <form>
 *    <label class="interactive-rating__option">
 *      <input type="radio" name="rating" value="1" />
 *        1
 *    </label>
 *    <!-- ...repeat <label> 4 more times for 2-5 values -->
 *    <button type="submit">
 *      Submit
 *    </button>
 *  </form>
 * </div>
 */

const ratingOptions = ['1', '2', '3', '4', '5'] as const;
type Rating = typeof ratingOptions[number];

function isInput(maybeInput: any): maybeInput is HTMLInputElement {
  return maybeInput instanceof HTMLInputElement && maybeInput?.type === 'radio';
}

class InteractiveRating {
  private root: HTMLElement;
  private radioEls: HTMLInputElement[];
  private formEl: HTMLFormElement;
  private _isValid: boolean | undefined;
  private validationMsg = '';

  constructor(root: HTMLElement) {
    const radioEls = root.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );
    const formEl = root.querySelector('form');

    // Basic validation to ensure HTML is somewhat well-formed
    if (!formEl) throw new Error('No form found');
    if (radioEls.length !== 5)
      throw new Error('There should be 5 radio elements');

    this.root = root;
    this.radioEls = [...radioEls];
    this.formEl = formEl;

    this.formEl.addEventListener('submit', this.handleSubmit);
    this.root.addEventListener('animationend', (e) => {
      this.root.removeAttribute('data-invalid');
    });
  }

  handleSubmit = (e: Event) => {
    const { formEl } = this;
    e.preventDefault();

    const formData = new FormData(formEl);
    const maybeRating = formData.get('rating');
    console.log(maybeRating);
    if (maybeRating === null) {
      this.showValidationError(
        'Please select a rating before clicking "submit."'
      ); // only show validation message the first time
      this.isValid = false;
      return;
    }
    this.isValid = true;
    const rating = ratingOptions.find(
      (validOption) => validOption === maybeRating
    );
    if (!rating)
      throw new Error('Radio elements must have a value between 1 and 5');

    this.root.innerHTML = `
      <div class="stack-vertical align-center">
        <img class="interative-rating__thank-you-img" src="assets/illustration-thank-you.svg" alt="">
        <p class="p-1 color-orange bg-dark-blue lh-tight br-standard">You selected ${rating} out of 5</p>
        <h2>Thank you!</h2>
        <p class="text-center">We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
      </div>
    `;
  };

  // Used to notify screen readers of errors
  showValidationError = (msg: string) => {
    const { formEl, radioEls } = this;
    // Clear previous validation error
    const maybeValidationEl = formEl.querySelector(
      '.interactive-rating__error'
    );
    if (maybeValidationEl) {
      // Replace existing validation message with new message
      const validationEl = maybeValidationEl;
      validationEl.textContent = msg;
      return;
    } else {
      // Show new validation error
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const validationEl = document.createElement('div');
      const classes: string[] = ['interactive-rating__error', 'color-orange'];
      if (!prefersReducedMotion) classes.push('sr-only');
      validationEl.classList.add(...classes);
      validationEl.textContent = msg;
      validationEl.setAttribute('role', 'alert');
      validationEl.id = 'error';

      const stackEl = formEl.querySelector('.stack-vertical');
      if (!stackEl) throw new Error('No ".stack-vertical" element found.');
      stackEl.insertAdjacentElement('afterbegin', validationEl);

      for (const radioEl of radioEls) {
        radioEl.setAttribute('aria-invalid', 'error');
      }
    }
  };

  get isValid() {
    return this._isValid;
  }

  set isValid(value) {
    if (value === true) {
      this.root.removeAttribute('data-invalid');
    } else {
      this.root.setAttribute('data-invalid', '');
    }
    this._isValid = value;
  }
}

export default InteractiveRating;
