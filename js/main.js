import { renderThumbnails } from './thumbnails-renderer.js';
import { initUploadForm } from './upload-new-photo.js';
import { getData } from './api.js';


getData()
  .then((dataFromServer) => {
    renderThumbnails(dataFromServer);
  })
  .catch((err) => {
    console.log(err.message);
  });

initUploadForm();
