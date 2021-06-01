## 👾 A randomly generated 2d game world, written in [Rust](https://www.rust-lang.org) and [WGPU](https://wgpu.rs). 🗺

| ![](https://raw.githubusercontent.com/jamesbmadden/worldxplore/master/.github/readme_img.png) | ![](https://raw.githubusercontent.com/jamesbmadden/worldxplore/master/.github/readme_inv.png) |
:-------------------------:|:-------------------------:
*WorldXPlore Alpha running on MacOS Big Sur.*

WorldXPlore features a randomly-generated 2D world using Perlin noise. You can run and swim through the world, and in the future gather items to make tools. Standard WASD controls are used to move around, and E can be used to open your inventory. The pause screen, which allows for saving and loading your game, or quitting, can be accessed with ESC. Interacting with tiles is not yet implemented.

Currently, WorldXPlore has only been tested on MacOS, but should be compilable on Windows and Linux. Android and iOS and platforms that require other control methods are not yet supported.

## 🧑🏼‍💻 Technical Details

WorldXPlore is written in Rust, and graphics are handled by the WGPU library, a cross-platform Rust implementation of the future WebGPU Standard. UI and text rendering is handled through a custom framework that takes a component-based interface and converts them to vertices for WGPU to render. Shaders handle smooth camera movement but vertices are updated every block moved so that the entire world doesn't have to be in memory at once.