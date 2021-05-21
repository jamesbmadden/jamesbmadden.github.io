import { LitElement, html, css } from '../../../_snowpack/pkg/lit.js';
import styles from './image-card.css.js';

export default class ImageCard extends LitElement {

  static get styles () { return css([styles]) }
  static get properties () { return {
    src: { type: String },
    title: { type: String },
    bio: { type: String }
  }};

  render () {
    return html`
      <img src=${this.src} alt="" />
      <div class="image-description">
        <h2>${this.title}</h2>
      </div>
    `;
  }

}

customElements.define('img-card', ImageCard);

console.log(styles);