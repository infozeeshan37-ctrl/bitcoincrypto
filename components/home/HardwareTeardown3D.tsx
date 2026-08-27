"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, ShieldCheck, Activity, Terminal, Sparkles, Layers, Zap, ArrowDown, CheckCircle2 } from "lucide-react";

export default function HardwareTeardown3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!canvasContainerRef.current || !containerRef.current) return;

    // 1. Three.js Scene, Camera, Renderer
    const width = canvasContainerRef.current.clientWidth || window.innerWidth;
    const height = canvasContainerRef.current.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 2.2, 9.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    canvasContainerRef.current.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf59e0b, 4.0);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 3.5);
    cyanLight.position.set(-6, -3, -4);
    scene.add(cyanLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.5);
    topLight.position.set(0, 10, 2);
    scene.add(topLight);

    const corePointLight = new THREE.PointLight(0xf59e0b, 3.0, 10);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // 3. Procedural Multi-Layered 3D Crypto Hardware Model
    const mainGroup = new THREE.Group();
    mainGroup.rotation.x = 0.38;
    scene.add(mainGroup);

    // Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x171f30,
      metalness: 0.92,
      roughness: 0.22,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.96,
      roughness: 0.14,
    });

    const brightGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xb45309,
      emissiveIntensity: 0.35,
      metalness: 0.95,
      roughness: 0.1,
    });

    const cyanCircuitMat = new THREE.MeshStandardMaterial({
      color: 0x0891b2,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.85,
      metalness: 0.6,
      roughness: 0.2,
    });

    const glassHUDMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.75,
      opacity: 0.85,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.52,
    });

    // LAYER 1: Bottom Chassis & Heatsink
    const layer1Group = new THREE.Group();
    const baseGeo = new THREE.CylinderGeometry(2.7, 3.0, 0.45, 6);
    const baseMesh = new THREE.Mesh(baseGeo, titaniumMat);
    layer1Group.add(baseMesh);

    for (let i = 0; i < 8; i++) {
      const finGeo = new THREE.BoxGeometry(0.08, 0.25, 2.4);
      const finMesh = new THREE.Mesh(finGeo, titaniumMat);
      finMesh.position.x = (i - 3.5) * 0.55;
      finMesh.position.y = -0.28;
      layer1Group.add(finMesh);
    }
    mainGroup.add(layer1Group);

    // LAYER 2: Gold Logic Board & PCB
    const layer2Group = new THREE.Group();
    layer2Group.position.y = 0.35;
    const pcbGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.14, 6);
    const pcbMesh = new THREE.Mesh(pcbGeo, goldMat);
    layer2Group.add(pcbMesh);

    const circuitRingGeo = new THREE.RingGeometry(1.6, 2.2, 6);
    const circuitRingMesh = new THREE.Mesh(circuitRingGeo, cyanCircuitMat);
    circuitRingMesh.rotation.x = -Math.PI / 2;
    circuitRingMesh.position.y = 0.08;
    layer2Group.add(circuitRingMesh);

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const chipGeo = new THREE.BoxGeometry(0.35, 0.18, 0.35);
      const chipMesh = new THREE.Mesh(chipGeo, titaniumMat);
      chipMesh.position.set(Math.cos(angle) * 1.8, 0.15, Math.sin(angle) * 1.8);
      layer2Group.add(chipMesh);
    }
    mainGroup.add(layer2Group);

    // LAYER 3: The Crypto ASIC Core
    const layer3Group = new THREE.Group();
    layer3Group.position.y = 0.7;

    const asicGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.35, 8);
    const asicMesh = new THREE.Mesh(asicGeo, brightGoldMat);
    layer3Group.add(asicMesh);

    const emblemGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.42, 32);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.9,
      metalness: 0.98,
      roughness: 0.05,
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    layer3Group.add(emblemMesh);

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const nodeGeo = new THREE.BoxGeometry(0.25, 0.45, 0.25);
      const nodeMesh = new THREE.Mesh(nodeGeo, cyanCircuitMat);
      nodeMesh.position.set(Math.cos(angle) * 1.5, 0.05, Math.sin(angle) * 1.5);
      layer3Group.add(nodeMesh);
    }
    mainGroup.add(layer3Group);

    // LAYER 4: Floating Security Rings
    const layer4Group = new THREE.Group();
    layer4Group.position.y = 1.1;

    const ring1Geo = new THREE.TorusGeometry(2.3, 0.035, 16, 64);
    const ring1Mesh = new THREE.Mesh(ring1Geo, brightGoldMat);
    ring1Mesh.rotation.x = Math.PI / 2;
    layer4Group.add(ring1Mesh);

    const ring2Geo = new THREE.TorusGeometry(1.8, 0.025, 16, 64);
    const ring2Mesh = new THREE.Mesh(ring2Geo, cyanCircuitMat);
    ring2Mesh.rotation.x = Math.PI / 2;
    layer4Group.add(ring2Mesh);

    mainGroup.add(layer4Group);

    // LAYER 5: Top Holographic Glass HUD
    const layer5Group = new THREE.Group();
    layer5Group.position.y = 1.45;

    const hudGlassGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.08, 6);
    const hudGlassMesh = new THREE.Mesh(hudGlassGeo, glassHUDMat);
    layer5Group.add(hudGlassMesh);

    const crosshairGeo = new THREE.RingGeometry(0.8, 0.85, 32);
    const crosshairMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const crosshairMesh = new THREE.Mesh(crosshairGeo, crosshairMat);
    crosshairMesh.rotation.x = -Math.PI / 2;
    crosshairMesh.position.y = 0.06;
    layer5Group.add(crosshairMesh);

    mainGroup.add(layer5Group);

    // Ambient Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. GSAP ScrollTrigger Pinned Timeline
    const state = {
      layer1Y: 0,
      layer2Y: 0.35,
      layer3Y: 0.7,
      layer4Y: 1.1,
      layer5Y: 1.45,
      groupRotY: 0,
      groupRotX: 0.38,
      groupScale: 1.0,
      coreIntensity: 3.0,
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=320%",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.33) {
            setActiveStep(1);
          } else if (p < 0.66) {
            setActiveStep(2);
          } else {
            setActiveStep(3);
          }
        },
      },
    });

    // TEARDOWN 1
    tl.to(state, {
      layer1Y: -2.2,
      layer2Y: -0.8,
      layer3Y: 0.8,
      layer4Y: 2.0,
      layer5Y: 3.2,
      groupRotY: Math.PI * 0.45,
      groupRotX: 0.55,
      coreIntensity: 4.5,
      duration: 1,
      ease: "power2.inOut",
    })
      // TEARDOWN 2
      .to(state, {
        layer1Y: -3.2,
        layer2Y: -1.6,
        layer3Y: 0.5,
        layer4Y: 2.6,
        layer5Y: 4.4,
        groupRotY: Math.PI * 1.1,
        groupRotX: 0.65,
        groupScale: 1.12,
        coreIntensity: 7.0,
        duration: 1,
        ease: "power2.inOut",
      })
      // TEARDOWN 3
      .to(state, {
        layer1Y: -2.8,
        layer2Y: -1.2,
        layer3Y: 0.6,
        layer4Y: 2.2,
        layer5Y: 3.6,
        groupRotY: Math.PI * 1.8,
        groupRotX: 0.45,
        groupScale: 1.05,
        coreIntensity: 5.0,
        duration: 1,
        ease: "power2.inOut",
      })
      // REASSEMBLY
      .to(state, {
        layer1Y: 0,
        layer2Y: 0.35,
        layer3Y: 0.7,
        layer4Y: 1.1,
        layer5Y: 1.45,
        groupRotY: Math.PI * 2.0,
        groupRotX: 0.38,
        groupScale: 1.0,
        coreIntensity: 3.0,
        duration: 0.8,
        ease: "power3.out",
      });

    // 5. Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      layer1Group.position.y = state.layer1Y;
      layer2Group.position.y = state.layer2Y;
      layer3Group.position.y = state.layer3Y;
      layer4Group.position.y = state.layer4Y;
      layer5Group.position.y = state.layer5Y;

      mainGroup.rotation.y = state.groupRotY + elapsedTime * 0.15;
      mainGroup.rotation.x = state.groupRotX;
      mainGroup.scale.set(state.groupScale, state.groupScale, state.groupScale);
      corePointLight.intensity = state.coreIntensity;

      ring1Mesh.rotation.z = elapsedTime * 0.6;
      ring2Mesh.rotation.z = -elapsedTime * 0.8;
      crosshairMesh.rotation.z = elapsedTime * 0.3;
      particleSystem.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Listener
    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      const newW = canvasContainerRef.current.clientWidth;
      const newH = canvasContainerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050811] text-slate-100 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Ambient Glow Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.14),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.09),transparent_50%)] pointer-events-none" />

      {/* Top Section Header & Teardown Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Hardware Teardown</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Anatomy of the BitcoinCrypto Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Scroll down to disassemble the multi-layered cryptographic execution core.
          </p>
        </div>

        {/* Live Step Progress Indicator */}
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur border border-white/10 px-4 py-2 rounded-xl text-xs font-mono">
          <span className="text-slate-400">Teardown Layer:</span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded font-bold ${activeStep === 1 ? "bg-amber-500 text-slate-950" : "text-slate-500"}`}>01</span>
            <span className="text-slate-600">/</span>
            <span className={`px-2 py-0.5 rounded font-bold ${activeStep === 2 ? "bg-amber-500 text-slate-950" : "text-slate-500"}`}>02</span>
            <span className="text-slate-600">/</span>
            <span className={`px-2 py-0.5 rounded font-bold ${activeStep === 3 ? "bg-amber-500 text-slate-950" : "text-slate-500"}`}>03</span>
          </div>
        </div>
      </div>

      {/* Center Area: Three.js Canvas + Synchronous Side Pinned Typography */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
        
        {/* Left Side: Step Narrative Cards */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Step 1 Card */}
          <div
            ref={step1Ref}
            className={`p-6 rounded-2xl border transition-all duration-500 ${
              activeStep === 1
                ? "bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-500/10 scale-100 opacity-100"
                : "bg-slate-900/30 border-white/5 opacity-40 scale-95"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2">
              <Zap className="w-4 h-4" />
              <span>LAYER 01 / EXECUTION PIPELINE</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Low-Latency Trading Terminal Engine
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub-millisecond tick processing and optimized WebSocket streams connected directly to global cryptocurrency liquidity pools.
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3 text-[11px] text-slate-300 font-mono">
              <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Zero Latency</span>
              <span>•</span>
              <span>100+ TA Indicators</span>
            </div>
          </div>

          {/* Step 2 Card */}
          <div
            ref={step2Ref}
            className={`p-6 rounded-2xl border transition-all duration-500 ${
              activeStep === 2
                ? "bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-500/10 scale-100 opacity-100"
                : "bg-slate-900/30 border-white/5 opacity-40 scale-95"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>LAYER 02 / MATHEMATICAL CORE</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Algorithmic DCA & Risk Calculation Matrix
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom mathematical algorithms for dollar-cost averaging backtesting, drawdown protection, and dynamic risk-to-reward position sizing.
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3 text-[11px] text-slate-300 font-mono">
              <span className="text-cyan-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Cycle Modeling</span>
              <span>•</span>
              <span>Leverage Safeguard</span>
            </div>
          </div>

          {/* Step 3 Card */}
          <div
            ref={step3Ref}
            className={`p-6 rounded-2xl border transition-all duration-500 ${
              activeStep === 3
                ? "bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-500/10 scale-100 opacity-100"
                : "bg-slate-900/30 border-white/5 opacity-40 scale-95"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-2">
              <Activity className="w-4 h-4" />
              <span>LAYER 03 / MARKET INTELLIGENCE</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              On-Chain Liquidity & Telemetry Feeds
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time mempool tracking, perpetual futures funding rate settlements, and liquidation cluster radar across institutional venues.
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-3 text-[11px] text-slate-300 font-mono">
              <span className="text-indigo-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Heatmap Feeds</span>
              <span>•</span>
              <span>ETF Net Inflows</span>
            </div>
          </div>

        </div>

        {/* Center & Right: 3D WebGL Canvas Container */}
        <div className="lg:col-span-8 h-[460px] sm:h-[580px] w-full relative flex items-center justify-center">
          <div
            ref={canvasContainerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing relative"
          />

          {/* Holographic Crosshair Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 border border-amber-500/10 rounded-full animate-pulse" />
          </div>
        </div>

      </div>

      {/* Bottom Scroll Cue Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 pb-6 w-full text-center flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
        <span>Scroll to continue disassembly and reassembly</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-500" />
      </div>
    </section>
  );
}
