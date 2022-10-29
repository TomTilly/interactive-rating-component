/**
 * Updates interactive rating HTML on submit
 *
 * @example
 *
 * ## HTML expected
 * ```html
 * <div class="rating">
 *  <form>
 *    <div class="stack-vertical">
 *      <input
          class="sr-only"
          id="1-of-5"
          type="radio"
          name="rating"
          value="1"
          aria-required="true"
        />
        <label
          class="rating__option"
          for="1-of-5"
        >
          1
        </label>
 *      <!-- repeat x times... -->
 *    </div>
 *    <button type="submit">
 *      Submit
 *    </button>
 *  </form>
 * </div>
 * ```
 */
class Rating {
  private root: HTMLElement;
  private radioEls: HTMLInputElement[];
  private formEl: HTMLFormElement;

  constructor(root: HTMLElement) {
    const radioEls = root.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );
    const formEl = root.querySelector('form');

    if (!formEl) throw new Error('No form found');

    this.root = root;
    this.radioEls = [...radioEls];
    this.formEl = formEl;

    // Event handlers
    this.formEl.addEventListener('submit', this.handleSubmit);
    this.root.addEventListener('animationend', () => {
      this.root.removeAttribute('data-invalid');
    });
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();

    const { formEl, root } = this;
    const formData = new FormData(formEl);
    const maybeRating = formData.get('rating');

    // No rating was selected, show error
    if (maybeRating === null) {
      this.showValidationError('Error: no rating was selected.');
      return;
    }

    // Rating was selected, show success message
    const rating = maybeRating.toString();
    this.root.removeAttribute('data-invalid');
    root.innerHTML = `
      <div class="stack-vertical align-center">
        <img class="rating__thank-you-img" src="assets/illustration-thank-you.svg" alt="">
        <p class="p-1 color-orange bg-dark-blue lh-tight br-standard">You selected ${rating} out of 5</p>
        <h2>Thank you!</h2>
        <p class="text-center">We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
      </div>
    `;
  };

  showValidationError = (msg: string) => {
    const { formEl, radioEls, root } = this;

    // Clear previous validation error
    formEl.querySelector('.rating__error')?.remove();

    // Figure out which classes to use
    const classes: string[] = ['rating__error', 'color-orange'];
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!prefersReducedMotion) classes.push('sr-only');

    // Create validation element
    const validationEl = document.createElement('div');
    validationEl.classList.add(...classes);
    validationEl.textContent = msg;
    validationEl.id = 'error';

    // Add validation message to page
    const stackEl = formEl.querySelector('.stack-vertical');
    if (!stackEl) throw new Error('No ".stack-vertical" element found.');
    stackEl.insertAdjacentElement('afterbegin', validationEl);

    // Set invalid attributes
    root.setAttribute('data-invalid', '');
    for (const radioEl of radioEls) {
      radioEl.setAttribute('aria-invalid', 'error');
    }
  };
}

export default Rating;
