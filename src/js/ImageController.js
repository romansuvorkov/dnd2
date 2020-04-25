export default class DNDController {
  constructor() {
    this.error = document.querySelector('.error');
    this.input = document.querySelector('.input');
    this.inputCover = document.querySelector('.input_cover');
    this.imgContainer = document.querySelector('.dowloaded_container');
  }

  init() {
    this.inputCover.addEventListener('click', () => {
      this.input.dispatchEvent(new MouseEvent('click'));
    });

    this.inputCover.addEventListener('dragover', (event) => {
      event.preventDefault();
      this.inputCover.classList.add('focus');
    });

    this.inputCover.addEventListener('dragleave', (event) => {
      event.preventDefault();
      this.inputCover.classList.remove('focus');
    });

    this.inputCover.addEventListener('drop', (event) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.drawPreview(files);
      this.inputCover.classList.remove('focus');
    });

    this.input.addEventListener('input', (event) => {
      const files = Array.from(event.currentTarget.files);
      this.drawPreview(files);
    });

    this.imgContainer.addEventListener('click', (event) => {
      if (event.target.className === 'delete_btn') {
        event.target.parentNode.remove();
      }
    });
  }

  drawPreview(data) {
    for (const item of data) {
      const imageURL = URL.createObjectURL(item);
      this.input.addEventListener('load', () => {
        URL.revokeObjectURL(imageURL);
      });
      const image = document.createElement('img');
      image.src = imageURL;
      image.addEventListener('load', () => {
        image.className = 'image';
        image.alt = 'image';
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image_container');
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete_btn');
        deleteBtn.textContent = '✖';
        imageContainer.appendChild(deleteBtn);
        imageContainer.appendChild(image);
        this.imgContainer.appendChild(imageContainer);
      });
      image.addEventListener('error', () => {
        this.errorMessageElement.classList.remove('none');
      });
    }
  }
}
