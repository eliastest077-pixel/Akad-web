import React from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FadingVideo } from "./components/FadingVideo";
import { RevealLayer } from "./components/RevealLayer";
import { BlurText } from "./components/BlurText";
import { FloatingParticles } from "./components/FloatingParticles";
import TargetCursor from "./components/TargetCursor";
import { AtmosphericOrbs } from "./components/AtmosphericOrbs";
import { TiltCard } from "./components/TiltCard";
import Cubes from "./components/Cubes";
import LightPillar from "./components/LightPillar";
import BoomerangVideoBg from "./components/BoomerangVideoBg";
import { PlLoader, TextWaveLoader } from "./components/BrandedLoaders";
import { QuietpressPlayer } from "./components/QuietpressPlayer";
import { EarthArchiveUploader } from "./components/EarthArchiveUploader";
import { Sparkles, Play, ShoppingCart, Menu, X, BarChart3, Heart, Headphones, Volume2 } from "lucide-react";
import {
  ArrowUpRight,
  PlayIcon,
  ClockIcon,
  GlobeIcon,
  ImageIcon,
  MovieIcon,
  LightbulbIcon,
} from "./components/Icons";

const fadeBlurVariants = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

// Simulated high-end projects data
interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  summary: string;
  description: string;
  scope: string[];
  results: string[];
  imageUrl: string;
  link: string;
}

const SELECTED_PROJECTS: Project[] = [
  {
    id: "old-growth",
    title: "Pacific Redwoods",
    category: "Ancient Forest Chronicles",
    client: "Old-Growth Biosphere",
    duration: "2000+ Years",
    summary: "Colossal monuments of cellulose and sky, drinking the Pacific fog and standing silent through human empires.",
    description: "The Coast Redwood is a masterpiece of deep history. Reaching heights exceeding 350 feet, these ancient giants create their own microclimates, harboring entire canopies of moss, fern, and wildlife that never touch the soil below. To stand beneath them is to touch a living, breathing cathedral of carbon.",
    scope: ["Canopy Fog Capture Dynamics", "Root-Mycelial Sharing Mesh", "Carbon Sequestration Columns", "Soft Fern Understory Dampening"],
    results: ["379.7 Ft Peak Height Recorded", "800+ Metric Tons Carbon/Acre", "Pre-Roman Empire Germination"],
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&q=80",
    link: "old-growth",
  },
  {
    id: "deep-ocean",
    title: "The Mariana Abyss",
    category: "Benthic Serenity & Pressure",
    client: "Hadal Trench Systems",
    duration: "Millions of Years",
    summary: "An ethereal expanse of liquid dark, holding pressure that would crush steel, yet populated by fragile bioluminescent wonders.",
    description: "The Hadal zone is the deepest frontier on Earth. Seven miles below the surface, in complete absence of sunlight and under 1,000 atmospheres of pressure, delicate glass sponges and translucent amphipods dance in the dark. It is a quiet, pristine world untouched by the speed of the surface.",
    scope: ["Bioluminescent Light Signalling", "Chemosynthetic Thermal Vents", "Glass-Silica Shell Architecture", "Abyssal Plain Slow Sedimentation"],
    results: ["10,994 Meters Absolute Depth", "No-Light Organic Adaptation", "Ethereal Gelatinous Organisms"],
    imageUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80",
    link: "deep-ocean",
  },
  {
    id: "magma-heart",
    title: "Magma Conduits",
    category: "Earth's Molten Core Flow",
    client: "Basalt Chamber Reservoirs",
    duration: "Continuous Cycle",
    summary: "The dynamic inner fire of our planet, shaping continents and forging obsidian gems through continuous molten flow.",
    description: "Earth is a vessel of absolute energy. Beneath the cold granite shell, oceans of liquid rock flow in massive convection cells. Where tectonic plates fracture, this magma leaks onto the ocean floor, forming black smokers and thermal oases that host life independent of the sun.",
    scope: ["Tectonic Convection Currents", "Hydrothermal Mineral Chimneys", "Basalt Crust Solidification", "Undersea Sulphur Synthesis"],
    results: ["1,200°C Liquid Rock Flow", "Obsidian Glass Formation", "New Continental Plate Synthesis"],
    imageUrl: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d151?auto=format&fit=crop&w=1200&q=80",
    link: "magma-heart",
  }
];

const METHODOLOGY_STEPS = [
  {
    num: "01",
    phase: "Deep Accretion",
    tagline: "Stones pack the memory of ages.",
    description: "Over millions of years, the slow rain of mineral dust and calcium shells settles on the ocean floor. Under the immense weight of the water above, these soft sediments press together, lithifying into solid limestone—compressing millennia of earth history into single stone slabs.",
  },
  {
    num: "02",
    phase: "Erosion's Touch",
    tagline: "Uncompromising patient sculpting.",
    description: "Water and ice are the master sculptors of the land. A glacier moving a fraction of an inch per day grinds mountains into smooth valleys, while a simple mountain creek cuts deep gorges into ancient granite. The mountain yields to the persistence of the drop.",
  },
  {
    num: "03",
    phase: "The Green Breath",
    tagline: "Converting light into timber towers.",
    description: "Every leaf is an organic light collector. Chlorophyll molecules capture solar photons, splitting water to release oxygen and fixing atmospheric carbon dioxide into cellulose fibers. Through this silent, planetary breath, the forest builds towering timber columns.",
  },
  {
    num: "04",
    phase: "Cosmic Harmony",
    tagline: "The rhythm of orbital dance.",
    description: "Our seasons are governed by a subtle tilt of the Earth's axis. As our planet orbits the sun, the shift of light intensity triggers deep chemical changes—the yellowing of autumn leaves, the winter sleep of roots, and the explosive rebirth of spring.",
  }
];

const JOURNAL_POSTS = [
  {
    id: "post-1",
    date: "Epoch of Silica",
    title: "The Mathematical Splendor of Quartz Crystals",
    category: "Mineralogy",
    readTime: "Deep Time Read",
    snippet: "Exploring how silicon and oxygen atoms align under extreme subterranean pressures to form perfectly hexagonal glass pillars that reflect natural light in pristine geometric grids."
  },
  {
    id: "post-2",
    date: "Epoch of Fungi",
    title: "Mycorrhizal Networks: The Web of the Forest Floor",
    category: "Symbiosis",
    readTime: "Slow Reading",
    snippet: "How tiny fungal hyphae thread through the soil, connecting the roots of distant trees to share water, carbon, and early warning signals in a living, subterranean communication web."
  },
  {
    id: "post-3",
    date: "Epoch of Water",
    title: "The Architecture of a Mountain Mist",
    category: "Atmosphere",
    readTime: "Quiet Read",
    snippet: "How rising thermal air currents lift microscopic water droplets from forest canopies to create low-hanging clouds, dampening noise and casting the wilderness into a serene state of quiet."
  }
];

const QUIETPRESS_TRACKS = [
  { artist: "Helia Marsh", title: "Fern Light", duration: "1:54" },
  { artist: "Echo Drift", title: "Pine Shadows", duration: "3:40" },
  { artist: "Moss Canopy", title: "Vernal Stream", duration: "2:15" },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderType, setPreloaderType] = useState<'ring' | 'wave'>('ring');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Calibrating sensors...");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // quietpress interactive state
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isLikedTrack, setIsLikedTrack] = useState(false);
  const [isQuietpressMenuOpen, setIsQuietpressMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "$10 - $100/mo",
    scope: "Old-Growth Forest",
    details: "",
  });

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const assets = [
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4",
      ...SELECTED_PROJECTS.map(p => p.imageUrl)
    ];

    let loadedCount = 0;
    const totalAssets = assets.length;

    const updateStatus = (progress: number) => {
      if (progress < 20) return "Gathering ancient sediments...";
      if (progress < 45) return "Weaving mycelial networks...";
      if (progress < 70) return "Diving deep into Hadal zones...";
      if (progress < 90) return "Structuring basalt conduits...";
      return "Fusing temporal coordinates...";
    };

    let progressTimer: NodeJS.Timeout;
    let targetProgress = 0;

    const startProgress = () => {
      progressTimer = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          const diff = targetProgress - prev;
          if (diff <= 0) {
            return Math.min(prev + 0.5, 99);
          }
          const step = Math.max(0.5, diff * 0.1);
          const next = Math.min(prev + step, 100);
          setLoadingStatus(updateStatus(next));
          return next;
        });
      }, 30);
    };

    startProgress();

    // Load assets in parallel
    assets.forEach(url => {
      if (url.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = url;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        const onDone = () => {
          loadedCount++;
          targetProgress = Math.round((loadedCount / totalAssets) * 100);
          if (loadedCount === totalAssets) {
            targetProgress = 100;
          }
        };
        video.oncanplaythrough = onDone;
        video.onerror = onDone;
      } else {
        const img = new Image();
        img.src = url;
        const onDone = () => {
          loadedCount++;
          targetProgress = Math.round((loadedCount / totalAssets) * 100);
          if (loadedCount === totalAssets) {
            targetProgress = 100;
          }
        };
        img.onload = onDone;
        img.onerror = onDone;
      }
    });

    const minTimePromise = new Promise(resolve => setTimeout(resolve, 5500));
    
    Promise.all([
      minTimePromise,
      ...assets.map(url => {
        return new Promise<void>(resolve => {
          if (url.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto';
            video.muted = true;
            video.playsInline = true;
            video.oncanplaythrough = () => resolve();
            video.onerror = () => resolve();
            setTimeout(resolve, 5000); // safety timeout
          } else {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve();
            setTimeout(resolve, 5000); // safety timeout
          }
        });
      })
    ]).then(() => {
      targetProgress = 100;
      setLoadingProgress(100);
      setLoadingStatus("Ascent complete.");
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    });

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isTransitionSection = ["work", "capabilities", "process", "journal", "estimator"].includes(id);
      if (isTransitionSection && (document as any).startViewTransition) {
        document.documentElement.classList.add("transition-wipe");
        const transition = (document as any).startViewTransition(() => {
          el.scrollIntoView({ behavior: "auto" });
        });
        transition.finished.finally(() => {
          document.documentElement.classList.remove("transition-wipe");
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsProjectModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: "", email: "", budget: "$10 - $100/mo", scope: "Old-Growth Forest", details: "" });
      showToast("Thank you! Your Earth Guardian request has been logged successfully.");
    }, 2000);
  };

  // State and refs for Section 2: Lithos Spotlight Reveal
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Ref for Section 3: Rock animation (sliding and continuous rotation)
  const section3RockRef = useRef<HTMLDivElement | null>(null);
  const section3RockInnerRef = useRef<HTMLDivElement | null>(null);

  // Section refs for scroll progress
  const heroRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const journalRef = useRef<HTMLDivElement>(null);
  const estimatorRef = useRef<HTMLDivElement>(null);

  // Section 1: Hero Scroll Transforms disabled for a solid slide feel
  const heroBgScale = 1;
  const heroBgOpacity = 0.65;
  const heroContentY = 0;
  const heroContentOpacity = 1;

  // Section 2: Lithos/Work Scroll Transforms disabled
  const workBgScale = 1;
  const workContentY = 0;
  const workOpacity = 1;

  // Section 3: Capabilities Scroll Transforms disabled
  const capBgScale = 1;
  const capContentY = 0;
  const capOpacity = 1;

  // Section 4: Process Scroll Transforms disabled
  const procContentY = 0;
  const procOpacity = 1;

  // Section 5: Journal Scroll Transforms disabled
  const journalContentY = 0;
  const journalOpacity = 1;

  useEffect(() => {
    // 1. Mouse Tracking with smoothing for Section 2 (Spotlight Reveal)
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        mouse.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const update = () => {
      if (smooth.current.x === -999) {
        smooth.current = { ...mouse.current };
      } else {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      }
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen selection:bg-white/20 selection:text-white">
      {/* PRELOADER SCREEN */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Ambient deep green background pulse */}
            <div 
              className="absolute inset-0 opacity-60 pointer-events-none" 
              style={{ background: "radial-gradient(circle, rgba(28,44,25,0.3) 0%, rgba(0,0,0,0) 70%)" }}
            />

            <div className="relative z-10 w-full max-w-md flex flex-col items-center">
              {/* Premium loader showcase area */}
              <div className="mb-6 w-full flex items-center justify-center min-h-[220px]">
                <AnimatePresence mode="wait">
                  {preloaderType === "ring" ? (
                    <motion.div
                      key="ring"
                      initial={{ scale: 0.8, opacity: 0, rotateX: 30 }}
                      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateX: -30 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center justify-center"
                    >
                      <PlLoader text="AKAD" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="wave"
                      initial={{ scale: 0.8, opacity: 0, y: 15 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center justify-center"
                    >
                      <TextWaveLoader text="AKAD" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Title & subtitle */}
              <motion.h2
                initial={{ filter: "blur(6px)", opacity: 0, y: 10 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-heading italic text-3xl text-neutral-200 tracking-tight text-center mb-1"
              >
                Tales of Time
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs text-neutral-400 font-mono tracking-widest uppercase mb-8"
              >
                Deep Time Exploration
              </motion.p>

              {/* Progress bar container */}
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative mb-4">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>

              {/* Progress text & dynamic status */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                <span className="text-emerald-500/80 uppercase tracking-wider transition-all duration-300">
                  {loadingStatus}
                </span>
                <span className="tabular-nums">
                  {Math.round(loadingProgress)}%
                </span>
              </div>

              {/* Interactive Loader Switcher */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-neutral-900/30 backdrop-blur-md mt-6">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase pl-1 pr-2">
                  Style:
                </span>
                <button
                  type="button"
                  onClick={() => setPreloaderType("ring")}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-widest transition-all uppercase cursor-target ${
                    preloaderType === "ring"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)] font-semibold"
                      : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                  }`}
                >
                  3D Ring
                </button>
                <button
                  type="button"
                  onClick={() => setPreloaderType("wave")}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-widest transition-all uppercase cursor-target ${
                    preloaderType === "wave"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)] font-semibold"
                      : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                  }`}
                >
                  Cylinder Wave
                </button>
              </div>
            </div>

            {/* Subtle disclaimer */}
            <div className="absolute bottom-8 left-6 right-6 text-center">
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Optimizing visual assets & frames • 60 FPS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Target Cursor Component */}
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        hoverDuration={0.2}
        parallaxOn={true}
        cursorColor="#ffffff"
        cursorColorOnTarget="#ffffff"
      />

      {/* BACKGROUND ATMOSPHERE (Ambient Glow) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute top-[200vh] right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none z-1" />
      <div className="absolute top-[400vh] left-1/3 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[130px] pointer-events-none z-1" />

      {/* NAVBAR (Fixed across all screens) */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 lg:px-16 pointer-events-none">
        {/* Left Logo */}
        <div className="pointer-events-auto">
          <button
            onClick={() => scrollToSection("hero")}
            className="cursor-target liquid-glass h-12 w-12 rounded-full flex items-center justify-center font-heading text-xl hover:scale-105 active:scale-95 transition-transform"
            id="nav-logo"
            aria-label="Home"
          >
            🌿
          </button>
        </div>

        {/* Center Pill Menu */}
        <div className="hidden md:flex items-center gap-2 liquid-glass rounded-full px-2 py-2 pointer-events-auto">
          {[
            { label: "Wonders", id: "work" },
            { label: "Chronicles", id: "capabilities" },
            { label: "Cycles", id: "process" },
            { label: "Phenomena", id: "journal" },
            { label: "Estimator", id: "estimator" }
          ].map((item) => {
            return (
              <button
                key={item.label}
                onClick={() => {
                  scrollToSection(item.id);
                }}
                className="cursor-target px-3.5 py-2 text-sm font-medium text-white/80 font-body hover:text-white transition-colors"
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="cursor-target bg-white text-black font-body font-medium text-xs rounded-full px-4 py-2 flex items-center gap-1.5 hover:bg-neutral-200 active:scale-95 transition-all ml-2"
            id="nav-cta-btn"
          >
            Become Guardian
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Spacer or Mobile Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsQuietpressMenuOpen(!isQuietpressMenuOpen)}
            className={`cursor-target md:hidden h-10 w-10 rounded-full flex items-center justify-center transition-all ${
              isQuietpressMenuOpen
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "liquid-glass text-white/80 hover:text-white"
            }`}
            title="Toggle Ambient Soundtrack"
            id="mobile-quietpress-toggle"
          >
            <Headphones className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="cursor-target md:hidden liquid-glass px-4 py-2 rounded-full font-body font-medium text-xs text-white flex items-center gap-1.5"
            id="mobile-contact-trigger"
          >
            Pledge
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => setIsQuietpressMenuOpen(!isQuietpressMenuOpen)}
            className={`cursor-target hidden md:flex h-12 w-12 rounded-full items-center justify-center transition-all ${
              isQuietpressMenuOpen
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "liquid-glass text-white/80"
            }`}
            title="Toggle Ambient Quietpress Player"
            id="quietpress-nav-toggle"
          >
            <Headphones className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen lg:min-h-screen w-full overflow-hidden bg-black flex flex-col justify-between"
      >
        {/* Background atmospheric rock video */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ scale: heroBgScale, opacity: heroBgOpacity }}
        >
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4"
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top opacity-65"
            style={{ width: "120%", height: "120%" }}
            playbackRate={1.2}
            loop={false}
          />
          <FloatingParticles count={65} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021c15]/60 via-transparent to-[#021c15]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#021c15] via-[#021c15]/60 to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-6 md:px-16 lg:px-20 text-center max-w-5xl mx-auto w-full"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          
          {/* Badge */}
          <motion.div
            id="hero-badge"
            variants={fadeBlurVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="cursor-target liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2 text-xs md:text-sm font-body shadow-lg hover:bg-white/[0.03] transition-colors"
          >
            <span className="bg-white text-black text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Earth
            </span>
            <span className="text-white/90 font-light">
              Planetary Cycle Status: Solstice Rhythms Active
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="mt-6 max-w-4xl leading-[0.95] tracking-[-3px]">
            <BlurText
              text="The Quiet Wonder of Earth’s Deep Time"
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading italic text-white leading-[0.95] tracking-[-3px]"
            />
          </div>

          {/* Subtext description */}
          <motion.p
            id="hero-subtext"
            variants={fadeBlurVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="text-sm md:text-base text-white/90 max-w-2xl font-body font-light leading-relaxed mt-6 tracking-wide"
          >
            An immersive digital chronicle celebrating the silence, patience, and symmetry of the natural world. Discover the ancient geology, breathing forests, and abyssal marine trenches shaped over magnificent epochs.
          </motion.p>

          {/* Call To Action Buttons */}
          <motion.div
            id="hero-cta"
            variants={fadeBlurVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="cursor-target liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 font-body text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-xl text-white group"
            >
              Become a Guardian
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => setIsShowreelOpen(true)}
              className="cursor-target flex items-center gap-2 font-body text-sm font-medium text-white/90 hover:text-white transition-colors py-2 group"
            >
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <PlayIcon className="w-3.5 h-3.5 text-white animate-pulse" />
              </div>
              Behold Earth's Loop
            </button>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            id="hero-stats"
            variants={fadeBlurVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            {/* Stat 1 */}
            <TiltCard className="cursor-target liquid-glass p-5 w-full sm:w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex items-center justify-between">
                <ClockIcon className="w-5 h-5 text-white/80" />
                <span className="text-[10px] font-body tracking-wider text-white/40 uppercase">Earth's Age</span>
              </div>
              <div>
                <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                  4.5B Yrs
                </div>
                <div className="text-[11px] font-body font-light text-white/70 mt-1">
                  Estimated age of the continental crust
                </div>
              </div>
            </TiltCard>

            {/* Stat 2 */}
            <TiltCard className="cursor-target liquid-glass p-5 w-full sm:w-[220px] rounded-[1.25rem] text-left flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex items-center justify-between">
                <GlobeIcon className="w-5 h-5 text-white/80" />
                <span className="text-[10px] font-body tracking-wider text-white/40 uppercase">Biodiversity</span>
              </div>
              <div>
                <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                  8.7M+
                </div>
                <div className="text-[11px] font-body font-light text-white/70 mt-1">
                  Eukaryotic species in thriving symbioses
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>

        {/* Bottom Trust Bar */}
        <motion.div
          id="hero-trust-bar"
          variants={fadeBlurVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="liquid-glass rounded-full px-6 py-1.5 text-xs text-white/80 font-body font-light shadow-md">
            Witnessed by travelers, naturalists, and deep time keepers across epochs
          </div>
          <div className="flex items-center justify-center gap-10 md:gap-16">
            {["Aether", "Silt", "Basalt", "Fern", "Magma"].map((logo) => (
              <span
                key={logo}
                className="cursor-target font-heading italic text-2xl md:text-3xl tracking-tight text-white/40 hover:text-white/90 hover:scale-105 transition-all duration-300 select-none"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: LITHOS HERO SECTION */}
      <section
        id="work"
        ref={sectionRef}
        className="relative w-full overflow-hidden h-screen bg-black lithos-root"
        style={{ height: '100dvh' }}
      >
        {/* Navigation (fixed, over hero) */}
        <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-end p-4 sm:p-5 pointer-events-auto">
          {/* Right (desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => showToast("Sign up flow initiated")}
              className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile hamburger is md:hidden */}
          <button
            onClick={() => showToast("Menu coming soon!")}
            className="md:hidden text-white flex items-center justify-center p-2 rounded-full hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>

        {/* 1. Base image (z-10) with scroll-linked scaling and opacity */}
        <motion.div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10"
          style={{
            backgroundImage: `url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85")`,
            scale: workBgScale,
            opacity: workOpacity
          }}
        />

        {/* 2. Reveal layer (z-30) */}
        <motion.div className="absolute inset-0 z-30" style={{ opacity: workOpacity }}>
          <RevealLayer
            image="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85"
            cursorX={cursorPos.x}
            cursorY={cursorPos.y}
          />
        </motion.div>

        {/* Smooth Section Transitions (Gradients to blend with Sections 1 & 3) */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#021c15] via-[#021c15]/50 to-transparent pointer-events-none z-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#064e3b] via-[#844e2b]/30 to-transparent pointer-events-none z-40" />

        {/* Parallax Content Group Container */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none"
          style={{ y: workContentY, opacity: workOpacity }}
        >
          {/* 3. Heading */}
          <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5">
            <h1 className="text-white leading-[0.95] flex flex-col items-center">
              <span
                className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
                style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
              >
                Layers hold
              </span>
              <span
                className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
                style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
              >
                tales of time
              </span>
            </h1>
          </div>

          {/* 4. Bottom-left paragraph */}
          <div
            className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] pointer-events-auto"
          >
            <p className="text-sm text-white/80 leading-relaxed">
              Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
            </p>
          </div>

          {/* 5. Bottom-right block */}
          <div
            className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 pointer-events-auto"
          >
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
            </p>
            <button
              onClick={() => showToast("Initiating map telemetry layer...")}
              className="cursor-target bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
            >
              Start Digging
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3 & 4 UNIFIED CONTAINER */}
      <div className="relative w-full bg-black overflow-hidden">
        {/* Continuous 3D LightPillar spanning behind Section 3 & 4 */}
        <LightPillar 
          className="absolute inset-0 z-0 opacity-45 pointer-events-none" 
          topColor="#064e3b" 
          bottomColor="#10b981" 
          intensity={0.95} 
          interactive={true} 
          quality="high"
        />

        {/* SECTION 3: CHRONICLES & WONDERS */}
        <section
          id="capabilities"
          ref={capabilitiesRef}
          className="relative min-h-screen w-full overflow-hidden bg-transparent flex flex-col justify-between z-10"
        >
          {/* Background Atmospheric Tree Canopy Video */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div
              ref={section3RockRef}
              className="absolute w-[130%] h-[130%] -left-[15%] -top-[15%]"
            >
              <motion.div
                ref={section3RockInnerRef}
                className="w-full h-full"
                style={{ scale: capBgScale }}
              >
                <FadingVideo
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
                  className="w-full h-full object-cover opacity-30"
                  disableFade={true}
                />
              </motion.div>
            </div>
            {/* Deep blending gradients for seamless transition */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#064e3b] via-[#064e3b]/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#021c15] via-[#064e3b]/50 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none z-5" />
          </div>

        {/* Section Content */}
        <motion.div 
          className="relative z-10 px-6 md:px-16 lg:px-20 pt-32 pb-16 flex flex-col min-h-screen justify-between"
          style={{ y: capContentY, opacity: capOpacity }}
        >
          
          {/* Section Header */}
          <div className="mb-auto max-w-4xl">
            {/* Label */}
            <motion.div
              initial={{ filter: "blur(8px)", opacity: 0, x: -10 }}
              whileInView={{ filter: "blur(0px)", opacity: 0.8, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-body text-white/80 mb-6 tracking-widest uppercase"
            >
              // Deep Time Chronicles
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ filter: "blur(12px)", opacity: 0, y: 30 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] text-white whitespace-pre-line"
            >
              {"Earth, captured\nin silent wonder"}
            </motion.h2>
          </div>

          {/* Cards Grid - Original Stone, Flow, Epochs */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: STONE */}
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="h-full flex"
            >
              <TiltCard className="cursor-target liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col w-full">
                {/* Top row */}
                <div className="flex items-start justify-between w-full">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center text-white/90">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-end max-w-[70%]">
                    {["Quartz", "Silica Pressure", "Geothermal"].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom Details */}
                <div className="mt-8">
                  <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none mb-3 text-white">
                    Stone
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    Deep beneath the soil, quartz crystals take millions of years of intense geothermal heat and constant pressure to crystallize. Layer by layer, they grow in complete, silent dark, forming geometric structures of absolute natural perfection.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* CARD 2: FLOW */}
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="h-full flex"
            >
              <TiltCard className="cursor-target liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col w-full">
                {/* Top row */}
                <div className="flex items-start justify-between w-full">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center text-white/90">
                    <MovieIcon className="w-5 h-5" />
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-end max-w-[70%]">
                    {["Basalt Silt", "Water Paths", "Erosion"].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom Details */}
                <div className="mt-8">
                  <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none mb-3 text-white">
                    Flow
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    Every canyon is a monument to patience. A single stream of water, given enough eons, can cut through solid basalt and ancient granite, carrying mineral silt down to the seas to build the future layers of the earth.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* CARD 3: EPOCHS */}
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="h-full flex"
            >
              <TiltCard className="cursor-target liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col w-full">
                {/* Top row */}
                <div className="flex items-start justify-between w-full">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center text-white/90">
                    <LightbulbIcon className="w-5 h-5" />
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-end max-w-[70%]">
                    {["Shale Imprint", "Deep Memory", "Fossil"].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom Details */}
                <div className="mt-8">
                  <h3 className="font-heading italic text-3xl md:text-4xl tracking-[-1px] leading-none mb-3 text-white">
                    Epochs
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    When an ancient fern falls into fine silt, its organic frame decays but leaves a perfect carbon shadow etched in shale. In these tiny imprints, the planet remembers the exact shape of a breeze from three hundred million years ago.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

          </div>

          <div className="mt-12 text-center text-xs text-white/40">
            Scroll down to contemplate the deep phases of mineral and biological accretion.
          </div>

        </motion.div>
      </section>

      {/* SECTION 4: THE PROCESS (Our Methodology) - Expanded! */}
      <section
        id="process"
        ref={processRef}
        className="relative min-h-screen w-full bg-transparent py-32 px-6 md:px-16 lg:px-20 overflow-hidden z-10"
      >
        {/* Ambient Glassmorphic Orbs */}
        <AtmosphericOrbs />

        {/* Smooth Section Transitions */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#021c15] via-[#021c15]/50 to-transparent pointer-events-none z-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1f3d14] via-[#021c15]/50 to-transparent pointer-events-none z-40" />

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto flex flex-col h-full justify-between"
          style={{ y: procContentY, opacity: procOpacity }}
        >
          
          {/* Section Header */}
          <div className="max-w-4xl mb-20">
            <motion.div
              initial={{ filter: "blur(8px)", opacity: 0, x: -10 }}
              whileInView={{ filter: "blur(0px)", opacity: 0.8, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-body text-white/80 mb-6 tracking-widest uppercase"
            >
              // Planetary Cycles
            </motion.div>

            <motion.h2
              initial={{ filter: "blur(12px)", opacity: 0, y: 30 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-heading italic text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] text-white"
            >
              {"Four cycles of\nplanetary patience."}
            </motion.h2>
          </div>

          {/* Timeline Process List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ filter: "blur(10px)", opacity: 0, y: 40 }}
                whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: "easeOut" }}
                className="h-full flex"
              >
                <TiltCard className="cursor-target liquid-glass p-8 rounded-3xl min-h-[380px] flex flex-col justify-between w-full">
                  <div>
                    {/* Step Numeric indicator */}
                    <div className="font-heading italic text-5xl text-white/20 group-hover:text-white/40 transition-colors duration-300">
                      {step.num}
                    </div>
                    
                    <h3 className="font-heading italic text-3xl tracking-tight text-white mt-6 mb-2 leading-none">
                      {step.phase}
                    </h3>
                    
                    <div className="text-xs font-body tracking-wider text-white/60 mb-4 font-medium uppercase">
                      {step.tagline}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-white/80 font-body font-light leading-relaxed mt-4">
                    {step.description}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>
      </div>

      {/* SECTION 5: QUIETPRESS HERO */}
      <section
        id="journal"
        ref={journalRef}
        className="relative h-screen w-full bg-black overflow-hidden"
      >
        {/* Boomerang Video Loop Background */}
        <BoomerangVideoBg
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260611_183632_c311af08-e4b7-458f-81e7-79847a49b3d3.mp4"
        />

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1f3d14] via-[#1f3d14]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1f2a1d] via-[#1f3d14]/50 to-transparent pointer-events-none z-10" />


      </section>

      {/* Atmospheric Transition Spacer & Registry Depository */}
      <div className="relative w-full min-h-[90vh] bg-gradient-to-b from-[#1f2a1d] via-[#091708] to-[#1f2a1d] flex flex-col items-center justify-center py-20 px-6 overflow-hidden z-10">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-12">
          {/* Section Indicator */}
          <div className="flex flex-col items-center gap-4 opacity-75">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <div className="h-12 w-[1px] bg-gradient-to-b from-emerald-500/50 to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-emerald-400">
              PLANETARY DEPOSITORY
            </span>
          </div>

          {/* Render the Uploader */}
          <EarthArchiveUploader showToast={showToast} />
        </div>
      </div>

      {/* SECTION 6: THANK YOU */}
      <section
        id="estimator"
        ref={estimatorRef}
        className="relative w-full min-h-screen sm:h-screen overflow-hidden bg-[#1f2a1d]"
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.0 }}
          whileInView={{ scale: 1.15 }}
          viewport={{ once: false, margin: "-15%" }}
          transition={{ duration: 18, ease: "easeOut" }}
        >
          <BoomerangVideoBg
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4"
            className="absolute inset-0 w-full h-full"
            speed={0.45}
          />
        </motion.div>

        {/* Smooth Section Transitions */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1f2a1d] via-[#1f2a1d]/50 to-transparent pointer-events-none z-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-[#1f2a1d]/50 to-transparent pointer-events-none z-40" />

        {/* Parallax Content Container */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Hero copy */}
          <div
            className="main-section flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6"
          >
            <h1 className="font-heading italic text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] tracking-[-3px] text-white">
              Thank you
            </h1>
          </div>

          {/* Bottom-left CTA block */}
          <div
            className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 max-w-sm pointer-events-auto"
          >
            <div className="flex items-center gap-2 text-[#3d5638] sm:text-white/95 mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold sm:font-medium">
                Tales of Time<sup className="text-[10px]">TM</sup>
              </span>
            </div>
            <p className="text-[#3d5638]/90 sm:text-white/85 text-xs leading-relaxed mb-6 max-w-xs font-medium sm:font-normal">
              Thank you for being part of our deep time exploration. You can return to any segment or explore further below.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection("hero")}
                className="bg-[#3d5638] sm:bg-white hover:bg-[#2d4228] sm:hover:bg-white/90 text-white sm:text-[#1f2a1d] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm cursor-target"
              >
                Back to Start
              </button>
              <button
                onClick={() => showToast("Deep time network is active. More resources coming soon.")}
                className="text-[#3d5638] sm:text-white text-sm font-semibold sm:font-medium hover:opacity-80 transition-opacity cursor-target"
              >
                Know More.
              </button>
            </div>
          </div>

          {/* Bottom-right video link */}
          <div
            className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 items-center gap-2 text-white/90 text-sm pointer-events-auto"
          >
            <button
              onClick={() => setIsShowreelOpen(true)}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-target"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
            </button>
            <span className="font-medium">How we build?</span>
            <span className="text-white/60">1:35</span>
          </div>
        </motion.div>
      </section>

      {/* MODAL 1: START A PROJECT (FORM) */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative liquid-glass-strong w-full max-w-lg rounded-3xl p-6 md:p-8 z-10 shadow-2xl"
              id="project-planner-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="cursor-target absolute top-4 right-4 h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/70 hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="text-center md:text-left">
                <span className="text-xs font-body font-medium text-white/50 uppercase tracking-widest">// Earth Guardian Registry</span>
                <h3 className="font-heading italic text-4xl mt-1 tracking-tight leading-none mb-6">Let's protect something lasting</h3>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h4 className="font-heading italic text-2xl mb-1">Pledge Registered</h4>
                  <p className="text-sm font-body text-white/70 font-light max-w-sm">
                    We have recorded your conservation parameters. Together, we stand as keepers of earth's long memory.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-body font-light text-white/70 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Elias"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="cursor-target w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-light text-white/70 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="elias@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="cursor-target w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Options: Scope */}
                  <div>
                    <label className="block text-xs font-body font-light text-white/70 mb-1.5">Ecosystem Focus</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Old-Growth Forest", "Deep Sea Trench", "Magma Core Vents", "Subterranean Fungi"].map((scope) => (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => setFormData({ ...formData, scope })}
                          className={`cursor-target px-3 py-2 text-xs font-body font-medium rounded-xl border text-center transition-all ${
                            formData.scope === scope
                              ? "bg-white text-black border-white"
                              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {scope}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options: Budget */}
                  <div>
                    <label className="block text-xs font-body font-light text-white/70 mb-1.5">Yearly Pledge Contribution</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["$10 - $100/mo", "$100 - $500/mo", "$500+/mo"].map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget })}
                          className={`cursor-target px-3 py-2 text-xs font-body font-medium rounded-xl border text-center transition-all ${
                            formData.budget === budget
                              ? "bg-white text-black border-white"
                              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea: Details */}
                  <div>
                    <label className="block text-xs font-body font-light text-white/70 mb-1">Conservation Vision</label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Briefly share your environmental hopes, local ecosystems, or personal conservation goals."
                      className="cursor-target w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="cursor-target w-full py-3 bg-white text-black hover:bg-neutral-200 font-body font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors mt-2"
                  >
                    Join the Guardians
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: SHOWREEL (LIGHTBOX) */}
      <AnimatePresence>
        {isShowreelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShowreelOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black z-10 border border-white/10"
              id="showreel-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsShowreelOpen(false)}
                className="cursor-target absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 transition-all text-white z-20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: SELECTED WORK DETAIL OVERLAY / DRAWER */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 50, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative liquid-glass-strong w-full max-w-3xl rounded-[2.5rem] p-6 md:p-10 z-10 shadow-2xl border border-white/10 overflow-y-auto max-h-[90vh] custom-scroll"
              id="work-details-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="cursor-target absolute top-6 right-6 h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/80 hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="mb-6">
                <span className="text-xs font-body font-medium text-white/50 uppercase tracking-widest">// Phenomenon Analysis</span>
                <h3 className="font-heading italic text-5xl md:text-6xl text-white mt-1 leading-none">{activeProject.title}</h3>
                <p className="text-sm font-body text-white/60 uppercase tracking-wider mt-1 font-light">{activeProject.category}</p>
              </div>

              {/* Grid detail */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
                {/* Visual Image */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden aspect-video bg-neutral-900 border border-white/5">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Key parameters stats */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-[10px] font-body text-white/40 uppercase tracking-wider block">Observation Epoch</span>
                    <span className="text-sm font-body text-white/90 font-medium">{activeProject.client}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-[10px] font-body text-white/40 uppercase tracking-wider block">Symmetry Pattern</span>
                    <span className="text-sm font-body text-white/90 font-medium">{activeProject.duration}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-heading italic text-2xl text-white mb-2">Scientific Narrative</h4>
                  <p className="text-sm font-body text-white/80 font-light leading-relaxed">{activeProject.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="font-heading italic text-2xl text-white mb-2">Ecological Attributes</h4>
                    <ul className="space-y-1.5">
                      {activeProject.scope.map((tag, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-body font-light text-white/80">
                          <span className="h-1.5 w-1.5 bg-white/40 rounded-full" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading italic text-2xl text-white mb-2">Sequestration Metrics</h4>
                    <ul className="space-y-1.5">
                      {activeProject.results.map((res, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-body font-light text-white/90">
                          <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => {
                    setActiveProject(null);
                    setIsProjectModalOpen(true);
                  }}
                  className="cursor-target bg-white text-black px-6 py-2.5 rounded-full font-body font-semibold text-xs flex items-center gap-1.5 hover:bg-neutral-200 transition-colors"
                >
                  Support This Wonder
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE AMBIENT SOUNDTRACK (QUIETPRESS) */}
      <QuietpressPlayer
        isOpen={isQuietpressMenuOpen}
        onClose={() => setIsQuietpressMenuOpen(false)}
        currentTrackIdx={currentTrackIdx}
        setCurrentTrackIdx={setCurrentTrackIdx}
        isLikedTrack={isLikedTrack}
        setIsLikedTrack={setIsLikedTrack}
        showToast={showToast}
      />

      {/* CUSTOM GLASS MORPHISM TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              className="pointer-events-auto liquid-glass rounded-full px-6 py-3 flex items-center gap-2 max-w-sm shadow-xl"
            >
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-body font-light text-white/90">
                {toastMessage}
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// React 19 polyfill for useEffectEvent
function useEffectEvent<Args extends any[], Return>(
  callback: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  });
  return useRef((...args: Args) => ref.current(...args)).current;
}
