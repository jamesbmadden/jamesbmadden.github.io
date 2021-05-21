import { LitElement, html } from '../_snowpack/pkg/lit.js';
import './components/image-card/image-card.js';

window.addEventListener('wheel', event => {
  event.stopPropagation();
});

class Root extends LitElement {

  render () {
    return html`
      <style>
        * {
          z-index: 2;
        }
        .titles {
          mix-blend-mode: difference;
          color: white;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
        }
        .titles h1 { font-size: 4rem; margin: 0; font-style: italic; }
        .titles h2 { font-size: 2rem; margin: 0; font-weight: 600; }

        .offset-content {
          position: relative;
          width: 100%;
          height: calc(100vh - 128px);
        }
        
        .section-header {
          box-sizing: border-box;
          font-size: 3rem;
          color: white;
          mix-blend-mode: difference;
          margin: 0;
          margin-bottom: 1rem;
          position: relative;
          padding-left: 3rem;
          font-weight: 600;
        }
        .section-header::before {
          content: "";
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: white;
          width: 1rem; height: 1rem;
          border-radius: 50%;
        }
        .section-header::after {
          content: "";
          position: absolute;
          top: 1rem;
          background: white;
          width: 4rem; height: 1rem;
          margin-left: 1rem; 
          border-radius: 0.5rem;
        }
        .projects-grid {
          box-sizing: border-box;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 1.5rem;
        }
        img-card {
          position: relative;
        }
      </style>
      <div class="titles">
        <h1>James Madden</h1>
        <h2>Developer, designer.</h2>
      </div>
      <div class="offset-content"></div>
      <h2 class="section-header">Projects</h2>
      <section id="projects" style="padding-bottom: 100vh">
        <div class="projects-grid">
          <img-card src="./assets/james_madden.png" title="James Madden Website"></img-card>
          <img-card src="./assets/worldxplore.png" title="WorldXPlore"></img-card>
          <img-card src="./assets/homework_app.png" title="Homework Manager"></img-card>
          <img-card src="./assets/more.svg" title="More"></img-card>
        </div>
      </section>
    `;
  }

}

customElements.define('jbm-root', Root);

console.log('test');