# Frontend Mentor - Interactive rating component solution

This is a solution to the [Interactive rating component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [About](#about)
  - [Built with](#built-with)
  - [Areas of Focus](#areas-of-focus)
    - [CSS](#css)
    - [A11Y](#a11y)
    - [TypeScript](#typescript)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Screenshot

![Interactive Rating Component](./screenshot.png)

### Links

- [Solution](https://zingy-mochi-6962a4.netlify.app/)

## About

### Built with

- TypeScript
- SCSS
- [CUBE CSS](https://cube.fyi/)
- NPM scripts for tooling
- ESLint
- Prettier

### Areas of focus

Three key areas of focus

1. Robust CSS architecture
2. Accessibility
3. TypeScript

#### CSS

I've had a mental shift of sorts when it comes to CSS architecture lately. I used to be full steam ahead on the BEM train, but it's started to feel inefficient and heavy handed. I opted to use CUBE CSS here instead, which embraces the cascade. Overall, I'm pretty happy with it. I really enjoyed using simple compositions like `.stack-vertical` combined with utility classes and a sprinkle of BEM-like components. It's actually similar in practice to how I use BEM, just with the addition of utilities and exceptions. What I really like about it is the deliberate delineation between compositional blocks and content blocks. Overall, it seems like a much more robust and efficient system, and I'm looking forward to trying it out on a larger project with diverse layouts.

#### A11Y

Accessibility decisions:

- Radio inputs instead of buttons for semantics
- Extra SR only instructions for context
- Appropriate hover, active, and focus states
- Using an ARIA live region to inform screen reader users of validation errors and a successful submission
- `aria-required` and `aria-invalid` on `input`s
- For users that `prefers-reduced-motion`, substituted head shake animation on invalid submission with a visible error message

#### TypeScript

I used JS to validate the form instead of HTML `required` attributes, which interrupted the head shake animation. The head shake animation is a debatable UI decision, but I thought it was fun :)

I also wanted to figure out a way to make the `Rating` class more abstract and flexible, rather than coupled to a specific HTML structure. However, I found that when I stripped out all implementation details, there was very little left to the `Rating` class, so it didn't make much sense.

### Continued development

Going forward, I want to keep focusing on:

- Robust, efficient CSS architecture
- Accessibility

### Useful resources

- [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [CUBE CSS](https://cube.fyi/)
- [Every Layout](https://every-layout.dev/)

## Author

- Website - [Tom Tillistrand](https://tomtillistrand.com)
- Frontend Mentor - [@TomTilly](https://www.frontendmentor.io/profile/TomTilly)
- Twitter - [@tomtillistrand](https://www.twitter.com/tomtillistrand)

## Acknowledgments

- [Head shake animation by Felipe Martinin](https://codepen.io/FelipeMartinin/pen/ZbOvxr)
