import IndexTemplate from './routes/index.js';
import Template404 from './routes/404.js';
import articles from '../web/build/src/data/projects.js';
import articlePage from './routes/article.js';

export default [
  {
    path: "index.html",
    template: IndexTemplate
  },
  {
    path: "404.html",
    template: Template404
  },
  ...articles.map(article => {
    return {
      path: `article/${article.title.replace(/ /g, '_').toLowerCase()}.html`,
      template: articlePage(article)
    }
  })
];