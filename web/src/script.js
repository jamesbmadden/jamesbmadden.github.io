import { LitElement, html, css } from 'lit';
import projects from './data/projects.js';
import './components/image-card/image-card.js';

import styles from './jm-root.css';

export default class Root extends LitElement {

  static get styles () {
    return css([styles]);
  }

  render () {
    return html`
      <div class="titles">
        <h1>James Madden</h1>
        <h2>Developer, designer.</h2>
      </div>
      <div class="offset-content"></div>
      <h2 class="section-header">Projects</h2>
      <section id="projects" style="padding-bottom: 100vh">
        <div class="projects-grid">
          <img-card src=${projects[0].img} title=${projects[0].title} bio=${projects[0].bio} .tags=${projects[0].tags} postUrl=${projects[0].post}></img-card>
          <img-card src=${projects[1].img} title=${projects[1].title} bio=${projects[1].bio} .tags=${projects[1].tags} postUrl=${projects[1].post}></img-card>
          <img-card src=${projects[2].img} title=${projects[2].title} bio=${projects[2].bio} .tags=${projects[2].tags} postUrl=${projects[2].post}></img-card>
          <img-card src="./assets/more.svg" title="More"></img-card>
        </div>
      </section>
    `;
  }

}

customElements.define('jbm-root', Root);

console.log('test');