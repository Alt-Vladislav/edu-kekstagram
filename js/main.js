import { generatePosts } from './generate-data.js';
import { renderThumbnails } from './thumbnails-renderer.js';
import { initUploadForm } from './upload-new-photo.js';

const POSTS_NUMBER = 25;
generatePosts(POSTS_NUMBER);

renderThumbnails();
initUploadForm();
