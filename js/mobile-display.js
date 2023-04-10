const backgrounds = document.querySelectorAll('.background');

window.addEventListener('scroll', () => {
  backgrounds.forEach((background) => {
    //If the background is within 200px of the center of the screen, add the class 'active'
    if (background.getBoundingClientRect().top < window.innerHeight / 3
      && background.getBoundingClientRect().bottom > window.innerHeight / 3) {
      background.classList.add('active');
    } else {
      background.classList.remove('active');
    }
  });
});