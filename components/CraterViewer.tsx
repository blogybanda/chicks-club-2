
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Rotate3D, MousePointer2, Layers, Droplets } from 'lucide-react';

const CraterViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [showWater, setShowWater] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  
  // Refs for scene objects to allow updates without re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const terrainMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const annotationsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0f172a'); // Match space-900
    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2('#0f172a', 0.005);

    const camera = new THREE.PerspectiveCamera(55, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    // Position camera for a dramatic oblique view
    camera.position.set(0, 50, 110);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // Don't go below ground
    controls.minDistance = 30;
    controls.maxDistance = 250;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // --- Terrain Generation ---
    const geometry = new THREE.PlaneGeometry(240, 240, 256, 256);
    const pos = geometry.attributes.position;
    const colors = [];
    const colorAttribute = new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3);
    
    // Colors
    const colorDeep = new THREE.Color('#334155'); // Dark slate for deep melt
    const colorRock = new THREE.Color('#94a3b8'); // Slate 400 for general rock
    const colorPeak = new THREE.Color('#e2e8f0'); // Light slate/white for peaks
    const colorRim  = new THREE.Color('#64748b'); // Slate 500 for outer rim
    const colorMagma = new THREE.Color('#7f1d1d'); // Deep red for impact center hint

    // Chicxulub Structure Simulation
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // Z in calculation
      const r = Math.sqrt(x * x + y * y);
      
      let z = 0;
      
      // 1. Transient Crater / Deep Basin (The hole punched through crust)
      // Wide depression
      z -= 18 * Math.exp(-(r * r) / (45 * 45));
      
      // 2. Peak Ring (The central uplift collapsing outward)
      // Characteristic feature: Ring of mountains at r ~ 35-40
      const peakRingHeight = 14 * Math.exp(-Math.pow(r - 38, 2) / (12 * 12));
      z += peakRingHeight;
      
      // 3. Outer Rim (The edge of the crater)
      // Rise at r ~ 80
      z += 8 * Math.exp(-Math.pow(r - 80, 2) / (25 * 25));
      
      // 4. Noise/Roughness for realism
      const noise = (Math.sin(x/4) * Math.cos(y/4) * 0.5) + (Math.sin(x/1.5) * Math.sin(y/1.5) * 0.2);
      z += noise;

      // Flatten outer area to sea floor
      if (r > 100) {
        z = z * Math.exp(-(r-100)/20);
      }

      pos.setZ(i, z);

      // --- Vertex Coloring based on height and radius ---
      const mixedColor = new THREE.Color();
      
      if (r < 15) {
        // Central melt sheet - hint of heat/deep rock
        mixedColor.copy(colorDeep).lerp(colorMagma, 0.2);
      } else if (z > 2 && r < 50) {
        // Peak Ring - Lighter Granite
        mixedColor.copy(colorRock).lerp(colorPeak, (z / 15));
      } else if (r > 60 && r < 90) {
        // Outer Rim - Limestone
        mixedColor.copy(colorRim).lerp(colorRock, 0.5);
      } else {
        // General seafloor/trough
        mixedColor.copy(colorDeep).lerp(colorRock, 0.3);
      }

      colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
    }
    
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geometry.computeVertexNormals();
    geometry.rotateX(-Math.PI / 2); // Lie flat

    // Terrain Material
    const terrainMaterial = new THREE.MeshStandardMaterial({ 
      vertexColors: true,
      roughness: 0.8,
      metalness: 0.1,
      wireframe: false,
      side: THREE.DoubleSide
    });
    terrainMaterialRef.current = terrainMaterial;

    const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
    terrainMesh.castShadow = true;
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // --- Water Plane ---
    // Gulf of Mexico was shallow (~100m-500m ideally, but exaggerated here for vis)
    const waterGeometry = new THREE.PlaneGeometry(240, 240);
    waterGeometry.rotateX(-Math.PI / 2);
    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9, // Sky Blue 500
      transparent: true,
      opacity: 0.4,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.2, // Glass-like
      side: THREE.DoubleSide,
      depthWrite: false, // Transparency sorting
    });
    
    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    waterMesh.position.y = 0; // Sea level
    waterMeshRef.current = waterMesh;
    scene.add(waterMesh);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Sun light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(80, 100, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Impact Point Glow
    const pointLight = new THREE.PointLight(0xf97316, 1, 60); // Orange glow
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // --- Animation Loop ---
    let animationId: number;
    const animate = () => {
      if (!containerRef.current || !renderer.domElement) return;

      animationId = requestAnimationFrame(animate);
      controls.update();
      
      // Gentle water animation if needed (optional optimization: skip if not visible)
      if (waterMeshRef.current && waterMeshRef.current.visible) {
        waterMeshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
      }

      renderer.render(scene, camera);

      // Update Annotations
      updateAnnotations(camera);
    };

    const updateAnnotations = (cam: THREE.Camera) => {
        const annotations = [
            { id: 'origin', x: 0, y: -2, z: 0 },
            { id: 'peak', x: 38, y: 8, z: 0 },
            { id: 'rim', x: 80, y: 5, z: 0 }
        ];

        annotations.forEach(ann => {
            const el = annotationsRefs.current[ann.id];
            if (el && containerRef.current) {
                const vector = new THREE.Vector3(ann.x, ann.y, ann.z);
                vector.project(cam);

                // Convert to screen coords
                const x = (vector.x * 0.5 + 0.5) * containerRef.current.clientWidth;
                const y = (-(vector.y * 0.5) + 0.5) * containerRef.current.clientHeight;

                // Check if behind camera or out of view
                if (vector.z < 1 && x > 0 && x < containerRef.current.clientWidth && y > 0 && y < containerRef.current.clientHeight) {
                    el.style.display = 'flex';
                    el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                    el.style.zIndex = (1000 - Math.round(vector.z * 100)).toString();
                } else {
                    el.style.display = 'none';
                }
            }
        });
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      terrainMaterial.dispose();
      waterGeometry.dispose();
      waterMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Update effect for toggles
  useEffect(() => {
    if (waterMeshRef.current) {
        waterMeshRef.current.visible = showWater;
    }
    if (terrainMaterialRef.current) {
        terrainMaterialRef.current.wireframe = showWireframe;
    }
  }, [showWater, showWireframe]);

  return (
    <section id="crater-model" className="relative h-[85vh] w-full bg-space-900 overflow-hidden border-t border-b border-slate-800">
      
      {/* Header / Title Overlay */}
      <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-800/80 backdrop-blur border border-slate-700 text-blue-200 mb-3 shadow-lg">
           <Rotate3D size={16} />
           <span className="text-xs font-bold uppercase tracking-widest">Interactive 3D Simulation</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl tracking-tight">
           Geological Structure
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto drop-shadow-md hidden md:block">
            Visualization of the Peak Ring structure buried beneath the Yucatán Peninsula.
        </p>
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-8 right-8 z-20 flex flex-col gap-3">
        <button 
            onClick={() => setShowWater(!showWater)}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 border ${showWater ? 'bg-blue-600/80 border-blue-400 text-white' : 'bg-space-800/50 border-slate-600 text-slate-400 hover:text-white'}`}
            title="Toggle Water Level"
        >
            <Droplets size={20} />
        </button>
        <button 
            onClick={() => setShowWireframe(!showWireframe)}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 border ${showWireframe ? 'bg-impact-600/80 border-impact-400 text-white' : 'bg-space-800/50 border-slate-600 text-slate-400 hover:text-white'}`}
            title="Toggle Wireframe Mode"
        >
            <Layers size={20} />
        </button>
      </div>

      {/* Helper Interaction Hint */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:block max-w-xs pointer-events-none">
         <div className="bg-space-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 text-left shadow-2xl">
           <h4 className="text-white font-bold flex items-center gap-2 mb-2 text-sm">
             <MousePointer2 size={16} className="text-blue-400"/> Navigation
           </h4>
           <div className="text-xs text-slate-400 space-y-1">
             <p><span className="text-white">Left Click + Drag</span> to rotate</p>
             <p><span className="text-white">Scroll</span> to zoom in/out</p>
             <p><span className="text-white">Right Click + Drag</span> to pan</p>
           </div>
         </div>
      </div>
      
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Annotations Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { id: 'origin', label: 'Impact Origin', desc: 'The "Melt Sheet". Rock here was liquified instantly.' },
          { id: 'peak', label: 'Peak Ring', desc: 'Mountains of granite uplifted from 10km deep. The defining feature of this crater.' },
          { id: 'rim', label: 'Outer Rim', desc: 'The unstable crater edge, prone to collapse and landslides.' }
        ].map((ann) => (
          <div 
            key={ann.id}
            ref={(el) => { annotationsRefs.current[ann.id] = el; }}
            className="absolute top-0 left-0 pointer-events-auto flex flex-col items-center group cursor-pointer"
            onMouseEnter={() => setActiveAnnotation(ann.id)}
            onMouseLeave={() => setActiveAnnotation(null)}
          >
             {/* The Dot */}
             <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300 ${activeAnnotation === ann.id ? 'bg-impact-500 scale-150' : 'bg-white'}`}></div>
             
             {/* The Line */}
             <div className={`h-8 w-px bg-gradient-to-b from-white to-transparent transition-opacity duration-300 ${activeAnnotation === ann.id ? 'opacity-100' : 'opacity-50'}`}></div>
             
             {/* The Label Box */}
             <div className={`mt-1 px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all duration-300 transform ${activeAnnotation === ann.id ? 'bg-space-800/90 border-impact-500 scale-105' : 'bg-space-900/60 border-slate-600 scale-100'}`}>
                <span className="text-xs font-bold text-white whitespace-nowrap">{ann.label}</span>
             </div>

             {/* Description Tooltip (Only on hover) */}
             <div className={`absolute top-full mt-2 w-48 bg-black/80 text-center p-2 rounded border border-slate-700 backdrop-blur-xl transition-all duration-200 ${activeAnnotation === ann.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                 <p className="text-[10px] text-slate-300 leading-snug">{ann.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CraterViewer;
