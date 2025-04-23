'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function DashboardMetrics({ totalLeads, contactedLeads, meetings }) {
  const cardRefs = useRef([]);
  const threeRefs = useRef([]);

  useEffect(() => {
    // Initialize Three.js scenes for each card
    threeRefs.current.forEach((container, index) => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Create scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0); // Transparent background
      container.appendChild(renderer.domElement);

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 30;
      
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      // Different colors for each card
      const colors = [0x4fd1c5, 0x68d391, 0x63b3ed]; // Teal, Green, Blue
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: new THREE.Color(colors[index]),
        transparent: true,
        opacity: 0.6
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };
      
      animate();

      // Handle resize
      const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
      };
    });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-cyan-50 relative overflow-hidden" ref={el => cardRefs.current[0] = el}>
        <div 
          ref={el => threeRefs.current[0] = el} 
          className="absolute inset-0 z-0 pointer-events-none"
        />
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg font-medium">Total Leads</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-6xl font-bold text-teal-900">{totalLeads}</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 relative overflow-hidden" ref={el => cardRefs.current[1] = el}>
        <div 
          ref={el => threeRefs.current[1] = el} 
          className="absolute inset-0 z-0 pointer-events-none"
        />
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg font-medium">Contacted Leads</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-6xl font-bold text-teal-900">{contactedLeads}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-100 relative overflow-hidden" ref={el => cardRefs.current[2] = el}>
        <div 
          ref={el => threeRefs.current[2] = el} 
          className="absolute inset-0 z-0 pointer-events-none"
        />
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg font-medium">Meetings</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-6xl font-bold text-teal-900">{meetings}</p>
        </CardContent>
      </Card>
    </div>
  );
}