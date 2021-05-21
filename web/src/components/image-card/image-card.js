import { LitElement, html, css } from 'lit';
import styles from './image-card.css';

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