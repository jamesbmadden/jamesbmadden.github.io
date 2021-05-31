attribute vec4 aVertexPosition;

uniform float time;
varying lowp float vTime;

void main() {
  gl_Position = aVertexPosition;
  vTime = time;
}