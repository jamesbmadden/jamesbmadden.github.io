// this point on will be its own file in my website
const vsSource = `
attribute vec4 aVertexPosition;

uniform float time;
varying lowp float vTime;

void main() {
  gl_Position = aVertexPosition;
  vTime = time;
}
`;
const fsSource = `
varying lowp float vTime;

lowp float modulo(lowp float num, lowp float divisor) {
    // [Dividend-{(Dividend/Divisor)*Divisor}]
    return num - float(((int(num)/int(divisor))*int(divisor)));
}

lowp vec4 hsl_to_rgb(lowp float h, lowp float s, lowp float l) {
    lowp float percent_s;
    lowp float percent_l;
    lowp float c;
    lowp float x;
    lowp float m;
    lowp float r;
    lowp float g;
    lowp float b;
    percent_s = (s / 100.0);
    percent_l = (l / 100.0);
    c = ((1.0 - abs(((2.0 * percent_l) - 1.0))) * percent_s);
    x = (c * (1.0 - abs((modulo((h / 60.0), 2.0) - 1.0))));
    m = (1.0 - (c / 2.0));
    if(((0.0 <= h) && (h < 60.0))) {
        r = c;
        g = x;
        b = 0.0;
    } else {
        if(((60.0 <= h) && (h < 120.0))) {
            r = x;
            g = c;
            b = 0.0;
        } else {
            if(((120.0 <= h) && (h < 180.0))) {
                r = 0.0;
                g = c;
                b = x;
            } else {
                if(((180.0 <= h) && (h < 240.0))) {
                    r = 0.0;
                    g = x;
                    b = c;
                } else {
                    if(((240.0 <= h) && (h < 300.0))) {
                        r = x;
                        g = 0.0;
                        b = c;
                    } else {
                        if(((300.0 <= h) && (h < 360.0))) {
                            r = c;
                            g = 0.0;
                            b = x;
                        }
                    }
                }
            }
        }
    }
    return vec4(r, g, b, 1.0);
}

lowp vec4 get_colour(vec4 pos, lowp float time2) {
    lowp float tile_size = 0.02;
    lowp float x1;
    lowp float y;
    lowp float offset_x;
    lowp float offset_y;
    lowp float intensity_offset_y;
    lowp float h1;
    lowp float l1;
    x1 = ((((pos.x + 1.0) / tile_size) - 50.5) / 600.0);
    y = ((((pos.y + 1.0) / tile_size) - 50.5) / 600.0);
    offset_x = (x1 + (time2 / 2.0));
    offset_y = (y + (time2 / 2.0));
    intensity_offset_y = (y - (time2 / 2.0));
    h1 = ((((((((30.0 + (30.0 * sin((offset_x / 16.0)))) + 30.0) + (30.0 * sin((offset_y / 8.0)))) + 30.0) + (30.0 * sin(((offset_x + offset_y) / 16.0)))) + 30.0) + (30.0 * sin((sqrt(((offset_x * offset_x) + (offset_y * offset_y))) / 8.0)))) / 4.0);
    l1 = ((((((((40.0 + (40.0 * sin((offset_x / 16.0)))) + 40.0) + (40.0 * sin((intensity_offset_y / 8.0)))) + 40.0) + (40.0 * sin(((offset_x + intensity_offset_y) / 16.0)))) + 40.0) + (40.0 * sin((sqrt(((offset_x * offset_x) + (intensity_offset_y * intensity_offset_y))) / 8.0)))) / 4.0);
    lowp vec4 _expr142 = hsl_to_rgb(modulo((h1 + time2), 360.0), 100.0, (10.0 + l1));
    return _expr142;
}

void main() {
  gl_FragColor = get_colour(gl_FragCoord, vTime);
}
`;

const genVertices = () => {
  
  let vertices = [];
  
  let size = 2.0 / 100;
  
  for (let x = 0; x < 101;  x++) {
    for (let y = 0; y < 101; y++) {
      
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