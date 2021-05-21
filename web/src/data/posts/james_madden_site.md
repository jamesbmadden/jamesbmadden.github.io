This very website is powered by many exciting technologies: [WGPU](https://wgpu.rs) Rust implementation of the future WebGPU standard, compiled to WebGL and WebAssembly for backwards compatibility) to power the plasma background, and web components using [Lit](https://lit.dev) for the interface.

## WGPU Graphics
The plasma background of this site is written in Rust, making use of the WGPU Graphics library, and compiled to WebAssembly and running on a WebGL 2 backend to support modern browsers. If your browser supports WebGL 2 and WebAssembly, you should be seeing a colourful plasma effect in the background of this page.

The effect is achieved by setting the colour of each vertex according to the average of a series of sine functions, making use of the X and Y position, and offset by the time the page has been running.