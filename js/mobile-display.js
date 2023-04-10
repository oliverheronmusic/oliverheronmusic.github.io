const boxes = document.querySelectorAll('.box');

setActive = (box, active) => {
  if (active) {
    box.classList.add('active');
  } else {
    box.classList.remove('active');
  }
};

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) return;
  boxes.forEach((box) => {
    setActive(box, box.getBoundingClientRect().top < window.innerHeight / 3 && box.getBoundingClientRect().bottom > window.innerHeight / 3);
  });
});