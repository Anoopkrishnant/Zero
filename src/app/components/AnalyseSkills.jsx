"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PerfectZeroPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(520, 520);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 1;

    // Create dot pattern geometry
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    // Generate dots pattern
    const dotCount = 900;
    const centerX = 0;
    const centerY = 0;
    const outerRadius = 0.88;
    const innerRadius = 0.46;

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

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

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

    // Fragment shader for subtle glow
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
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <video
        className="absolute inset-0 w-full h-full object-cover object-center z-0 select-none"
        autoPlay
        loop
        muted
        playsInline
        poster="/bg-2.png"
        style={{ opacity: 0.85 }}
      >
        <source src="/bg-v.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
        style={{
          WebkitMaskImage:
            "radial-gradient(240px 240px at 50% 50%, transparent 97%, #000 100%)",
          maskImage:
            "radial-gradient(240px 240px at 50% 50%, transparent 97%, #000 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <Image
          src="/mask-2.jpg"
          alt="overlay"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.9 }}
        />
      </div>

      {/* background overlay  */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "#d9d9d95e",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
      />

      {/* Main container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
        <div className="relative ">
          {/* Outer  */}
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
                WebkitMaskImage:
                  "radial-gradient(circle at center, transparent 0 42%, #000 44%, #000 52%, transparent 54%)",
                maskImage:
                  "radial-gradient(circle at center, transparent 0 42%, #000 44%, #000 52%, transparent 54%)",
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%), conic-gradient(from -30deg, rgba(255,255,255,0.9) 0deg, rgba(255,255,255,0.35) 50deg, rgba(66,153,225,0.35) 140deg, rgba(56,178,172,0.35) 210deg, rgba(255,255,255,0.6) 320deg, rgba(255,255,255,0.9) 360deg)",
                filter: "blur(14px)",
                opacity: 0.85,
                borderRadius: "50%",
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
            {/* Three.js Canvas  */}
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

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 100%)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(120, 160, 170, 0.25)",
                boxShadow: `
                  inset 0 6px 20px rgba(255,255,255,0.7),
                  inset 0 -8px 24px rgba(56,178,172,0.25),
                  0 40px 120px rgba(79, 172, 254, 0.25)
                `,
              }}
            />

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
                pointerEvents: "none",
              }}
            />

            <div
              className="absolute select-none"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily: "PP Editorial Old, Georgia, serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "83.84px",
                lineHeight: "100%",
                letterSpacing: "-0.03em",
                color: "#2c5364",
                textShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              85
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-30 select-none">
          <p
            className="uppercase text-[#476C78]"
            style={{
              fontFamily:
                "Fustat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
              fontWeight: 600,
              fontStyle: "bold",
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "2px",

              fontVariantNumeric: "lining-nums tabular-nums",
              textShadow: "0 1px 2px rgba(255,255,255,0.8)",
            }}
          >
            ANALYSING YOUR BASIC SKILLS
          </p>
        </div>
      </div>

      <div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full z-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 178, 172, 0.06) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full z-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79, 172, 254, 0.06) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />
    </div>
  );
}
