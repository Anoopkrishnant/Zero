import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const InteractiveZeroDrawing = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const drawingRef = useRef({
    isDrawing: false,
    points: [],
    currentMesh: null,
    idealZeroPoints: [],
  });
  const [showMasks, setShowMasks] = useState(false);
  const [drawingComplete, setDrawingComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Create ideal zero points for accuracy comparison (invisible)
  const createIdealZeroPoints = () => {
    const points = [];
    const segments = 48;
    const outerRadius = 1.0;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radiusVariation = outerRadius + Math.sin(angle * 3) * 0.1; // Organic variation
      const x = Math.cos(angle) * radiusVariation * 0.85;
      const y = Math.sin(angle) * radiusVariation * 1.1;
      points.push(new THREE.Vector3(x, y, 0));
    }
    drawingRef.current.idealZeroPoints = points;
  };

  // Calculate accuracy based on zero-like shape
  const calculateAccuracy = (drawnPoints) => {
    if (drawnPoints.length < 8) return 0;
    const centerX =
      drawnPoints.reduce((sum, p) => sum + p.x, 0) / drawnPoints.length;
    const centerY =
      drawnPoints.reduce((sum, p) => sum + p.y, 0) / drawnPoints.length;
    const center = new THREE.Vector3(centerX, centerY, 0);

    const distances = drawnPoints.map((p) => p.distanceTo(center));
    const avgDistance =
      distances.reduce((sum, d) => sum + d, 0) / distances.length;
    const distanceVariation = Math.sqrt(
      distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) /
        distances.length
    );

    const firstPoint = drawnPoints[0];
    const lastPoint = drawnPoints[drawnPoints.length - 1];
    const loopDistance = firstPoint.distanceTo(lastPoint);

    const circularityScore = Math.max(
      0,
      100 - (distanceVariation / avgDistance) * 200
    );
    const loopScore = Math.max(0, 100 - loopDistance * 50);
    const sizeScore = avgDistance > 0.3 && avgDistance < 2.0 ? 100 : 50;

    let totalAccuracy =
      circularityScore * 0.4 + loopScore * 0.4 + sizeScore * 0.2;

    const width =
      Math.max(...drawnPoints.map((p) => p.x)) -
      Math.min(...drawnPoints.map((p) => p.x));
    const height =
      Math.max(...drawnPoints.map((p) => p.y)) -
      Math.min(...drawnPoints.map((p) => p.y));
    const aspectRatio = height / width;
    if (aspectRatio > 1.1 && aspectRatio < 1.8) {
      totalAccuracy += 15;
    }
    return Math.min(100, Math.round(totalAccuracy));
  };

  // Create organic tube that looks like your images
  const createOrganicTube = (points, radius = 0.08) => {
    if (points.length < 2) return null;
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      points.length * 3,
      radius,
      12,
      false
    );
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.52, 0.7, 0.6),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const positions = tubeGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const noise = (Math.sin(i * 0.05) + Math.cos(i * 0.08)) * 0.02;
      positions[i] += noise * Math.sin(positions[i + 1] * 3);
      positions[i + 1] += noise * Math.cos(positions[i] * 2);
    }
    tubeGeometry.attributes.position.needsUpdate = true;
    return new THREE.Mesh(tubeGeometry, material);
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x87ceeb, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x00bfff, 0.5);
    directionalLight.position.set(2, 2, 1);
    scene.add(directionalLight);

    camera.position.z = 4;
    createIdealZeroPoints();
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    const handleStart = (event) => {
      event.preventDefault();
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      drawingRef.current.isDrawing = true;
      drawingRef.current.points = [new THREE.Vector3(x * 2.2, y * 2.2, 0.1)];
      if (drawingRef.current.currentMesh) {
        scene.remove(drawingRef.current.currentMesh);
        drawingRef.current.currentMesh.geometry.dispose();
        drawingRef.current.currentMesh.material.dispose();
      }
      setShowScore(false);
      setShowMasks(false);
    };

    const handleMove = (event) => {
      if (!drawingRef.current.isDrawing) return;
      event.preventDefault();
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      const newPoint = new THREE.Vector3(x * 2.2, y * 2.2, 0.1);
      const lastPoint =
        drawingRef.current.points[drawingRef.current.points.length - 1];
      if (lastPoint.distanceTo(newPoint) > 0.06) {
        drawingRef.current.points.push(newPoint);
        if (drawingRef.current.points.length >= 3) {
          if (drawingRef.current.currentMesh) {
            scene.remove(drawingRef.current.currentMesh);
            drawingRef.current.currentMesh.geometry.dispose();
            drawingRef.current.currentMesh.material.dispose();
          }
          const radiusVariation =
            0.08 + Math.sin(drawingRef.current.points.length * 0.2) * 0.03;
          const mesh = createOrganicTube(
            drawingRef.current.points,
            radiusVariation
          );
          if (mesh) {
            drawingRef.current.currentMesh = mesh;
            scene.add(mesh);
          }
        }
      }
    };

    const handleEnd = (event) => {
      event.preventDefault();
      if (drawingRef.current.isDrawing) {
        drawingRef.current.isDrawing = false;
        if (drawingRef.current.points.length > 6) {
          const calculatedAccuracy = calculateAccuracy(
            drawingRef.current.points
          );
          setAccuracy(calculatedAccuracy);
          setDrawingComplete(true);
          setShowScore(true);
          if (calculatedAccuracy >= 60) {
            setTimeout(() => {
              setShowMasks(true);
            }, 1200);
          }
        }
      }
    };

    renderer.domElement.addEventListener("mousedown", handleStart);
    renderer.domElement.addEventListener("mousemove", handleMove);
    renderer.domElement.addEventListener("mouseup", handleEnd);
    renderer.domElement.addEventListener("touchstart", handleStart);
    renderer.domElement.addEventListener("touchmove", handleMove);
    renderer.domElement.addEventListener("touchend", handleEnd);
    const animate = () => {
      requestAnimationFrame(animate);
      if (drawingRef.current.currentMesh) {
        const time = Date.now() * 0.0015;
        const hue = 0.52 + Math.sin(time) * 0.08;
        const saturation = 0.65 + Math.sin(time * 1.2) * 0.15;
        const lightness = 0.6 + Math.sin(time * 0.8) * 0.2;
        drawingRef.current.currentMesh.material.color.setHSL(
          hue,
          saturation,
          lightness
        );
        if (drawingComplete) {
          drawingRef.current.currentMesh.material.opacity =
            0.7 + Math.sin(time * 3) * 0.2;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const resetDrawing = () => {
    if (sceneRef.current && drawingRef.current.currentMesh) {
      sceneRef.current.remove(drawingRef.current.currentMesh);
      drawingRef.current.currentMesh.geometry.dispose();
      drawingRef.current.currentMesh.material.dispose();
    }
    setDrawingComplete(false);
    setShowMasks(false);
    setShowScore(false);
    setAccuracy(0);
    drawingRef.current = {
      isDrawing: false,
      points: [],
      currentMesh: null,
      idealZeroPoints: drawingRef.current.idealZeroPoints,
    };
  };

  const getAccuracyColor = (score) => {
    if (score >= 85) return "text-cyan-300";
    if (score >= 70) return "text-blue-300";
    if (score >= 50) return "text-teal-300";
    return "text-blue-400";
  };
  const getAccuracyMessage = (score) => {
    if (score >= 85) return "Perfect Zero! ✨";
    if (score >= 70) return "Beautiful! 🌟";
    if (score >= 50) return "Nice Shape! 💫";
    return "Keep Trying! 🎯";
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* BG image */}
      <img
        src="/bg-2.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        draggable={false}
        style={{ userSelect: "none" }}
      />
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-10 cursor-crosshair" />

      <Image
        src="/mask-2.jpg"
        alt="Mask overlay"
        fill
        priority
        className="object-cover object-center select-none"
        draggable={false}
        unselectable="on"
        style={{
          mixBlendMode: "overlay",
          opacity: 0.2,
        }}
      />

      {/* Floating instruction card */}
      <div className="absolute top-8 left-8 z-40">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 text-white border border-white/10">
          <h2 className="text-3xl font-extralight mb-2 text-cyan-100">
            Draw Zero
          </h2>
          <p className="text-sm opacity-80 font-light">
            Create your organic zero anywhere on the canvas
          </p>
        </div>
      </div>
      {/* Accuracy Score */}
      {showScore && (
        <div className="absolute top-8 right-8 z-40">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-white border border-white/15">
            <div className="text-center">
              <div className="text-5xl font-extralight mb-2">
                <span className={getAccuracyColor(accuracy)}>{accuracy}</span>
                <span className="text-2xl opacity-50 font-light">/100</span>
              </div>
              <div className="text-lg font-light mb-4 text-cyan-100">
                {getAccuracyMessage(accuracy)}
              </div>
              <button
                onClick={resetDrawing}
                className="px-8 py-3 bg-cyan-400/15 hover:bg-cyan-400/25 rounded-full transition-all duration-300 font-light border border-cyan-400/20 text-cyan-100"
              >
                Draw Again
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Simple instruction at bottom */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-3 text-white border border-white/10">
          <p className="text-sm font-light text-center text-cyan-100/80">
            {drawingRef.current?.isDrawing
              ? "Keep drawing your zero..."
              : "Click and drag to draw a zero shape"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveZeroDrawing;
