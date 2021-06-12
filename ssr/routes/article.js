import { html } from 'lit-html';
import Article from '../../web/build/src/components/jbm-article/jbm-article.js';

import fs from 'fs';

export default function article(data) {
  const postData = fs.readFileSync("./web/build" + data.post).toString();
  return html([`<jbm-article img="${data.img}" title="${data.title}" article="${postData}" tags="${JSON.stringify(data.tags).replace(/\"/g, "'")}" animate=${false}></jbm-article>`]);
}