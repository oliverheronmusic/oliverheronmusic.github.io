const imageContainer = document.querySelector('.image-container');
const imageCover = document.querySelector('.image-container div');
const imageDisplay = document.querySelector('.image-container img');
const imageList = document.querySelectorAll('.image-list img');

imageCover.addEventListener('click', () => {
  imageContainer.classList.remove('show');
});

window.addEventListener('load', () => {
  imageList.forEach((image) => {
    image.addEventListener('click', () => {
      imageContainer.classList.add('show');
      imageDisplay.src = image.src;
      imageDisplay.alt = image.alt;
    });
  });
});