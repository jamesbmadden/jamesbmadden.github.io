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
      scrollTo({
        top: 0, left: 0, behavior: 'smooth'
      });
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
        <h2 class="section-header centered">About Me</h2>
        <section id="about-me">
          Hi! My name is James. I'm a 17-year old programmer and designer from Vancouver, Canada.<br>
          I started making websites in 2017 and since then I've made countless tools and apps to solve problems in my life.
          From learning lines in a grade 9 performance of <i>A Midsummer Night's Dream</i> to
          <a href="/article/homework_manager">staying on top of my homework</a> to fundraising through online card sales, I've learned
          different technologies, languages, and APIs.
          <hr>
          From informational static sites to complex web apps (or somewhere in between, 
          <a href="/article/james_madden_website">like this site</a>), I can design and develop beautiful and feature-rich websites.
          <br>
          Stay a while, check out some of my projects, tech demos, and designs, or get in contact below if you're interested in
          a website or just a chat!
        </section>
        <div class="about-me-buttons">
          <a href="https://instagram.com/designbyjamesmadden" target="_blank" rel="noreferrer noopener"><button id="instagram-button">Instagram</button></a>
          <a href="mailto:jamesbmadden@gmail.com"><button id="email-button">Email</button></a>
        </div>
      </div>
    `;
  }

}

customElements.define('jbm-root', Root);

console.log('test');