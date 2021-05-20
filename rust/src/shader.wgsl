struct VertexOutput {
  [[builtin(position)]] position: vec4<f32>;
  [[location(0)]] colour: vec4<f32>;
};

[[stage(vertex)]]
fn vs_main (
  [[location(0)]] position: vec3<f32>,
  [[location(1)]] colour: vec3<f32>
) -> VertexOutput {
  var out: VertexOutput;
  out.position = vec4<f32>(position, 1.0);
  out.colour = vec4<f32>(colour, 1.0);
  return out;
}

[[stage(fragment)]]
fn fs_main (in: VertexOutput) -> [[location(0)]] vec4<f32> {
  return in.colour;
}