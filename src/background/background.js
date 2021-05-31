import vsSource from './shader.vert.js';
import fsSource from './shader.frag.js';

const genVertices = () => {
  
  let vertices = [];
  
  let size = 2.0 / 100;
  
  for (let x = 0; x < 100;  x++) {
    for (let y = 0; y < 100; y++) {
      
      let x_pos  = -1. + size * x;
      let y_pos = -1. + size * y;
      
      vertices.push(x_pos, y_pos + size); // top left
      vertices.push(x_pos, y_pos); // bottom left
      vertices.push(x_pos + size, y_pos); // bottom right
      
      vertices.push(x_pos, y_pos + size); // top left
      vertices.push(x_pos + size, y_pos); // bottom right
      vertices.push(x_pos + size, y_pos + size); // top right
      
    }
  }
  
  return vertices;
  
};

const drawPlasma = (gl, programInfo, buffers, time) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0);  // Clear everything
  gl.enable(gl.DEPTH_TEST);  // Enable depth testing
  gl.depthFunc(gl.LEQUAL);  // Near things obscure far things
  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;  // pull out 2 values per iteration
    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
    const normalize = false;  // don't normalize
    const stride = 0;         // how many bytes to get from one set of values to the next
                              // 0 = use type and numComponents above
    const offset = 0;         // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  
  gl.useProgram(programInfo.program);
  
  gl.uniform1f(programInfo.uniformLocations.time, time);
  
  {
    const offset = 0;
    const vertexCount = 60000;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
  
  requestAnimationFrame(() => {
    drawPlasma(gl, programInfo, buffers, time + 0.1);
  });
};

const plasma = (gl) => {
  // set the clear colour
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // load shaders
  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, vsSource);
  gl.compileShader(vert);
  
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, fsSource);
  gl.compileShader(frag);
  
  if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the vert shaders: ' + gl.getShaderInfoLog(vert));
    gl.deleteShader(vert);
    return null;
  }
  if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the frag shaders: ' + gl.getShaderInfoLog(frag));
    gl.deleteShader(frag);
    return null;
  }
  
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vert);
  gl.attachShader(shaderProgram, frag);
  gl.linkProgram(shaderProgram);
  
  // check to make sure the shader program linked successfully
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  
  // get locations for attributes and uniforms
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      time: gl.getUniformLocation(shaderProgram, 'time')
    },
  };
  
  // create buffers
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
  const positions = genVertices();
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
  drawPlasma(gl, programInfo, {vertex: vertexBuffer}, 0.0);
}


// down here will not be in the website
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('webgl');

if (ctx === null) {
  alert("can't initalize webgl");
} else {
  plasma(ctx);
}