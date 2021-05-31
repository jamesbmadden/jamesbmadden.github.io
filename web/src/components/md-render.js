import { html, LitElement } from 'lit';
import marked from 'marked';

export class Markdown extends LitElement {
  
  static get properties () {
    return {
      md: { type: String }
    }
  }

  connectedCallback () {
    super.connectedCallback();
    this.shadowRoot.innerHTML = marked(this.md);
  }
  
}

customElements.define('md-render', Markdown);