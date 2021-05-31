import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';

import pages from './routes.js';
import withBoilerplate from './boilerplate.js';

import fs from 'fs';

fs.mkdirSync("./web/build/article");

pages.forEach(page => {
  fs.writeFile("./web/build/" + page.path, Array.from(render(withBoilerplate(page.template))).join("").replace(/<template/g, '<shadow-root').replace(/<\/template/g, '</shadow-root'), err => {
    console.log('done or', err);
  });
});

