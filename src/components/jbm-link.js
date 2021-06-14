import { LitElement, html, css } from '../../_snowpack/pkg/lit.js';

export default class Link extends LitElement {

  static styles = css`
    a {
      text-decoration: none;
      color: unset;
    }
    a.styled {
      background: rgba(0, 138, 224, 0.1);
      color: #00446e;
      border-radius: 8px;
      padding: 0 0.25rem;
      transition: box-shadow 0.1s, background 0.1s, color 0.1s;
    }
    a.styled:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background: #60afe0;
      color: #00243b;
    }
  `;

  static properties = {
    url: { type: String },
    applyStyles: { type: Boolean },
    outside: { type: Boolean },
    text: { type: String }
  };

  render () {
    return html`<a href=${this.url} target=${this.outside ? '_blank' : ''} rel="noopener noreferrer" class=${this.applyStyles ? 'styled': ''}>${this.text}</a>`;
  }

}

customElements.define('jbm-link', Link);