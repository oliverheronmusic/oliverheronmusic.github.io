const backgrounds = document.querySelectorAll('.background');

setActive = (background, active) => {
  if (active) {
    background.classList.add('active');
  } else {
    background.classList.remove('active');
  }
};

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) return;
  backgrounds.forEach((background) => {
    setActive(background, background.getBoundingClientRect().top < window.innerHeight / 3 && background.getBoundingClientRect().bottom > window.innerHeight / 3);
  });
});