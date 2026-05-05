import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useApp } from '../context/AppContext';

export default function ScrollFX() {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ─── Scene ─── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    camera.position.z = 5;

    /* ─── Palette selon thème ─── */
    const C1 = isDark ? new THREE.Color('#0AC4E0') : new THREE.Color('#0992C2');
    const C2 = isDark ? new THREE.Color('#0B2D72') : new THREE.Color('#4A8CEF');
    const C3 = isDark ? new THREE.Color('#1a4fa8') : new THREE.Color('#7DB8F7');

    /* ─── Particules principales ─── */
    const N = 1800;
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);
    const sizes     = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const mix = Math.random();
      const col = mix < 0.5
        ? new THREE.Color().lerpColors(C1, C2, Math.random())
        : new THREE.Color().lerpColors(C2, C3, Math.random());

      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* ─── Grille de lignes (wireframe) ─── */
    const gridGeo = new THREE.BufferGeometry();
    const gridLines = [];
    const gridRows = 10, gridCols = 10;
    for (let i = 0; i <= gridRows; i++) {
      const y = (i / gridRows - 0.5) * 20;
      gridLines.push(-10, y, -8, 10, y, -8);
    }
    for (let j = 0; j <= gridCols; j++) {
      const x = (j / gridCols - 0.5) * 20;
      gridLines.push(x, -10, -8, x, 10, -8);
    }
    gridGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(gridLines), 3));
    const gridMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x0AC4E0 : 0x0992C2,
      transparent: true,
      opacity: isDark ? 0.06 : 0.05,
    });
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    scene.add(grid);

    /* ─── Anneau déco ─── */
    const ringGeo = new THREE.TorusGeometry(3.5, 0.012, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0AC4E0 : 0x0992C2,
      transparent: true,
      opacity: isDark ? 0.18 : 0.12,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(5.5, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: isDark ? 0x0B2D72 : 0x4A8CEF, transparent: true, opacity: 0.1 })
    );
    ring2.rotation.x = Math.PI / 4;
    scene.add(ring2);

    /* ─── Scroll ─── */
    let scrollProgress = 0;
    let targetScroll   = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─── Resize ─── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ─── Mouse parallax ─── */
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    /* ─── Animation loop ─── */
    let t = 0;
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005;

      /* Smooth scroll */
      scrollProgress += (targetScroll - scrollProgress) * 0.04;

      /* Rotation des particules basée sur scroll */
      particles.rotation.y  = t * 0.06  + scrollProgress * Math.PI * 1.2;
      particles.rotation.x  = t * 0.03  + scrollProgress * Math.PI * 0.5;
      particles.rotation.z  = scrollProgress * Math.PI * 0.3;

      /* Camera voyage en profondeur au scroll */
      camera.position.z = 5  - scrollProgress * 3;
      camera.position.y = scrollProgress * 2.5;

      /* Léger parallax souris */
      camera.position.x += (mx * 0.4 - camera.position.x) * 0.04;
      camera.rotation.y  = mx * 0.04;
      camera.rotation.x  = -my * 0.03;

      /* Anneau tourne */
      ring.rotation.z  = t * 0.18 + scrollProgress * Math.PI;
      ring.rotation.x  = t * 0.08;
      ring2.rotation.z = -t * 0.12 + scrollProgress * Math.PI * 0.7;
      ring2.rotation.y = t * 0.06;

      /* Pulsation de la grille */
      gridMat.opacity = (isDark ? 0.06 : 0.05) + Math.sin(t * 2) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      style={{
        position:      'fixed',
        top: 0, left: 0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
        mixBlendMode:  isDark ? 'screen' : 'multiply',
        opacity:       isDark ? 0.9 : 0.6,
      }}
    />
  );
}
