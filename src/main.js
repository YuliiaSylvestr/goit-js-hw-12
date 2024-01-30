import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const perPage = 40;
let page = 1;
let searchValue = '';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  searchInput: document.querySelector('.input'),
  loadMoreButton: document.querySelector('.load-button'),
  loaderContainer: document.querySelector('.loader-container'),
};

function createGalleryimagesMarkup(images) {
  return images
    .map(
      ({
        previewURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${previewURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
          <div class="stats">
            <div class="stats-item">
              <span class="stats-item-title">Likes</span>
              <span class="stats-item-value">${likes}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Views</span>
              <span class="stats-item-value">${views}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Comments</span>
              <span class="stats-item-value">${comments}</span>
            </div>
            <div class="stats-item">
              <span class="stats-item-title">Downloads</span>
              <span class="stats-item-value">${downloads}</span>
            </div>
          </div>
        </a>
      </li>`;
      }
    )
    .join('');
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
  captionType: 'alt',
});

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  refs.galleryContainer.innerHTML = ``;
  refs.loaderContainer.innerHTML = `
   <div class="loader"></div>
  `;
  refs.loadMoreButton.classList.add('visually-hidden');

  try {
    page = 1;
    searchValue = refs.searchInput.value;
    e.currentTarget.reset();
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=42081820-380f934f7feb19076f66ce532&q=${encodeURI(
        searchValue
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const images = data.hits;
    const isEmptyRequest = page === 1 && images.length === 0;
    if (isEmptyRequest) {
      iziToast.error({
        title:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#f53d3d',
        titleColor: 'white',
        progressBar: false,
        icon: '',
      });
      refs.galleryContainer.innerHTML = ``;
      refs.loaderContainer.innerHTML = ``;
      return;
    }
    const isLastPage = images.length < perPage;
    if (isLastPage) {
      refs.loadMoreButton.classList.add('visually-hidden');
    } else {
      refs.loadMoreButton.classList.remove('visually-hidden');
    }
    const imagesMarkup = createGalleryimagesMarkup(images);
    refs.loaderContainer.innerHTML = ``;
    refs.galleryContainer.innerHTML = imagesMarkup;
    gallery.refresh();
  } catch (error) {
    refs.galleryContainer.innerHTML = ``;
    iziToast.error({
      title: 'Sorry, something went wrong. Please try again!',
      position: 'topRight',
      backgroundColor: '#f53d3d',
      titleColor: 'white',
      progressBar: false,
      icon: '',
    });
  }
});

refs.loadMoreButton.addEventListener('click', async e => {
  try {
    refs.loaderContainer.innerHTML = `
    <div class="loader"></div>
    `;
    refs.loadMoreButton.classList.add('visually-hidden');
    page += 1;
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=42081820-380f934f7feb19076f66ce532&q=${encodeURI(
        searchValue
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const images = data.hits;
    const imagesMarkup = createGalleryimagesMarkup(images);
    const isLastPage = images.length < perPage;
    if (isLastPage) {
      refs.loadMoreButton.classList.add('visually-hidden');
      iziToast.warning({
        title: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: 'de9a09',
        titleColor: 'white',
        progressBar: false,
        icon: '',
      });
    } else {
      refs.loadMoreButton.classList.remove('visually-hidden');
    }
    refs.galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);
    refs.loaderContainer.innerHTML = ``;
    gallery.refresh();

    const card = refs.galleryContainer.querySelector('.gallery-item');
    const cardBoundingRect = card.getBoundingClientRect();
    window.scrollBy({ behavior: 'smooth', top: cardBoundingRect.height * 2 });
  } catch (error) {
    refs.galleryContainer.innerHTML = ``;
    iziToast.error({
      title: 'Sorry, something went wrong. Please try again!',
      position: 'topRight',
      backgroundColor: '#f53d3d',
      titleColor: 'white',
      progressBar: false,
      icon: '',
    });
  }
});
