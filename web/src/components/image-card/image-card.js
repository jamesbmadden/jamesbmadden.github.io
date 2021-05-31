import { LitElement, html, css } from 'lit';
import styles from './image-card.css';

export default class ImageCard extends LitElement {

  static get styles () { return css([styles]) }
  static get properties () { return {
    src: { type: String },
    title: { type: String },
    bio: { type: String },
    tags: { type: Array },
    link: { type: String }
  }};

  render () {
    return html`
      <a href=${this.link}>
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