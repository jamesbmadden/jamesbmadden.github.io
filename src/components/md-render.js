import { html, LitElement } from '../../_snowpack/pkg/lit.js';
import marked from '../../_snowpack/pkg/marked.js';

export class Markdown extends LitElement {
  
  static get properties () {
    return {
      md: { type: String }
    }
  }

  createRenderRoot() {
    return this;
  }

  render () {
    return html([marked(this.md)]);
  }

}

customElements.define('md-render', Markdown);