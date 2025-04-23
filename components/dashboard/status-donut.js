"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

export function StatusDonut() {
  const mountRef = useRef(null);
  const data = {
    labels: ["New", "Contacted", "Engaged", "Converted"],
    values: [30, 40, 20, 10],
    colors: ["#67e8f9", "#0d9488", "#4ade80", "#fcd34d"],
  };

  useEffect(() => {
    // Scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.minPolarAngle = Math.PI / 2 - 0.3;
    controls.maxPolarAngle = Math.PI / 2 + 0.3;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(1, 2, 2);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xffffff, 0.4);
    rim.position.set(-1, -1, -1);
    scene.add(rim);

    // Donut group
    const donutGroup = new THREE.Group();
    scene.add(donutGroup);

    const total = data.values.reduce((a, b) => a + b, 0);
    let startAngle = -Math.PI / 2;

    data.values.forEach((val, i) => {
      const segmentAngle = (val / total) * Math.PI * 2;
      const geo = new THREE.TorusGeometry(
        2,
        0.5,
        64,
        128,
        segmentAngle - 0.02
      );
      const mat = new THREE.MeshStandardMaterial({
        color: data.colors[i],
        metalness: 0.3,
        roughness: 0.6,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = startAngle + 0.01;
      mesh.userData = { index: i, value: val };
      donutGroup.add(mesh);
      startAngle += segmentAngle;
    });

    // Canvas labels (sprites)
    let angleAcc = -Math.PI / 2;
    data.values.forEach((val, i) => {
      const ang = (val / total) * Math.PI * 2;
      const mid = angleAcc + ang / 2;
      angleAcc += ang;

      // Canvas text
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = data.colors[i] + "aa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "Bold 24px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(`${data.labels[i]}: ${val}%`, canvas.width / 2, canvas.height / 2 + 8);

      const tex = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex }));
      sprite.position.set(Math.cos(mid) * 3.2, Math.sin(mid) * 3.2, 0);
      sprite.scale.set(1, 0.5, 1);
      scene.add(sprite);
    });

    // Raycaster for hover
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered = null;

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // Animate loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // Hover logic
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(donutGroup.children);
      if (hits.length) {
        const obj = hits[0].object;
        if (hovered !== obj) {
          if (hovered) gsap.to(hovered.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
          hovered = obj;
          gsap.to(hovered.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.3 });
        }
      } else if (hovered) {
        gsap.to(hovered.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        hovered = null;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize / cleanup
    const onResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
    
   
  }, []);

  return (
    <div className="w-full h-96 relative">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-white bg-opacity-70 px-4 py-2 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">
          Lead Status Distribution
        </h3>
      </div>
    </div>
  );
}
