"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, GraduationCap, Bot, ArrowRight, BarChart3, BookOpen, Wrench } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    icon: TrendingUp,
    accentIcon: BarChart3,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    accent: "amber",
    borderColor: "border-amber-200",
    glowColor: "shadow-amber-200/40",
    tagBg: "bg-amber-50 text-amber-700",
    title: "Bitcoin Trading",
    subtitle: "Professional-Grade Execution",
    desc: "Access a real-time trading terminal with institutional-grade charting, order flow visualization, and sub-millisecond execution across the world's top cryptocurrency exchanges. Analyze market microstructure, track whale movements, and execute with confidence.",
    link: "/tools",
    linkText: "Open Trading Terminal",
    stats: [
      { label: "Exchanges", value: "15+" },
      { label: "Indicators", value: "100+" },
      { label: "Latency", value: "<1ms" },
    ],
    tags: ["Live Charts", "Order Flow", "Multi-Exchange", "WebSocket Feeds"],
  },
  {
    icon: GraduationCap,
    accentIcon: BookOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accent: "blue",
    borderColor: "border-blue-200",
    glowColor: "shadow-blue-200/40",
    tagBg: "bg-blue-50 text-blue-700",
    title: "Trading Masterclasses",
    subtitle: "From Beginner to Professional",
    desc: "Structured learning paths designed by professional traders — covering technical analysis, market structure theory, advanced risk management, macro fundamentals, and quantitative strategies. Learn at your own pace with interactive modules and real market case studies.",
    link: "/concepts",
    linkText: "Start Learning Free",
    stats: [
      { label: "Courses", value: "50+" },
      { label: "Hours", value: "200+" },
      { label: "Price", value: "Free" },
    ],
    tags: ["Certified", "Self-Paced", "Case Studies", "Expert-Led"],
  },
  {
    icon: Bot,
    accentIcon: Wrench,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accent: "emerald",
    borderColor: "border-emerald-200",
    glowColor: "shadow-emerald-200/40",
    tagBg: "bg-emerald-50 text-emerald-700",
    title: "Trading Bots & Tools",
    subtitle: "Automate & Optimize",
    desc: "AI-powered DCA bots, profit/loss calculators, risk-reward simulators, portfolio rebalancing engines, and funding rate arbitrage scanners — all built for systematic and algorithmic traders who want to remove emotion from execution.",
    link: "/tools",
    linkText: "Explore All Tools",
    stats: [
      { label: "Tools", value: "12+" },
      { label: "Bots", value: "AI-Driven" },
      { label: "Cost", value: "Free" },
    ],
    tags: ["AI-Powered", "DCA Bots", "Calculators", "Portfolio Tracker"],
  },
];

export default function HardwareTeardown3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!canvasRef.current || !containerRef.current) return;

    const w = canvasRef.current.clientWidth || 500;
    const h = canvasRef.current.clientHeight || 500;

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

    // --- Lighting ---
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
    const topHL = new THREE.PointLight(0xfef3c7, 4, 12);
    topHL.position.set(0, 5, 2);
    scene.add(topHL);

    // --- Bitcoin Coin ---
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.98, roughness: 0.18 });
    const brightGold = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.96, roughness: 0.12, emissive: 0x92400e, emissiveIntensity: 0.15 });
    const edgeGold = new THREE.MeshStandardMaterial({ color: 0xb8860b, metalness: 0.99, roughness: 0.08 });
    const barMat = new THREE.MeshStandardMaterial({ color: 0x92400e, metalness: 0.95, roughness: 0.15 });

    // Coin body
    const coinBody = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.18, 64), goldMat);
    coinBody.rotation.x = Math.PI / 2;
    coinGroup.add(coinBody);

    // Rims
    const rimGeo = new THREE.TorusGeometry(1.65, 0.06, 16, 64);
    const rimTop = new THREE.Mesh(rimGeo, edgeGold);
    rimTop.position.z = 0.1;
    coinGroup.add(rimTop);
    const rimBot = new THREE.Mesh(rimGeo.clone(), edgeGold);
    rimBot.position.z = -0.1;
    coinGroup.add(rimBot);

    // Inner circle
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.04, 16, 64), brightGold);
    innerRing.position.z = 0.1;
    coinGroup.add(innerRing);

    // Emblem center
    const emblemMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.99, roughness: 0.06, emissive: 0xd97706, emissiveIntensity: 0.3 });
    const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.22, 32), emblemMat);
    emblem.rotation.x = Math.PI / 2;
    coinGroup.add(emblem);

    // B bars
    const barGeo = new THREE.BoxGeometry(0.06, 0.7, 0.24);
    const b1 = new THREE.Mesh(barGeo, barMat); b1.position.set(-0.12, 0, 0); coinGroup.add(b1);
    const b2 = new THREE.Mesh(barGeo.clone(), barMat); b2.position.set(0.12, 0, 0); coinGroup.add(b2);
    const sGeo = new THREE.BoxGeometry(0.45, 0.055, 0.24);
    const s1 = new THREE.Mesh(sGeo, barMat); s1.position.set(0.05, 0.22, 0); coinGroup.add(s1);
    const s2 = new THREE.Mesh(sGeo.clone(), barMat); s2.position.set(0.05, 0, 0); coinGroup.add(s2);
    const s3 = new THREE.Mesh(sGeo.clone(), barMat); s3.position.set(0.05, -0.22, 0); coinGroup.add(s3);

    // Reeded edge
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const bump = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.03), edgeGold);
      bump.position.set(Math.cos(a) * 1.82, Math.sin(a) * 1.82, 0);
      bump.rotation.z = a;
      coinGroup.add(bump);
    }

    // Glow ring
    const glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.015, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.35 })
    );
    coinGroup.add(glowRing);

    // Particles
    const pCount = 50;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 10;
      pPos[i+1] = (Math.random() - 0.5) * 8;
      pPos[i+2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xf59e0b, size: 0.04, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending,
    }));
    scene.add(particles);

    coinGroup.rotation.x = 0.3;
    coinGroup.rotation.z = 0.15;

    // --- GSAP ---
    const anim = { rotY: 0, rotX: 0.3, rotZ: 0.15, scale: 1.0, posY: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: 1.0,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.28) setActiveCard(0);
          else if (p < 0.58) setActiveCard(1);
          else if (p < 0.88) setActiveCard(2);
          else setActiveCard(3);
        },
      },
    });

    tl.to(anim, { rotY: Math.PI * 0.65, rotX: 0.5, rotZ: -0.1, scale: 1.1, posY: 0.12, duration: 1, ease: "power2.inOut" })
      .to(anim, { rotY: Math.PI * 1.3, rotX: -0.15, rotZ: 0.2, scale: 1.18, posY: -0.08, duration: 1, ease: "power2.inOut" })
      .to(anim, { rotY: Math.PI * 1.9, rotX: 0.35, rotZ: -0.05, scale: 1.08, posY: 0.06, duration: 1, ease: "power2.inOut" })
      .to(anim, { rotY: Math.PI * 2, rotX: 0.3, rotZ: 0.15, scale: 1.0, posY: 0, duration: 0.5, ease: "power3.out" });

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

  const currentCard = activeCard < 3 ? cards[activeCard] : cards[2];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(245,158,11,0.07),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">

        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200/80 text-amber-800 mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Explore the Bitcoin Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Trade Smarter
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Scroll to explore our trading ecosystem — tools, education, and automation.
          </p>
        </div>

        {/* Main: Coin + Single Large Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center flex-1 max-h-[560px]">

          {/* Left: Bitcoin 3D Coin */}
          <div className="relative flex items-center justify-center">
            <div ref={canvasRef} className="w-full aspect-square max-w-[420px] mx-auto" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-amber-400/20 rounded-full blur-2xl" />
          </div>

          {/* Right: One Big Card (animated) */}
          <div className="relative h-full flex items-center justify-center min-h-[340px]">

            {cards.map((card, i) => {
              const Icon = card.icon;
              const AccIcon = card.accentIcon;
              const isVisible = activeCard === i;

              return (
                <div
                  key={i}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                  }`}
                >
                  <div className={`w-full p-8 sm:p-10 rounded-3xl bg-white border-2 ${card.borderColor} shadow-xl ${card.glowColor}`}>

                    {/* Top: Icon + Subtitle */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg}`}>
                        <Icon className={`w-7 h-7 ${card.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.subtitle}</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{card.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      {card.desc}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {card.stats.map((stat, j) => (
                        <div key={j} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="text-lg sm:text-xl font-extrabold text-slate-900">{stat.value}</div>
                          <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.tags.map((tag, j) => (
                        <span key={j} className={`px-3 py-1 rounded-full text-xs font-semibold ${card.tagBg}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition"
                    >
                      {card.linkText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                  </div>
                </div>
              );
            })}

            {/* Dot indicators */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
              {cards.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    activeCard === i
                      ? "w-8 h-2.5 bg-amber-500"
                      : "w-2.5 h-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
