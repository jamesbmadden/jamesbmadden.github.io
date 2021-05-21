export default "img {\n  position: relative;\n  width: 100%;\n  border-radius: 8px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n  cursor: pointer;\n\n  transform: translateY(0);\n  transition: transform 0.2s;\n}\nimg:hover {\n  transform: translateY(-1rem);\n}\n\n.image-description {\n  position: absolute;\n  box-sizing: border-box;\n  padding: 1rem;\n  width: 110%; padding-top: 82.5%;\n  left: -5%; top: -5%;\n  background: white;\n  border-radius: 8px;\n  transform: scale(0) translateY(0);\n  transition: transform 0.2s;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n  font-family: 'Lato', sans-serif;\n}\nimg:hover ~ .image-description {\n  transform: scale(1) translateY(-1rem);\n}\n\n.bio {\n  font-size: 1.1rem;\n  color: #333;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n}\n\n.tags {\n  white-space: nowrap;\n  line-height: 3rem;\n  overflow-x: hidden;\n}\n.chip {\n  color: #444;\n  padding: 0.5rem;\n  margin: 0 0.5rem;\n  border: #444 2px solid;\n  border-radius: 10rem;\n}";