import { LitElement, html, css } from '../_snowpack/pkg/lit.js';
import projects from './data/projects.js';

import './components/image-card/image-card.js';
import './components/jbm-article/jbm-article.js';

import styles from './jbm-root.css.js';

export default class Root extends LitElement {

  static get styles () { return css([styles]); }
  static get properties () {
    return {
      dissapear: { type: Boolean }
    }
  }

  connectedCallback () {
    super.connectedCallback();
    // handle a new page event
    this.bindedHandleNewPage = this.handleNewPage.bind(this);
    document.addEventListener('jbm-newpage', this.bindedHandleNewPage);
    // if popstate do that
    addEventListener('popstate', event => {

      if (location.pathname === '/') {
        this.dissapear = false;
      } else {
        this.handleNewPage({ detail: event.state }, true);
      }

    });
  }

  handleNewPage (event, ignorePushState) {
    const { data, type, url } = event.detail;
    if (!ignorePushState) {
      history.pushState(event.detail, 'James Madden', url);
    }
    if (type === 'article') {
      this.dissapear = true;
      const article = document.createElement('jbm-article');
      article.img = data.img;
      article.title = data.title;
      article.tags = data.tags;
      article.animate = 'true';
      article.article = data.article;
      document.body.appendChild(article);
    }
  }

  render () {
    return html`
      <div class="root ${this.dissapear ? 'dissapear' : ''}">
        <div class="titles">
          <h1>James Madden</h1>
          <h2>Developer, designer.</h2>
        </div>
        <div class="offset-content"></div>
        <h2 class="section-header">Projects</h2>
        <section id="projects" style="padding-bottom: 12rem">
          <div class="projects-grid">
            <img-card src=${projects[0].img} title=${projects[0].title} bio=${projects[0].bio} .tags=${projects[0].tags} postUrl=${projects[0].post} link=${"/article/" + projects[0].title.replace(/ /g, '_').toLowerCase()}></img-card>
            <img-card src=${projects[1].img} title=${projects[1].title} bio=${projects[1].bio} .tags=${projects[1].tags} postUrl=${projects[1].post} link=${"/article/" + projects[1].title.replace(/ /g, '_').toLowerCase()}></img-card>
            <img-card src=${projects[2].img} title=${projects[2].title} bio=${projects[2].bio} .tags=${projects[2].tags} postUrl=${projects[2].post} link=${"/article/" + projects[2].title.replace(/ /g, '_').toLowerCase()}></img-card>
            <img-card src="./assets/more.svg" title="More"></img-card>
          </div>
        </section>
      </div>
    `;
  }

}

customElements.define('jbm-root', Root);

console.log('test');