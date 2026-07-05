import { useEffect, useRef } from "react";

const VERT_SRC = `
  attribute vec2 aPos;
  void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG_SRC = `
  precision highp float;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uIntensity;

  float hash21(vec2 p){
    p = fract(p*vec2(123.34,456.21));
    p += dot(p, p+45.32);
    return fract(p.x*p.y);
  }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash21(i);
    float b = hash21(i+vec2(1.0,0.0));
    float c = hash21(i+vec2(0.0,1.0));
    float d = hash21(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float ridged(vec2 p){
    float n = noise(p);
    return 1.0 - abs(n*2.0 - 1.0);
  }
  float fbmRidged(vec2 p){
    float s = 0.0; float amp = 0.6; float freq = 1.0;
    for(int i=0;i<4;i++){
      s += ridged(p*freq) * amp;
      freq *= 2.02;
      amp *= 0.55;
    }
    return s;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
    float r = length(uv);

    float bend = 0.045 / (r*r + 0.02);
    vec2 dir = uv / max(r, 0.0001);
    vec2 warped = uv + dir * bend * 0.03;

    float starField = hash21(floor(warped*900.0));
    float stars = smoothstep(0.9975, 1.0, starField);
    float starTwinkle = 0.6 + 0.4*sin(uTime*2.0 + starField*40.0);
    vec3 col = vec3(0.012,0.013,0.02) + stars*starTwinkle*vec3(0.75,0.85,1.0)*0.7;

    float horizonR = 0.155;
    float ringR = horizonR * 1.18;
    float ring = smoothstep(0.012, 0.0, abs(r - ringR));

    vec2 diskUV = vec2(uv.x, uv.y*2.35);
    float diskR = length(diskUV);
    float angle = atan(diskUV.y, diskUV.x);
    float rot = uTime * 0.06;

    float filaments = fbmRidged(vec2(diskR*7.0, angle*2.6 + rot*9.0));
    filaments = pow(clamp(filaments,0.0,1.0), 1.8);

    float diskMaskOuter = smoothstep(0.62, 0.15, diskR);
    float diskMaskInner = smoothstep(horizonR*1.28, horizonR*1.4, diskR);
    float diskMask = diskMaskOuter * diskMaskInner;

    float heat = smoothstep(0.55, 0.05, diskR);
    vec3 cool = vec3(0.42,0.10,0.05);
    vec3 mid  = vec3(1.0,0.55,0.16);
    vec3 hot  = vec3(1.0,0.96,0.85);
    vec3 diskColor = mix(cool, mid, smoothstep(0.0,0.6,heat));
    diskColor = mix(diskColor, hot, smoothstep(0.55,1.0,heat));
    diskColor *= (filaments*1.15 + 0.12);

    col = mix(col, diskColor, diskMask);
    col += ring * vec3(0.65,0.88,1.0) * 1.4;

    float horizon = smoothstep(horizonR, horizonR-0.008, r);
    col = mix(col, vec3(0.0), horizon);

    col = col / (1.0 + col*0.9);
    col *= uIntensity;

    float vig = smoothstep(1.1, 0.2, r);
    col *= mix(0.5, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Fixed, full-viewport ambient black hole shader used behind every
 * marketing page. `intensity` lets quieter interior pages (About, Model)
 * dim it so it doesn't compete with foreground content.
 */
export default function Backdrop({ intensity = 1.0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const verts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uIntensity = gl.getUniformLocation(prog, "uIntensity");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener("resize", resize);
    resize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = null;

    function frame(t) {
      const elapsed = reduceMotion ? 0 : (t - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} className="site-backdrop" />;
}
