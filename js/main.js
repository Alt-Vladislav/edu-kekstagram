import { renderThumbnails } from './thumbnails-renderer.js';
import { initUploadForm } from './upload-new-photo.js';
import { initOpenFullPhoto } from './full-photo-popup.js';
import { initThumbnailsFilter } from './thumbnails-filter.js';
import { getData } from './api.js';
import { showAlert } from './message-renderer.js';


getData()
  .then((dataFromServer) => {
    renderThumbnails(dataFromServer);
    initThumbnailsFilter(dataFromServer);
    initOpenFullPhoto(dataFromServer);
  })
  .catch((err) => {
    showAlert(err.message);
  });

initUploadForm();
