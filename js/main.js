import { renderThumbnails } from './thumbnails-renderer.js';
import { initUploadForm } from './upload-new-photo.js';
import { getData } from './api.js';
import { showAlerServer } from './message-renderer.js';

getData()
  .then((dataFromServer) => {
    renderThumbnails(dataFromServer);
  })
  .catch((err) => {
    showAlerServer(err.message);
  });

initUploadForm();
