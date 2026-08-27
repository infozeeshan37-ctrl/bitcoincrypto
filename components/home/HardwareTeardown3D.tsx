"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, GraduationCap, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HardwareTeardown3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!canvasRef.current || !containerRef.current) return;

    const w = canvasRef.current.clientWidth || 600;
    const h = canvasRef.current.clientHeight || 600;

    // --- Scene ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    canvasRef.current.appendChild(renderer.domElement);

    // --- Lighting (warm golden studio) ---
    scene.add(new THREE.AmbientLight(0xfff8e1, 2.0));

    const keyLight = new THREE.DirectionalLight(0xf59e0b, 5);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfbbf24, 2.5);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3);
    rimLight.position.set(0, -4, -5);
    scene.add(rimLight);

    const topHighlight = new THREE.PointLight(0xfef3c7, 4, 12);
    topHighlight.position.set(0, 5, 2);
    scene.add(topHighlight);

    // --- Bitcoin Coin Group ---
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    // Gold Material (realistic brushed gold)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.98,
      roughness: 0.18,
    });

    const brightGold = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.96,
      roughness: 0.12,
      emissive: 0x92400e,
      emissiveIntensity: 0.15,
    });

    const edgeGold = new THREE.MeshStandardMaterial({
      color: 0xb8860b,
      metalness: 0.99,
      roughness: 0.08,
    });

    // Main coin body (thick disc)
    const coinBodyGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.18, 64);
    const coinBody = new THREE.Mesh(coinBodyGeo, goldMat);
    coinBody.rotation.x = Math.PI / 2;
    coinGroup.add(coinBody);

    // Top face raised rim
    const rimGeo = new THREE.TorusGeometry(1.65, 0.06, 16, 64);
    const rimMeshTop = new THREE.Mesh(rimGeo, edgeGold);
    rimMeshTop.position.z = 0.1;
    coinGroup.add(rimMeshTop);

    // Bottom face rim
    const rimMeshBot = new THREE.Mesh(rimGeo.clone(), edgeGold);
    rimMeshBot.position.z = -0.1;
    coinGroup.add(rimMeshBot);

    // Inner circle design (raised face detail)
    const innerCircleGeo = new THREE.TorusGeometry(1.25, 0.04, 16, 64);
    const innerCircleTop = new THREE.Mesh(innerCircleGeo, brightGold);
    innerCircleTop.position.z = 0.1;
    coinGroup.add(innerCircleTop);

    // Center Bitcoin "B" emblem — a raised cylinder
    const emblemGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.22, 32);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.99,
      roughness: 0.06,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
    });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.rotation.x = Math.PI / 2;
    coinGroup.add(emblem);

    // Bitcoin "B" vertical bars (two vertical lines)
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x92400e,
      metalness: 0.95,
      roughness: 0.15,
    });

    const barGeo = new THREE.BoxGeometry(0.06, 0.7, 0.24);
    const bar1 = new THREE.Mesh(barGeo, barMat);
    bar1.position.set(-0.12, 0, 0);
    coinGroup.add(bar1);

    const bar2 = new THREE.Mesh(barGeo.clone(), barMat);
    bar2.position.set(0.12, 0, 0);
    coinGroup.add(bar2);

    // Bitcoin "B" horizontal strokes
    const strokeGeo = new THREE.BoxGeometry(0.45, 0.055, 0.24);
    const stroke1 = new THREE.Mesh(strokeGeo, barMat);
    stroke1.position.set(0.05, 0.22, 0);
    coinGroup.add(stroke1);

    const stroke2 = new THREE.Mesh(strokeGeo.clone(), barMat);
    stroke2.position.set(0.05, 0, 0);
    coinGroup.add(stroke2);

    const stroke3 = new THREE.Mesh(strokeGeo.clone(), barMat);
    stroke3.position.set(0.05, -0.22, 0);
    coinGroup.add(stroke3);

    // Bumps on coin edge (reeded edge effect)
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const bumpGeo = new THREE.BoxGeometry(0.03, 0.14, 0.03);
      const bump = new THREE.Mesh(bumpGeo, edgeGold);
      bump.position.set(
        Math.cos(angle) * 1.82,
        Math.sin(angle) * 1.82,
        0
      );
      bump.rotation.z = angle;
      coinGroup.add(bump);
    }

    // Subtle outer glow ring
    const glowRingGeo = new THREE.TorusGeometry(2.1, 0.015, 8, 64);
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.35,
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    glowRing.position.z = 0;
    coinGroup.add(glowRing);

    // Floating golden particles
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 10;
      pPos[i + 1] = (Math.random() - 0.5) * 8;
      pPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // --- Initial tilt ---
    coinGroup.rotation.x = 0.3;
    coinGroup.rotation.z = 0.15;

    // --- GSAP ScrollTrigger ---
    const anim = { rotY: 0, rotX: 0.3, rotZ: 0.15, scale: 1.0, posY: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=250%",
        scrub: 1.0,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.3) setActiveCard(0);
          else if (p < 0.6) setActiveCard(1);
          else if (p < 0.9) setActiveCard(2);
          else setActiveCard(3);
        },
      },
    });

    // Phase 1: Gentle rotate & tilt
    tl.to(anim, {
      rotY: Math.PI * 0.6,
      rotX: 0.5,
      rotZ: -0.1,
      scale: 1.08,
      posY: 0.15,
      duration: 1,
      ease: "power2.inOut",
    })
    // Phase 2: Face the coin, zoom slightly
    .to(anim, {
      rotY: Math.PI * 1.2,
      rotX: -0.2,
      rotZ: 0.2,
      scale: 1.15,
      posY: -0.1,
      duration: 1,
      ease: "power2.inOut",
    })
    // Phase 3: Final view
    .to(anim, {
      rotY: Math.PI * 1.8,
      rotX: 0.35,
      rotZ: -0.05,
      scale: 1.05,
      posY: 0.08,
      duration: 1,
      ease: "power2.inOut",
    })
    // Return to initial
    .to(anim, {
      rotY: Math.PI * 2,
      rotX: 0.3,
      rotZ: 0.15,
      scale: 1.0,
      posY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // --- Render loop ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      coinGroup.rotation.y = anim.rotY + t * 0.25;
      coinGroup.rotation.x = anim.rotX;
      coinGroup.rotation.z = anim.rotZ;
      coinGroup.scale.setScalar(anim.scale);
      coinGroup.position.y = anim.posY + Math.sin(t * 1.2) * 0.06;

      glowRing.rotation.z = -t * 0.4;
      particles.rotation.y = t * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const onResize = () => {
      if (!canvasRef.current) return;
      const nw = canvasRef.current.clientWidth;
      const nh = canvasRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      renderer.dispose();
      if (canvasRef.current) canvasRef.current.innerHTML = "";
    };
  }, []);

  const cards = [
    {
      icon: TrendingUp,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      borderActive: "border-amber-300 shadow-lg shadow-amber-100/60",
      title: "Bitcoin Trading",
      desc: "Professional-grade trading terminal with real-time charts, order flow analysis, and sub-millisecond execution across top global exchanges.",
      link: "/tools",
      linkText: "Open Terminal",
      tags: ["Live Charts", "Order Flow", "Multi-Exchange"],
    },
    {
      icon: GraduationCap,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      borderActive: "border-blue-300 shadow-lg shadow-blue-100/60",
      title: "Trading Masterclasses",
      desc: "Structured learning paths from beginner to advanced — covering technical analysis, market structure, risk management, and macro strategy.",
      link: "/concepts",
      linkText: "Start Learning",
      tags: ["50+ Lessons", "Certified", "Free Access"],
    },
    {
      icon: Bot,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderActive: "border-emerald-300 shadow-lg shadow-emerald-100/60",
      title: "Trading Bots & Tools",
      desc: "AI-powered DCA bots, risk calculators, profit/loss simulators, and portfolio rebalancing tools designed for systematic traders.",
      link: "/tools",
      linkText: "Explore Tools",
      tags: ["AI-Powered", "DCA Bots", "Calculators"],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden"
    >
      {/* Soft ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(245,158,11,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200/80 text-amber-800 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Explore the Bitcoin Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Trade Smarter
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            From real-time trading to AI-powered tools and expert-led masterclasses — all in one unified platform.
          </p>
        </div>

        {/* Main Content: Coin + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left: 3D Bitcoin Coin */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div
              ref={canvasRef}
              className="w-full aspect-square max-w-[480px] mx-auto"
            />
            {/* Subtle glow under coin */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-amber-400/20 rounded-full blur-2xl" />
          </div>

          {/* Right: 3 Info Cards */}
          <div className="space-y-5 order-1 lg:order-2">
            {cards.map((card, i) => {
              const Icon = card.icon;
              const isActive = activeCard === i;
              return (
                <div
                  key={i}
                  className={`relative p-6 rounded-2xl bg-white border-2 transition-all duration-500 cursor-default ${
                    isActive
                      ? card.borderActive + " scale-[1.02]"
                      : "border-slate-100 hover:border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3">
                        {card.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {card.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={card.link}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
                      >
                        {card.linkText}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
