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
  private _isValid = false;
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

    // Bind events
    this.radioEls.forEach((el) => {
      el.addEventListener('change', this.handleRatingChange);
      el.addEventListener('focus', this.handleFocus);
      el.addEventListener('blur', this.handleBlur);
    });
    this.formEl.addEventListener('submit', this.handleSubmit);
    this.root.addEventListener('animationend', (e) => {
      this.root.removeAttribute('data-invalid');
    });
  }

  handleFocus = (e: Event) => {
    const el = e.currentTarget;
    if (!isInput(el)) {
      throw new Error('Expected HTMLInputElement of type "radio"');
    }

    const label = el.parentElement;
    if (!label || !(label instanceof HTMLLabelElement))
      throw new Error('Radio input should have a parent label');

    setAttribute([label], 'data-focused');
  };

  handleBlur = (e: Event) => {
    const el = e.currentTarget;
    if (!isInput(el)) {
      throw new Error('Expected HTMLInputElement of type "radio"');
    }

    const label = el.parentElement;
    if (!label || !(label instanceof HTMLLabelElement))
      throw new Error('Radio input should have a parent label');

    removeAttribute([label], 'data-focused');
  };

  handleRatingChange = (e: Event) => {
    const { radioEls } = this;
    for (const el of radioEls) {
      const label = el.parentElement;
      if (!label || !(label instanceof HTMLLabelElement))
        throw new Error('Radio input should have a parent label');

      if (el === e.currentTarget) {
        setAttribute([label], 'data-selected');
      } else {
        removeAttribute([label], 'data-selected');
      }
    }
  };

  handleSubmit = (e: Event) => {
    const { formEl } = this;
    e.preventDefault();

    const formData = new FormData(formEl);
    const maybeRating = formData.get('rating');
    console.log(maybeRating);
    if (maybeRating === null) {
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

// Type guards
// isForm(maybeForm: any): maybeForm is HTMLFormElement {
//   return maybeForm instanceof HTMLFormElement;
// }

// Event handlers
// function handleSubmit(e: Event) {
//   e.preventDefault();
// if (!isForm(form)) return;

// const formData = new FormData(form);
// const maybeRating = formData.get('rating');
// if (maybeRating === null) {
// e.currentTarget.dataset.valid = 'false';
// }
// const rating = ratingOptions.find((validOption) => validOption === formData.get('rating'));

// if(rating) {

// } else {

// }

//   const thankYouTemplate = `
//   <div class="stack-vertical align-center">
//     <img class="interative-rating__thank-you-img" src="assets/illustration-thank-you.svg">
//     <p>You selected ${rating} out of 5</p>
//     <h2>Thank you!</h2>
//     <p class="text-center">We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
//   </div>
// `;
// }

// Submit form
// 1. Check if number was selected
// 2. Replace HTML with thank you template

// const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const;
// type SheepName = typeof sheepNames[number];

export default InteractiveRating;
