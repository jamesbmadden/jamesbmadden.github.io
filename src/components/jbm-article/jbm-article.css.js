export default "@keyframes animatedEntry {\n  from {\n    opacity: 0;\n    transform: translate(100vw);\n  }\n}\n@keyframes animatedExit {\n  to {\n    opacity: 0;\n    transform: translate(100vw);\n  }\n}\n\n.jbm-article-root {\n  position: absolute;\n  box-sizing: border-box;\n  padding: 2rem;\n  top: 0; left: 0;\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 1rem;\n  opacity: 1;\n}\n.jbm-article-root.animate {\n  animation: animatedEntry 1s;\n}\n.jbm-article-root.dissapear {\n  animation: animatedExit 1s;\n}\n\n.jbm-article, .jbm-article-header, .jbm-article-header-img {\n  grid-column: 1 / 3;\n}\n.jbm-article-aside {\n  grid-column: 3 / -1;\n}\n\n.jbm-article-header-img {\n  width: 100%;\n  border-radius: 1rem;\n  height: 256px;\n  object-fit: cover;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n}\n.jbm-article-header {\n  font-size: 3rem;\n  color: white;\n  mix-blend-mode: difference;\n  margin: 0;\n}\n.jbm-article {\n  background: white;\n  padding: 1rem;\n  border-radius: 1rem;\n  text-align: justify;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n}\n.jbm-article p { margin: 0; }";