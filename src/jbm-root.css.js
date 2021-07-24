export default ".root {\n  transition: opacity 1s, transform 1s;\n  opacity: 1;\n}\n.root.dissapear {\n  opacity: 0;\n  transform: translate(-100vw);\n}\n\n.titles {\n  mix-blend-mode: difference;\n  color: white;\n  position: absolute;\n  top: 0; left: 0;\n  width: 100%; height: 100vh;\n  display: flex; flex-direction: column;\n  justify-content: center; align-items: center;\n  z-index: 3;\n}\n.titles h1 { font-size: 4rem; margin: 0; font-style: italic; }\n.titles h2 { font-size: 2rem; margin: 0; font-weight: 600; }\n\n.offset-content {\n  position: relative;\n  width: 100%;\n  height: calc(100vh - 128px);\n}\n\n.section-header {\n  font-family: 'Lato', sans-serif;\n  box-sizing: border-box;\n  font-size: 3rem;\n  color: white;\n  mix-blend-mode: difference;\n  margin: 0;\n  margin-bottom: 1rem;\n  position: relative;\n  padding-left: 3rem;\n  font-weight: 600;\n  z-index: 2;\n}\n.section-header::before {\n  content: \"\";\n  position: absolute;\n  top: 1.5rem;\n  left: 1rem;\n  background: white;\n  width: 1rem; height: 1rem;\n  border-radius: 50%;\n}\n.section-header::after {\n  content: \"\";\n  position: absolute;\n  top: 1.5rem;\n  background: white;\n  width: 4rem; height: 1rem;\n  margin-left: 1rem; \n  border-radius: 0.5rem;\n}\n\n.section-header.centered {\n  text-align: center;\n  padding-left: 0;\n}\n.section-header.centered::before {\n  position: relative;\n  width: 2rem;\n  top: -0.5rem;\n  left: -1rem;\n  border-radius: 1rem;\n  display: inline-block;\n}\n.section-header.centered::after {\n  width: 2rem;\n}\n\n.projects-grid {\n  box-sizing: border-box;\n  padding: 0 1.5rem;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-gap: 1.5rem;\n}\n@media (max-width: 750px) {\n  .projects-grid {\n    grid-template-columns: repeat(2, 1fr);\n    grid-gap: 0.5rem;\n    padding: 0 0.5rem;\n  }\n}\n\nimg-card {\n  position: relative;\n}\n\n#about-me {\n  z-index: 1;\n  background: #fff;\n  display: block;\n  position: relative;\n  width: 100%;\n  max-width: 600px;\n  margin: auto;\n  box-sizing: border-box;\n  padding: 1rem;\n  text-align: justify;\n  font-size: 1.1rem;\n  border-radius: 8px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);\n}\n.about-me-buttons {\n  position: relative;\n  max-width: 600px;\n  margin: auto;\n  padding-top: 1rem;\n}\n.about-me-buttons button {\n  color: white;\n  border: 0;\n  height: 3rem;\n  min-width: 8rem;\n  border-radius: 8px;\n  background: linear-gradient(90deg, #222, #555);\n  font-size: 1.15rem;\n  margin-right: 1rem;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 0.2s, transform 0.2s, filter 0.4s;\n}\n.about-me-buttons button:hover {\n  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);\n  transform: translateY(-2px);\n  filter: hue-rotate(120deg);\n}\n#instagram-button {\n  background: linear-gradient(90deg, #eb7434, #eb349b);\n}\n#email-button {\n  background: linear-gradient(90deg, #6937de, #2f9dc4 100%);\n}";