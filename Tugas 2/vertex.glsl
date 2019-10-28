precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scale;
uniform float translate;

void main() {
  fColor = vColor;
  // gl_Position = vec4(vPosition, 0.0, 1.0);
  // p' = p
  // p' = T * p
  mat4 skalasi = mat4(
    scale, 0.0, 0.0, 0.1,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  mat4 back = mat4(
    1.0, 0.0, 0.0, -translate,   // dx = -t
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 translasi = mat4(
    1.0, 0.0, 0.0, translate,   // dx = t
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * translasi * rotasi * skalasi * back;
  

}
