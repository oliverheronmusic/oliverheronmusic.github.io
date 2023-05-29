const imageContainer = document.querySelector('.image-container');
const imageCover = document.querySelector('.image-container div');
const imageDisplay = document.querySelector('.image-container img');
const videoDisplay = document.querySelector('.image-container video');
const imageList = document.querySelectorAll('.image-list img');

imageCover.addEventListener('click', () => {
  imageContainer.classList.remove('show');
  videoDisplay.pause();
});

window.addEventListener('load', () => {
  imageList.forEach((image) => {
    image.addEventListener('click', (e) => {
      imageContainer.classList.add('show');
      imageDisplay.classList.remove('show');
      videoDisplay.classList.remove('show');

      const video = e.target.dataset.video;
      if (video) {
        videoDisplay.src = video;
        videoDisplay.poster = image.src;
        videoDisplay.classList.add('show');
      }
      else {
        imageDisplay.src = image.src;
        imageDisplay.classList.add('show');
      }
    });
  });
});