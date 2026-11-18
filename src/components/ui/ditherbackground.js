"use client";

import React, { useEffect, useRef } from "react";

const VERT = `attribute vec2 a_position;
void main(){gl_Position=vec4(a_position,0.0,1.0);}`;

const FRAG = `precision mediump float;
uniform vec3 u_colors[8];
uniform vec4 u_scene,u_shape,u_surface,u_finish,u_transform,u_space,u_cursor;
#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#define u_seed mod(u_transform.x,31.0)
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p){
  p=mod(p,31.0);
  p=fract(p*vec2(234.34,435.345));
  p+=dot(p,p+34.23);
  return fract(p.x*p.y);
}
float grainHash(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.0,0.0)),u.x),mix(hash21(i+vec2(0.0,1.0)),hash21(i+vec2(1.0,1.0)),u.x),u.y);
}
float fbm2(vec2 p){
  return 0.6*noise(p)+0.3*noise(p*2.03+vec2(17.0,9.2));
}
float fbm(vec2 p){
  float v=0.0,a=0.5;
  for(int i=0;i<4;i++){
    v+=a*noise(p);
    p=p*2.03+vec2(17.0,9.2);
    a*=0.5;
  }
  return v;
}
vec3 mixColour(vec3 a,vec3 b,float t){
  return mix(a,b,t);
}
vec3 palette(float x){
  float n=max(u_colorCount-1.0,1.0);
  float f=clamp(x,0.0,1.0)*n;
  vec3 col=u_colors[0];
  for(int i=0;i<7;i++){
    if(float(i)<n)
      col=mixColour(col,u_colors[i+1],smoothstep(0.0,1.0,clamp(f-float(i),0.0,1.0)));
  }
  return col;
}
vec3 hueRotate(vec3 col,float a){
  const mat3 toYIQ=mat3(0.299,0.596,0.211,0.587,-0.274,-0.523,0.114,-0.322,0.312);
  const mat3 toRGB=mat3(1.0,1.0,1.0,0.956,-0.272,-1.106,0.621,-0.647,1.703);
  vec3 yiq=toYIQ*col;
  float ca=cos(a),sa=sin(a);
  yiq=vec3(yiq.x,yiq.y*ca-yiq.z*sa,yiq.y*sa+yiq.z*ca);
  return toRGB*yiq;
}
vec3 shade(vec2 uv,vec2 p,float t){
  vec2 q = vec2(p.x * 1.4, p.y * 1.4 - t * 2.0);
  float amp = u_intensity;
  for(float i = 1.0; i < 5.0; i += 1.0){
    q.x += (amp / i) * cos(i * 2.4 * q.y + t * 1.2 + u_seed);
    q.y += (amp / i) * cos(i * 1.7 * q.x + t * 0.9);
  }

  float wave = 0.5 + 0.5 * sin(q.y * 2.2 + 0.45 * q.x);
  return palette(clamp(wave, 0.0, 1.0));
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  vec2 screenUv=uv;
  vec2 p=(gl_FragCoord.xy-0.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);
  float cursorMask=0.0;
  if(u_cursorPresence>0.001){
    vec2 cursor=(0.5*u_mouse*u_resolution.xy)/min(u_resolution.x,u_resolution.y);
    vec2 cursorDelta=p-cursor;
    if(u_cursorEffect<0.5){
      p+=cursor*u_cursorPresence*u_cursorStrength*0.55;
    }else{
      float cursorDistance=length(cursorDelta);
      vec2 cursorDirection=cursorDelta/max(cursorDistance,0.0001);
      cursorMask=u_cursorPresence*(1.0-smoothstep(0.0,u_cursorRadius,cursorDistance));
      if(u_cursorEffect<1.5){
        p-=cursorDirection*cursorMask*u_cursorStrength*0.24;
      }else if(u_cursorEffect<2.5){
        float cursorAngle=cursorMask*u_cursorStrength*2.2;
        float cc=cos(cursorAngle),cs=sin(cursorAngle);
        p=cursor+mat2(cc,-cs,cs,cc)*cursorDelta;
      }else if(u_cursorEffect<3.5){
        float ripple=sin(cursorDistance/max(u_cursorRadius,0.001)*18.0-u_time*5.0);
        p-=cursorDirection*ripple*cursorMask*u_cursorStrength*0.07;
      }
    }
  }
  uv=p*min(u_resolution.x,u_resolution.y)/u_resolution.xy+0.5;
  p*=u_scale;
  if(abs(u_rotate)>0.0001){
    float cr=cos(u_rotate),sr=sin(u_rotate);
    p=mat2(cr,-sr,sr,cr)*p;
  }
  p+=u_offset;
  if(u_drift>0.0001) p+=u_drift*vec2(sin(u_time*0.31),cos(u_time*0.23));
  if(u_warp>0.0){
    p+=u_warp*(vec2(fbm(p*u_detail+u_seed),fbm(p*u_detail+vec2(5.2,1.3)))-0.5);
  }
  vec3 col=shade(screenUv,p,u_time);
  if(abs(u_contrast-1.0)>0.0001) col=(col-0.5)*u_contrast+0.5;
  if(abs(u_saturation-1.0)>0.0001){
    float luma=dot(col,vec3(0.299,0.587,0.114));
    col=mix(vec3(luma),col,u_saturation);
  }
  if(abs(u_hue)>0.0001) col=hueRotate(col,u_hue);
  if(abs(u_brightness)>0.0001) col+=u_brightness;
  if(u_vignette>0.0001){
    float vd=length(screenUv-0.5)*1.41421356;
    col*=1.0-u_vignette*smoothstep(0.35,1.0,vd);
  }
  if(u_cursorPresence>0.001&&u_cursorEffect>3.5) col+=(vec3(0.18)+col*0.12)*cursorMask*u_cursorStrength;
  if(u_grain>0.0001) col+=(grainHash(gl_FragCoord.xy+vec2(u_seed*17.0,u_seed*31.0))-0.5)*u_grain;
  gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
}`;

export function parseColor(c) {
  if (!c) return [0, 0, 0];
  if (Array.isArray(c)) {
    return c.length >= 3
      ? [
          c[0] > 1 ? c[0] / 255 : c[0],
          c[1] > 1 ? c[1] / 255 : c[1],
          c[2] > 1 ? c[2] / 255 : c[2],
        ]
      : [0, 0, 0];
  }
  if (typeof c === "string") {
    let h = c.replace("#", "").trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length >= 6) {
      const n = parseInt(h.slice(0, 6), 16);
      if (!Number.isNaN(n))
        return [
          ((n >> 16) & 255) / 255,
          ((n >> 8) & 255) / 255,
          (n & 255) / 255,
        ];
    }
  }
  return [0, 0, 0];
}

export function resolveColors({
  colors,
  waveMain = "#d9521d",
  waveSecondary = "#ffb27c",
  waveThird = "#0a0a0a",
  mainBg = "#ffffe7",
}) {
  const list =
    Array.isArray(colors) && colors.length > 0
      ? colors.map(parseColor)
      : [
          parseColor(waveThird),
          parseColor(waveMain),
          parseColor(waveMain),
          parseColor(waveSecondary),
          parseColor(waveSecondary),
          parseColor(mainBg),
        ];
  const count = Math.min(Math.max(list.length, 1), 8);
  const result = [];
  for (let i = 0; i < 8; i++) result.push(list[i % count] || [1, 1, 1]);
  return {
    colors: result,
    colorCount: count,
    colorsFlat: new Float32Array(result.flat()),
  };
}

const pendingContextReleases = new WeakMap();

export function ShaderBackground({
  className = "",
  style,
  height,
  minHeight,
  maxHeight,
  width,
  colors,
  waveMain = "#d9521d",
  waveSecondary = "#ffb27c",
  waveThird = "#0a0a0a",
  mainBg = "#ffffe7",
  waveWidth = 1.3,
  waveAmplitude,
  waveamplitude,
  waveScale,
  wavescale,
  paramA,
  frequency,
  scale = 0.95,
  speed,
  timeScale = 0.309,
  intensity = 0.62,
  warp = 0.012,
  detail = 2.4,
  contrast = 1.104,
  brightness = 0.0,
  saturation = 1.0,
  hue = 0.0,
  vignette = 0.0,
  blur = 0.0,
  grain = 0.22,
  seed = 1581.0,
  rotate = 0.0,
  offsetX = 0.0,
  offsetY = 0.0,
  drift = 0.0,
  oklab = false,
  interactive,
  cursorEnabled = false,
  cursorEffect = 2.0,
  cursorStrength = 0.65,
  cursorRadius = 0.46,
  ...props
}) {
  const canvasRef = useRef(null);
  const requestRenderRef = useRef(null);

  // 30% bigger wave scaling multiplier
  const userScale =
    waveScale !== undefined
      ? waveScale
      : wavescale !== undefined
        ? wavescale
        : frequency !== undefined
          ? frequency * scale
          : scale;
  const activeScale = userScale / 1.3;
  const activeAmplitude =
    waveAmplitude !== undefined
      ? waveAmplitude
      : waveamplitude !== undefined
        ? waveamplitude
        : 0.25 + intensity * 0.85;
  const activeWaveWidth = paramA !== undefined ? paramA : waveWidth;
  const activeSpeed = speed !== undefined ? speed : timeScale;
  const activeCursor = interactive !== undefined ? interactive : cursorEnabled;
  const colorConfig = resolveColors({
    colors,
    waveMain,
    waveSecondary,
    waveThird,
    mainBg,
  });

  const liveRef = useRef(null);

  useEffect(() => {
    liveRef.current = {
      colorsFlat: colorConfig.colorsFlat,
      colorCount: colorConfig.colorCount,
      scale: activeScale,
      intensity: activeAmplitude,
      paramA: activeWaveWidth,
      warp,
      detail,
      contrast,
      brightness,
      saturation,
      hue,
      vignette,
      blur,
      grain,
      seed,
      rotate,
      offsetX,
      offsetY,
      drift,
      oklab: oklab ? 1.0 : 0.0,
      timeScale: activeSpeed,
      cursorEnabled: activeCursor,
      cursorEffect,
      cursorStrength,
      cursorRadius,
      dirty: true,
    };
    if (requestRenderRef.current) requestRenderRef.current();
  }, [
    colorConfig,
    activeScale,
    activeAmplitude,
    activeWaveWidth,
    warp,
    detail,
    contrast,
    brightness,
    saturation,
    hue,
    vignette,
    blur,
    grain,
    seed,
    rotate,
    offsetX,
    offsetY,
    drift,
    oklab,
    activeSpeed,
    activeCursor,
    cursorEffect,
    cursorStrength,
    cursorRadius,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pendingRelease = pendingContextReleases.get(canvas);
    if (pendingRelease !== undefined) window.clearTimeout(pendingRelease);
    pendingContextReleases.delete(canvas);
    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram();
    if (!program) return;
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uni = {
      colors: gl.getUniformLocation(program, "u_colors"),
      scene: gl.getUniformLocation(program, "u_scene"),
      shape: gl.getUniformLocation(program, "u_shape"),
      surface: gl.getUniformLocation(program, "u_surface"),
      finish: gl.getUniformLocation(program, "u_finish"),
      transform: gl.getUniformLocation(program, "u_transform"),
      space: gl.getUniformLocation(program, "u_space"),
      cursor: gl.getUniformLocation(program, "u_cursor"),
    };

    let targetX = 0,
      targetY = 0,
      targetPresence = 0;
    let mouseX = 0,
      mouseY = 0,
      cursorPresence = 0;
    let pointerKnown = false,
      pointerClientX = 0,
      pointerClientY = 0;
    let bounds = canvas.getBoundingClientRect();
    let raf = 0,
      lastNow = null,
      visible = document.visibilityState === "visible",
      inView = true,
      disposed = false,
      start = null;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rawW = Math.max(1, Math.round(bounds.width * dpr));
      const rawH = Math.max(1, Math.round(bounds.height * dpr));
      const pixelScale = Math.min(
        1,
        Math.sqrt(1_500_000 / Math.max(1, rawW * rawH)),
      );
      const w = Math.max(1, Math.round(rawW * pixelScale));
      const h = Math.max(1, Math.round(rawH * pixelScale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    function requestRender() {
      if (!disposed && visible && inView && raf === 0) {
        raf = requestAnimationFrame(render);
      }
    }
    requestRenderRef.current = requestRender;

    const updatePointerTarget = () => {
      if (!pointerKnown || bounds.width === 0 || bounds.height === 0) return;
      const inside =
        pointerClientX >= bounds.left &&
        pointerClientX <= bounds.right &&
        pointerClientY >= bounds.top &&
        pointerClientY <= bounds.bottom;
      if (!inside) {
        targetPresence = 0;
        requestRender();
        return;
      }
      const nextX = ((pointerClientX - bounds.left) / bounds.width) * 2 - 1;
      const nextY = -(((pointerClientY - bounds.top) / bounds.height) * 2 - 1);
      if (targetPresence === 0 && cursorPresence < 0.01) {
        mouseX = nextX;
        mouseY = nextY;
      }
      targetX = nextX;
      targetY = nextY;
      targetPresence = 1;
      requestRender();
    };

    const onPointerMove = (e) => {
      if (!liveRef.current?.cursorEnabled) return;
      pointerKnown = true;
      pointerClientX = e.clientX;
      pointerClientY = e.clientY;
      bounds = canvas.getBoundingClientRect();
      updatePointerTarget();
    };

    const onPointerLeave = () => {
      pointerKnown = false;
      targetPresence = 0;
      requestRender();
    };

    const updateLayout = () => {
      bounds = canvas.getBoundingClientRect();
      resizeCanvas();
      updatePointerTarget();
      requestRender();
    };

    window.addEventListener("resize", updateLayout);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointercancel", onPointerLeave);
    window.addEventListener("scroll", updateLayout, true);
    window.addEventListener("blur", onPointerLeave);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) requestRender();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    });
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      if (visible) requestRender();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    function render(now) {
      raf = 0;
      if (disposed || !visible || !inView) return;
      if (start === null) start = now;
      const u = liveRef.current;
      if (!u) return;

      const dt = lastNow === null ? 0 : Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      const follow = 1 - Math.exp(-12 * dt);
      mouseX += (targetX - mouseX) * follow;
      mouseY += (targetY - mouseY) * follow;
      cursorPresence += (targetPresence - cursorPresence) * follow;
      resizeCanvas();

      // Only re-upload static uniforms when props change
      if (u.dirty) {
        gl.uniform3fv(uni.colors, u.colorsFlat);
        gl.uniform4f(uni.shape, u.scale, u.intensity, u.paramA, u.warp);
        gl.uniform4f(
          uni.surface,
          u.detail,
          u.contrast,
          u.brightness,
          u.saturation,
        );
        gl.uniform4f(uni.finish, u.hue, u.vignette, u.blur, u.grain);
        gl.uniform4f(uni.transform, u.seed, u.rotate, u.drift, u.oklab);
        u.dirty = false;
      }

      // Dynamic frame uniforms
      gl.uniform4f(
        uni.scene,
        canvas.width,
        canvas.height,
        ((now - start) / 1000) * u.timeScale,
        u.colorCount,
      );
      gl.uniform4f(uni.space, u.offsetX, u.offsetY, mouseX, mouseY);
      gl.uniform4f(
        uni.cursor,
        u.cursorEnabled ? cursorPresence : 0,
        u.cursorEffect,
        u.cursorStrength,
        u.cursorRadius,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const timeAnimated = Math.abs(u.timeScale) > 0.0001;
      const pointerSettling =
        Math.abs(targetX - mouseX) > 0.001 ||
        Math.abs(targetY - mouseY) > 0.001 ||
        Math.abs(targetPresence - cursorPresence) > 0.001;
      if (timeAnimated || pointerSettling) requestRender();
      else lastNow = null;
    }

    requestRender();

    return () => {
      disposed = true;
      requestRenderRef.current = null;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointercancel", onPointerLeave);
      window.removeEventListener("scroll", updateLayout, true);
      window.removeEventListener("blur", onPointerLeave);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      );
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      const releaseTimer = window.setTimeout(() => {
        if (pendingContextReleases.get(canvas) !== releaseTimer) return;
        pendingContextReleases.delete(canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.width = 1;
        canvas.height = 1;
      }, 0);
      pendingContextReleases.set(canvas, releaseTimer);
    };
  }, []);

  const canvasStyle = {
    display: "block",
    width: width !== undefined ? width : "100%",
    height: height !== undefined ? height : "100%",
    ...(minHeight !== undefined ? { minHeight } : {}),
    ...(maxHeight !== undefined ? { maxHeight } : {}),
    ...style,
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={canvasStyle}
      {...props}
    />
  );
}

export default function DitherBackground({
  children,
  className = "",
  style,
  height,
  minHeight,
  maxHeight,
  width,
  colors,
  waveMain,
  waveSecondary,
  waveThird,
  mainBg,
  waveWidth,
  waveAmplitude,
  waveamplitude,
  waveScale,
  wavescale,
  frequency,
  scale,
  speed,
  timeScale,
  intensity,
  paramA,
  warp,
  detail,
  contrast,
  brightness,
  saturation,
  hue,
  vignette,
  blur,
  grain,
  seed,
  rotate,
  offsetX,
  offsetY,
  drift,
  oklab,
  interactive,
  cursorEnabled,
  cursorEffect,
  cursorStrength,
  cursorRadius,
  ...props
}) {
  const shaderProps = {
    colors,
    waveMain,
    waveSecondary,
    waveThird,
    mainBg,
    waveWidth,
    waveAmplitude,
    waveamplitude,
    waveScale,
    wavescale,
    frequency,
    scale,
    speed,
    timeScale,
    intensity,
    paramA,
    warp,
    detail,
    contrast,
    brightness,
    saturation,
    hue,
    vignette,
    blur,
    grain,
    seed,
    rotate,
    offsetX,
    offsetY,
    drift,
    oklab,
    interactive,
    cursorEnabled,
    cursorEffect,
    cursorStrength,
    cursorRadius,
  };

  const containerStyle = {
    width: width !== undefined ? width : "100%",
    ...(height !== undefined ? { height } : {}),
    ...(minHeight !== undefined ? { minHeight } : {}),
    ...(maxHeight !== undefined ? { maxHeight } : {}),
    ...style,
  };

  if (!children) {
    return (
      <ShaderBackground
        className={className}
        style={containerStyle}
        {...shaderProps}
        {...props}
      />
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={containerStyle}
    >
      <ShaderBackground
        className="absolute inset-0 w-full h-full"
        {...shaderProps}
        {...props}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
