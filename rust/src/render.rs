use crate::plasma;
use std::borrow::Cow;
use bytemuck::{Pod, Zeroable};

use wgpu::util::DeviceExt;

/*pub const OPENGL_TO_WGPU_MATRIX: cgmath::Matrix4<f32> = cgmath::Matrix4::new(
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 0.5, 0.0,
  0.0, 0.0, 0.5, 1.0,
);*/

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable, Debug)]
#[cfg(target_arch = "wasm32")]
pub struct Vertex {
  pub colour: [f32; 3],
  pub pos: [f32; 3]
}

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable, Debug)]
#[cfg(not(target_arch = "wasm32"))]
pub struct Vertex {
  pub pos: [f32; 3],
  pub colour: [f32; 3]
}

pub struct Render {
  pub surface: wgpu::Surface,
  pub device: wgpu::Device,
  pub queue: wgpu::Queue,
  pub render_pipeline: wgpu::RenderPipeline,
  pub sc_desc: wgpu::SwapChainDescriptor,
  pub swap_chain: wgpu::SwapChain,
  pub swapchain_format: wgpu::TextureFormat,

  pub vertex_buf: wgpu::Buffer,
  pub index_buf: wgpu::Buffer,
  pub index_count: u32,

  pub time: f32
}

#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable, Debug)]
pub struct Uniforms {
  pub view: [f32; 16]
}

impl Render {

  pub async fn new (window: &winit::window::Window) -> Self {

    let size = window.inner_size();
    let instance = wgpu::Instance::new(wgpu::BackendBit::all());
    let surface = unsafe { instance.create_surface(window) };
    let adapter = instance.request_adapter(&wgpu::RequestAdapterOptions {
      power_preference: wgpu::PowerPreference::default(),
      // request an adapter compatible with our surface
      compatible_surface: Some(&surface)
    }).await.expect("Failed to find an appropriate adapter");

    let (device, queue) = adapter.request_device(&wgpu::DeviceDescriptor {
      label: Some("Device"),
      features: wgpu::Features::empty(),
      limits: wgpu::Limits::default()
    }, None).await.expect("Failed to create device");

    let time: f32 = 0.;
    let (vertices, indices) = plasma::gen_vertices(100, 100, time);
    let index_count = indices.len() as u32;

    // create buffers
    let vertex_buf = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Vertex Buffer"),
      contents: bytemuck::cast_slice(&vertices),
      usage: wgpu::BufferUsage::VERTEX
    });
    let index_buf = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Index Buffer"),
      contents: bytemuck::cast_slice(&indices),
      usage: wgpu::BufferUsage::INDEX
    });

    // load the shader
    let shader = device.create_shader_module(&wgpu::ShaderModuleDescriptor {
      label: Some("Shader Module"),
      source: wgpu::ShaderSource::Wgsl(Cow::Borrowed(include_str!("shader.wgsl"))),
      flags: wgpu::ShaderFlags::all()
    });

    let pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
      label: Some("Pipeline Layout"),
      bind_group_layouts: &[],
      push_constant_ranges: &[]
    });

    let swapchain_format = adapter.get_swap_chain_preferred_format(&surface).unwrap();

    let render_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
      label: Some("Render Pipeline"),
      layout: Some(&pipeline_layout),
      vertex: wgpu::VertexState {
        module: &shader,
        entry_point: "vs_main",
        buffers: &[wgpu::VertexBufferLayout {
          array_stride: std::mem::size_of::<Vertex>() as wgpu::BufferAddress,
          step_mode: wgpu::InputStepMode::Vertex,
          attributes: &wgpu::vertex_attr_array![0 => Float32x3, 1 => Float32x3]
        }]
      },
      fragment: Some(wgpu::FragmentState {
        module: &shader,
        entry_point: "fs_main",
        targets: &[swapchain_format.into()]
      }),
      primitive: wgpu::PrimitiveState::default(),
      depth_stencil: None,
      multisample: wgpu::MultisampleState::default()
    });

    let mut sc_desc = wgpu::SwapChainDescriptor {
      usage: wgpu::TextureUsage::RENDER_ATTACHMENT,
      format: swapchain_format,
      width: size.width,
      height: size.height,
      present_mode: wgpu::PresentMode::Mailbox
    };

    let mut swap_chain = device.create_swap_chain(&surface, &sc_desc);

    // return our render state
    Render {
      surface, queue, device, render_pipeline, sc_desc, swap_chain, swapchain_format, 
      vertex_buf, index_buf, index_count,
      time
    }

  }

  pub fn update (&mut self) {

    self.time += 0.2;
    let (vertices, indices) = plasma::gen_vertices(100, 100, self.time);
    self.index_count = indices.len() as u32;

    // create buffers
    self.vertex_buf = self.device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Vertex Buffer"),
      contents: bytemuck::cast_slice(&vertices),
      usage: wgpu::BufferUsage::VERTEX
    });
    self.index_buf = self.device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Index Buffer"),
      contents: bytemuck::cast_slice(&indices),
      usage: wgpu::BufferUsage::INDEX
    });

  }

  pub fn render (&self) {
    let frame = self.swap_chain.get_current_frame().expect("Failed to acquire next swap chain texture").output;
    let mut encoder = self.device.create_command_encoder(&wgpu::CommandEncoderDescriptor { label: Some("Encoder") });

    {
      let mut rpass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
        label: Some("Render Pass"),
        color_attachments: &[wgpu::RenderPassColorAttachment {
          view: &frame.view,
          resolve_target: None,
          ops: wgpu::Operations {
            load: wgpu::LoadOp::Clear(wgpu::Color {
              r: 0.,
              g: 0.,
              b: 0.,
              a: 1.
            }),
            store: true
          }
        }],
        depth_stencil_attachment: None
      });

      rpass.set_pipeline(&self.render_pipeline);
      //rpass.set_bind_group(0, &self.bind_group, &[]);
      rpass.set_index_buffer(self.index_buf.slice(..), wgpu::IndexFormat::Uint16);
      rpass.set_vertex_buffer(0, self.vertex_buf.slice(..));
      rpass.draw_indexed(0..self.index_count, 0, 0..1);
      //rpass.draw(0..10201, 0..1);
    }
    self.queue.submit(Some(encoder.finish()));
  }

}