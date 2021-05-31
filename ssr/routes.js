import IndexTemplate from './routes/index.js';
import Template404 from './routes/404.js';

export default [
  {
    path: "index.html",
    template: IndexTemplate
  },
  {
    path: "404.html",
    template: Template404
  }
];