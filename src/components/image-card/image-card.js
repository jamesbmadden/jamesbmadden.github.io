import { LitElement, html, css } from '../../../_snowpack/pkg/lit.js';
import styles from './image-card.css.js';

export default class ImageCard extends LitElement {

  static get styles () { return css([styles]) }
  static get properties () { return {
    src: { type: String },
    title: { type: String },
    bio: { type: String },
    tags: { type: Array }
  }};

  render () {
    return html`
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
    `;
  }

}

customElements.define('img-card', ImageCard);

console.log(styles);