mod render;
mod plasma;
use winit::{
  event::{Event, WindowEvent, ElementState},
  event_loop::{ControlFlow, EventLoop},
  window::WindowBuilder,
};

async fn run () {
  // set up the window
  let event_loop = EventLoop::new();
  let window = WindowBuilder::new().with_title("jbm background").build(&event_loop).unwrap();
  // create a canvas for web support
  #[cfg(target_arch = "wasm32")]
  {
    use winit::platform::web::WindowExtWebSys;
    // append canvas to body
    web_sys::window()
      .and_then(|win| win.document())
      .and_then(|doc| doc.body())
      .and_then(|body| {
        body.append_child(&web_sys::Element::from(window.canvas()))
        .ok()
      })
      .expect("couldn't append canvas to document body");
  }

  // create renderer
  let mut renderer = render::Render::new(&window).await;

  // run event loop
  event_loop.run(move |event, _, control_flow| {
    match event {
      Event::RedrawRequested(_) => {
        renderer.update();
        renderer.render();
      },
      Event::WindowEvent { event: WindowEvent::CloseRequested, .. } => {
        *control_flow = ControlFlow::Exit;
      },
      Event::WindowEvent { event: WindowEvent::Resized(new_size), .. } => {
        // create new swap chain and depth texture for the new size
        renderer.sc_desc.width = new_size.width;
        renderer.sc_desc.height = new_size.height;
        renderer.swap_chain = renderer.device.create_swap_chain(&renderer.surface, &renderer.sc_desc);
      },
      Event::MainEventsCleared => {
        window.request_redraw();
      },
      _ => ()
    }
  });
}

fn main () {
  // run on futures of promises, whichever the platform supports
  #[cfg(not(target_arch = "wasm32"))]
  futures::executor::block_on(run());
  #[cfg(target_arch = "wasm32")]
  {
    // set up error handling on web
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    // run async fn as promise
    wasm_bindgen_futures::spawn_local(run());
  }
}