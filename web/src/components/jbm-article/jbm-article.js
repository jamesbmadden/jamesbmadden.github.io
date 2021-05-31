import { LitElement, html, css } from 'lit';
import styles from './jbm-article.css';

export default class Article extends LitElement {

  static get styles () { return css([styles]) }
  static get properties () { return {
    img: { type: String },
    title: { type: String },
    article: { type: String },
    tags: { type: Array },
    animate: { type: Boolean }
  }};

  connectedCallback () {
    super.connectedCallback();

    // if we are running in the browser, we have to dynamically load the article contents
    if (this.animate === 'true') {
      // this.article will equal the URL in dynamic browser animation mode
      fetch(this.article).then(async article => this.article = await article.text());
    }
  }

  render () {
    return html`
      <div class="jbm-article-root ${this.animate === 'true' ? "animate": ""}">
        <img class="jbm-article-header-img" src=${this.img} alt="" />
        <h1 class="jbm-article-header">${this.title}</h1>
        <article class="jbm-article">
          <p>${this.article}</p>
        </article>
        <aside class="jbm-article-aside">
          <p>${this.tags}</p>
        </aside>
      </div>
    `;
  }

}

customElements.define('jbm-article', Article);