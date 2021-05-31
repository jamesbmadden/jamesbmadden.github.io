import { html, LitElement } from 'lit';
import marked from 'marked';

export class Markdown extends LitElement {
  
  static get properties () {
    return {
      md: { type: String }
    }
  }

  render () {
    return html([marked(this.md)]);
  }

}

customElements.define('md-render', Markdown);