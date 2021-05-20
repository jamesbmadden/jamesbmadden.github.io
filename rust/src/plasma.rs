use crate::render;

use colorsys::{ Rgb, Hsl };

pub fn colour_at(x: f64, y: f64, now: f64) -> [f32; 3] {

  // let hue: f64 = 180. + 180. * (now / 10.).sin() + (x * x + y * y).sqrt() * 0.5;
  let offset_x = x + now / 2.;
  let offset_y = y + now / 2.;

  let intensity_offset_y = y - now / 2.;

  let hue: f64 = (
    30. + 30. * (offset_x / 16.).sin()
  + 30. + 30. * (offset_y / 8.).sin()
  + 30. + 30. * ((offset_x + offset_y) / 16.).sin()
  + 30. + 30. * ((offset_x * offset_x + offset_y * offset_y).sqrt() / 8.).sin()
  ) / 4.;

  let intensity: f64 = (
    40. + 40. * (offset_x / 16.).sin()
  + 40. + 40. * (intensity_offset_y / 8.).sin()
  + 40. + 40. * ((offset_x + intensity_offset_y) / 16.).sin()
  + 40. + 40. * ((offset_x * offset_x + intensity_offset_y * intensity_offset_y).sqrt() / 8.).sin()
  ) / 4.;
  
  // get current time
  /*let intensity: f64 = (
    40. + 40. * (x / 16.).sin()
  + 40. + 40. * (y / 8.).sin()
  + 40. + 40. * ((x + y) / 16.).sin()
  + 40. + 40. * ((x * x + y * y).sqrt() / 8.).sin()
  ) / 4.;*/

  let colour_hsl = Hsl::new((hue + now) % 360., 100., 10. + intensity, Some(1.0));
  let colour_rgba: Rgb = colour_hsl.into();

  return [colour_rgba.red() as f32 / 255., colour_rgba.green() as f32 / 255., colour_rgba.blue() as f32 / 255.];
}

pub fn gen_vertices (width: u32, height: u32, time: f32) -> (Vec<render::Vertex>, Vec<u16>) {

  // create a vector to push to
  let mut vertices: Vec<render::Vertex> = Vec::new();
  let mut indices: Vec<u16> = Vec::new();

  // get fraction of the width and height to use
  let x_size = 2. / width as f32;
  let y_size = 2. / height as f32;

  let total_width = width + 1;
  let total_height = height + 1;

  // make a vertex for every point with the right colour according to the colour_at function
  for x in 0..total_width {
    for y in 0..total_height {
      // get the current vertex length to calculate index numbers
      let vert_len: u16 = vertices.len() as u16;
      // get position
      let x_pos = -1. + x_size * x as f32;
      let y_pos = -1. + y_size * y as f32;
      // create a vertex
      vertices.push(render::Vertex {
        pos: [x_pos, y_pos, 0.],
        colour: colour_at(x as f64 - total_width as f64 / 2., y as f64 - total_height as f64 / 2., time as f64)
      });
      // if not the last row or column, create the triangles
      if x + 1 != total_width && y + 1 != total_height {
        indices.append(&mut vec![
          vert_len + 1, vert_len + total_width as u16, vert_len, // bottom left triangle
          vert_len + 1, vert_len + total_width as u16, vert_len + 1 + total_width as u16
        ]);
      }
    }
  }

  return (vertices.iter().cloned().collect(), indices.iter().cloned().collect());
}