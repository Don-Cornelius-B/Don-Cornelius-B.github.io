'use client';
import React, { useEffect, useRef, useState } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, SphereGeometry, EdgesGeometry, LineBasicMaterial, LineSegments } from 'three';

const Model = () => {
  const canvasRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new WebGLRenderer({ canvas, alpha: true });

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 1000);
    camera.position.z = 5;
    camera.rotateZ(-0.2);

    const geometry = new SphereGeometry(1, 22, 22, 0, Math.PI * 2, 0, Math.PI * 2);
    const edges = new EdgesGeometry(geometry);
    const material = new LineBasicMaterial({ color: 0xffffff });
    const sphere = new LineSegments(edges, material);
    scene.add(sphere);

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      const contenedor = canvas.parentElement;
      if (contenedor) {
        camera.aspect = contenedor.clientWidth / contenedor.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
      }
    };

    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      edges.dispose();
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return <canvas ref={canvasRef} />;
};

export default Model;
