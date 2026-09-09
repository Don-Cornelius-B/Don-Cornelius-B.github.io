'use client';
import React, { useEffect, useRef } from 'react';
import styles from '../css/dots.module.css';

const Dots = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let dots = [];
    
    const dotSize = 4;
    const spacing = dotSize * 10;
    const minTvalue = 0.2; // 50/255 approx
    const areaAffected = 50;
    
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseIsMoving = false;
    let moveTimeout;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createDots();
    };

    class Dot {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.transparency = minTvalue;
      }

      update() {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (mouseIsMoving && distance < areaAffected) {
          this.transparency = 1.0;
        } else {
          this.transparency = Math.max(minTvalue, this.transparency - 0.04); // roughly 10/255
        }
      }

      render() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.transparency})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createDots = () => {
      dots = [];
      for (let i = 0; i < canvas.width; i += spacing) {
        for (let j = 0; j < canvas.height; j += spacing) {
          dots.push(new Dot(i + spacing / 2, j + spacing / 2, dotSize));
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseIsMoving = true;
      
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        mouseIsMoving = false;
      }, 100);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.update();
        dot.render();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.background} />;
};

export default Dots;
