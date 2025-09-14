'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Image from 'next/image';

export default function PerfectZero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(520, 520);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 1;

    // Dot particles 
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const dotCount = 900, centerX = 0, centerY = 0, outerRadius = 0.88, innerRadius = 0.46;
    for (let i = 0; i < dotCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (outerRadius - innerRadius) + innerRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 0.05;
      positions.push(x, y, z);
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        colors.push(0.4, 0.8, 0.9);
      } else {
        colors.push(0.8, 0.9, 1.0);
      }
      sizes.push(Math.random() * 1.4 + 0.8);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * (480.0 / -mvPosition.z);
      }
    `;
    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
        alpha *= 0.22;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      points.rotation.z += 0.002;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
     
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/bg-2.png"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ opacity: 0.85 }}
      >
        <source src="/bg-v.mp4" type="video/mp4" />
      </video>

     
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{
          WebkitMaskImage: 'radial-gradient(240px 240px at 50% 50%, transparent 97%, #000 100%)',
          maskImage: 'radial-gradient(240px 240px at 50% 50%, transparent 97%, #000 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      >
        <Image
          src="/mask-2.jpg"
          alt="overlay"
          fill
          priority
          className="object-cover "
          style={{
        
            opacity: 0.9
        }}
        />
      </div>
      {/*  background overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: '#d9d9d95e',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      />

          {/* Main container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30"> 
        <div className="relative ">          
          {/* Outer Ring  */}
          <div
            style={{
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "transparent",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              border: "1px solid rgba(120, 160, 170, 0.35)",
              boxShadow: `
                0 40px 120px rgba(66, 153, 225, 0.20),
                0 0 160px rgba(56, 178, 172, 0.15),
                inset 0 1px 4px rgba(255,255,255,0.5)
              `,
              position: "relative",
            }}
          >

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                width: "480px",
                height: "480px",
                background:
                  "radial-gradient(120px 80px at 35% 78%, rgba(79,172,254,0.35), transparent 60%), radial-gradient(140px 100px at 45% 82%, rgba(56,178,172,0.35), transparent 65%)",
                filter: "blur(18px)",
                opacity: 0.6,
                borderRadius: "50%"
              }}
            />
             <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(120px 80px at 35% 78%, rgba(79,172,254,0.35), transparent 60%), radial-gradient(140px 100px at 45% 82%, rgba(56,178,172,0.35), transparent 65%)",
                filter: "blur(18px)",
                opacity: 0.6,
                borderRadius: "50%",
              }}
            />
            {/* Three.js Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                width: "480px",
                height: "480px",
                borderRadius: "50%",
                mixBlendMode: "overlay",
                opacity: 0,
              }}
            />

            

            {/* Inner Ring */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(90% 90% at 50% 35%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.22) 55%, rgba(255,255,255,0.12) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(120, 160, 170, 0.25)",
                boxShadow: `
                  inset 0 4px 14px rgba(255,255,255,0.6),
                  inset 0 -6px 18px rgba(56,178,172,0.18),
                  0 28px 90px rgba(79, 172, 254, 0.2)
                `,
              }}
            />

            {/* Dotted  */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.9) 2px, rgba(255,255,255,0) 2.8px)",
                backgroundSize: "12px 12px",
                backgroundPosition: "0 0",
                opacity: 0.55,
                mixBlendMode: "overlay",
                filter: "blur(0.2px)",
                pointerEvents: "none"
              }}
            />

  
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 select-none">
        <div
          className="flex items-center select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
          style={{
            fontFamily: 'PP Editorial Old, Georgia, serif',
            fontWeight: 400,
            fontSize: '56px',
            lineHeight: '100%',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #38555E 54.96%, #71FFC1 65.87%, #F3F5F4 74.38%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Perfect Zero
        </div>
        <span className="mt-1 uppercase opacity-70"
          style={{ fontFamily: 'Fustat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', fontWeight: 700, fontSize: '12px', letterSpacing: '0.2em', color: '#476C78' }}>
          YOU ALREADY GOT SKILLS.
        </span>
      </div>
    </div>
  );
}
