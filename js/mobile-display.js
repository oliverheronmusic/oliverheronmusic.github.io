const boxes = document.querySelectorAll('.box');
const icons = document.querySelectorAll('.icons-row');

setActive = (box, active) => {
  if (active) {
    box.classList.add('active');
  } else {
    box.classList.remove('active');
  }
};

scrolled = () => {
  if (window.innerWidth > 768) return;
  boxes.forEach((box) => {
    setActive(box, box.getBoundingClientRect().top < window.innerHeight / 3 + 100 && box.getBoundingClientRect().bottom > window.innerHeight / 3 + 50);
  });
  setActive(icons[0], window.innerHeight + window.scrollY >= document.body.offsetHeight - 10);
}

window.addEventListener('scroll', scrolled);
scrolled();