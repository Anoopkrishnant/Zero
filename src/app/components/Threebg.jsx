'use client';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ThreeBgClient() {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    let renderer, scene, camera, animationId;
    
    // Test WebGL support
    const testWebGL = () => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    if (!testWebGL()) {
      setWebglSupported(false);
      return;
    }

    // Delay initialization to avoid conflicts
    const timer = setTimeout(() => {
      try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Very basic renderer settings
        renderer = new THREE.WebGLRenderer({ 
          alpha: true,
          antialias: false,
          powerPreference: 'default'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (mountRef.current && !mountRef.current.hasChildNodes()) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Simple animation loop
        function animate() {
          if (renderer && scene && camera) {
            try {
              renderer.render(scene, camera);
              animationId = requestAnimationFrame(animate);
            } catch (err) {
              console.warn('Render error:', err);
            }
          }
        }
        animate();

      } catch (error) {
        console.error('WebGL initialization failed:', error);
        setWebglSupported(false);
      }
    }, 100); // Small delay

    return () => {
      clearTimeout(timer);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        if (mountRef.current && renderer.domElement.parentNode) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, []);

  // Fallback for when WebGL fails
  if (!webglSupported) {
    return (
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* CSS fallback background */}
      </div>
    );
  }

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}