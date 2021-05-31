import { LitElement, html, css } from '../../../_snowpack/pkg/lit.js';
import styles from './image-card.css.js';

export default class ImageCard extends LitElement {

  static get styles () { return css([styles]) }
  static get properties () { return {
    src: { type: String },
    title: { type: String },
    bio: { type: String },
    tags: { type: Array },
    link: { type: String },
    postUrl: { type: String }
  }};

  render () {
    return html`
      <a href=${this.link} @click=${event => {
        event.preventDefault();
        document.dispatchEvent(new CustomEvent('jbm-newpage', { detail: { type: 'article', url: this.link, data: {
          title: this.title,
          img: this.src,
          tags: this.tag,
          link: this.link,
          article: this.postUrl
        }} }));
      }}>
        <img src=${this.src} alt="" tabindex="0" />
        <div class="image-description">
          <h2>${this.title}</h2>
          <p class="bio">${this.bio}</p>
          <p class="tags">
            ${this.tags?.map(tag => html`
              <span class="chip">${tag}</span>
            `)}
          </p>
        </div>
      </a>
    `;
  }

}

customElements.define('img-card', ImageCard);