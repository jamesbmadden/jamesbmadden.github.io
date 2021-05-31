import { html } from 'lit-html';
import Article from '../../web/build/src/components/jbm-article/jbm-article.js';

export default function article(data) {
  return html([`<jbm-article title=${data.title} article=${data.bio} tags=${data.tags}></jbm-article>`]);
}