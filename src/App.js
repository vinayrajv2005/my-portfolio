import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import {
  Mail, Github, Linkedin, ExternalLink, Download, Code2, Award,
  ChevronDown, MapPin, Calendar, Trophy, BookOpen, Cpu, Moon, Sun,
  MessageCircle, X, Send, Volume2, VolumeX, ArrowUp, Sparkles, Zap,
  Brain, Filter, Star, ZoomIn, FileText, Eye
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const TYPING_ROLES = ["AIML Engineer 🤖", "ML Developer 🧠", "React Developer ⚛️", "Problem Solver 🔥", "AI Enthusiast 🚀"];

const skillCategories = [
  {
    title: "Programming",
    tags: ["C", "Python", "Java"],
    accent: "#7c3aed",
    light: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    dark:  { bg: "#3b0764", text: "#e9d5ff", border: "#6d28d9" },
  },
  {
    title: "Backend & DB",
    tags: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    accent: "#0369a1",
    light: { bg: "#e0f2fe", text: "#075985", border: "#7dd3fc" },
    dark:  { bg: "#0c4a6e", text: "#bae6fd", border: "#0284c7" },
  },
  {
    title: "AI / ML & Data",
    tags: ["Pandas", "NumPy", "Scikit-learn", "OpenCV", "PyTorch", "TensorFlow"],
    accent: "#047857",
    light: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    dark:  { bg: "#064e3b", text: "#a7f3d0", border: "#059669" },
  },
  {
    title: "CV & NLP",
    tags: ["Image Processing", "Object Detection", "OCR", "NLP Pipelines", "Multimodal AI"],
    accent: "#b45309",
    light: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
    dark:  { bg: "#451a03", text: "#fde68a", border: "#d97706" },
  },
  {
    title: "Tools & Platforms",
    tags: ["Git", "GitHub", "Google Colab", "VS Code", "Streamlit", "Power BI", "Tableau", "MS Fabric"],
    accent: "#be123c",
    light: { bg: "#ffe4e6", text: "#9f1239", border: "#fda4af" },
    dark:  { bg: "#4c0519", text: "#fecdd3", border: "#e11d48" },
  },
  {
    title: "Soft Skills",
    tags: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Leadership", "Communication"],
    accent: "#374151",
    light: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
    dark:  { bg: "#1f2937", text: "#d1d5db", border: "#4b5563" },
  },
];

const projects = [
  { id: 1, title: "ClassBridge AI (Smart Classroom with Real-Time Translation & AI Notes)",   desc: "AI-powered smart classroom system that supports real-time translation, live subtitles, automatic note generation, and YouTube lecture processing using NLP, speech recognition, and AI-driven summarization.",   tags: ["Python", "Flask", "WebRTC", "Natural Language Processing", "Deep Learning", "Speech Recognition", "Whisper", "HuggingFace Transformers", "Real-Time Communication", "Socket.IO", "Multilingual AI", "YouTube Data Processing", "AI Summarization"],    gradient: ["#06B6D4","#3B82F6"], github:"https://github.com/vinayrajv2005/smart-classroom-ai", year:"2026", stars: 42 },
  { id: 2, title: "Fitness Guru – AI Fitness Trainer",   desc: "Fitness Guru is an AI-powered fitness system that uses pose estimation to detect exercises, analyze posture, and provide real-time feedback with interactive performance tracking dashboards. It continuously monitors user movements to ensure correct form and reduce the risk of injury. The system also stores workout data and visualizes progress over time, helping users train smarter and stay consistent.",   tags: ["Computer Vision", "ML", "React", "Flask", "MediaPipe", "Chart.js"], gradient: ["#8B5CF6","#EC4899"], github:"https://github.com/vinayrajv2005/ai-fitness-coach", year:"2025", stars: 28 },
  { id: 3, title: "AI Project Three", desc: "Replace with your real project description — the problem it solves, the model used, and key results or accuracy metrics.", tags: ["Web", "React", "API"],    gradient: ["#10B981","#06B6D4"], github:"#", year:"2023", stars: 19 },
  { id: 4, title: "AI Project Four",  desc: "Replace with your real project description — the problem it solves, the model used, and key results or accuracy metrics.",  tags: ["ML", "AWS", "Docker"],   gradient: ["#F59E0B","#F97316"], github:"#", year:"2023", stars: 35 },
];

const education = [
  { degree: "B.E. in Artificial Intelligence & ML", school: "Jawaharlal Nehru National College of Engineering", location: "Shivamogga, Karnataka", period: "2022–2026", grade: "8.66 CGPA", icon: "🎓" },
  { degree: "Pre-University (12th Grade)", school: "ACHARYA Pre University College", location: "Shivamogga, Karnataka", period: "2020–2022", grade: "84%", icon: "📚" },
];

const achievements = [
  {
    title: "GenAI for Everyone",
    issuer: "Coursera · Starweaver",
    date: "Mar 2025",
    icon: Sparkles,
    accent: "#0EA5E9",
    certificate: "https://coursera.org/verify/X1XANHJI4QND",
  },
  {
    title: "Implementing AI With Amazon ML",
    issuer: "Infosys Springboard",
    date: "Mar 2025",
    icon: Cpu,
    accent: "#F59E0B",
    certificate: "https://drive.google.com/file/d/1n03YiUahv4bo6v5rek3yTvRuXop6_Lu-/preview",
  },
  {
    title: "Python & Machine Learning Bootcamp",
    issuer: "Corizo · IIT Bombay Mood Indigo",
    date: "Jul 2025",
    icon: Trophy,
    accent: "#8B5CF6",
    certificate: "https://drive.google.com/file/d/1kkfU9Ew-5v7NdZMRHt5iOyOBK3MVwZ9J/preview",
  },
  {
    title: "The MERN Stack & Full Stack Dev",
    issuer: "Infosys Springboard",
    date: "Jan 2025",
    icon: Code2,
    accent: "#10B981",
    certificate: "https://drive.google.com/file/d/1c3-ViO-oQdAAtlgQJcYv5qM2skE5g2kn/preview",
  },
  {
    title: "Artificial Intelligence: Types of AI",
    issuer: "Infosys Springboard",
    date: "Feb 2025",
    icon: Brain,
    accent: "#EC4899",
    certificate: "https://drive.google.com/file/d/1si1-WTdZesKEMZ5EdasZPb_lbZm4JQc0/preview",
  },
  {
    title: "Python Data Structures",
    issuer: "Great Learning Academy",
    date: "Dec 2024",
    icon: Award,
    accent: "#06B6D4",
    certificate: "https://www.mygreatlearning.com/certificate/WXXJFQQZ",
  },
  {
    title: "SHE Secure 2025 — National Hackathon",
    issuer: "JNNCE · Hack2Skill",
    date: "2025",
    icon: Trophy,
    accent: "#F97316",
    certificate: "https://drive.google.com/file/d/1rxMITBfEQtFNiwmmaC6JelrMJy9o60mg/preview",
  },
];

const NAV = ["home","about","projects","skills","education","achievements","contact"];

// ═══════════════════════════════════════════════════════════════
// CERTIFICATE MODAL
// ═══════════════════════════════════════════════════════════════

function CertificateModal({ achievement, dark, onClose }) {
  const BG     = dark ? "rgba(2,6,23,0.97)"      : "rgba(248,250,252,0.97)";
  const CARD   = dark ? "rgba(255,255,255,0.04)"  : "rgba(0,0,0,0.04)";
  const BORDER = dark ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)";
  const TEXT   = dark ? "#f1f5f9"                 : "#0f172a";
  const MUTED  = dark ? "#64748b"                 : "#94a3b8";
  const accent = achievement.accent;

  const isEmbeddable =
    achievement.certificate?.includes("drive.google.com") ||
    achievement.certificate?.toLowerCase().includes(".pdf") ||
    achievement.certificate?.toLowerCase().includes("preview");

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: BG,
          border: `1px solid ${accent}40`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20, inset 0 1px 0 rgba(255,255,255,0.05)`,
          maxHeight: "90vh",
        }}
      >
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80, transparent)` }} />
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `0.5px solid ${BORDER}`, background: `linear-gradient(135deg, ${accent}12, transparent)` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: accent + "25", border: `0.5px solid ${accent}50` }}
            >
              <achievement.icon className="w-5 h-5" style={{ color: accent }} />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight" style={{ color: TEXT }}>{achievement.title}</p>
              <p className="text-xs" style={{ color: MUTED }}>{achievement.issuer} · {achievement.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {achievement.certificate && (
              <motion.a
                href={achievement.certificate}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
                style={{ background: accent + "20", color: accent, border: `0.5px solid ${accent}40` }}
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Full
              </motion.a>
            )}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: CARD, border: `0.5px solid ${BORDER}`, color: MUTED }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 flex items-center justify-center" style={{ minHeight: "300px" }}>
          {achievement.certificate ? (
            isEmbeddable ? (
              <iframe
                src={achievement.certificate}
                className="w-full rounded-2xl"
                style={{ height: "500px", border: `0.5px solid ${BORDER}` }}
                title={achievement.title}
                allow="autoplay"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="relative group w-full"
              >
                <img
                  src={achievement.certificate}
                  alt={achievement.title}
                  className="w-full rounded-2xl object-contain"
                  style={{
                    maxHeight: "520px",
                    border: `1px solid ${accent}30`,
                    boxShadow: `0 8px 40px ${accent}20`,
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full rounded-2xl items-center justify-center flex-col gap-3 py-16"
                  style={{ display: "none", background: CARD, border: `1px dashed ${BORDER}` }}
                >
                  <FileText className="w-12 h-12" style={{ color: MUTED }} />
                  <p className="text-sm" style={{ color: MUTED }}>Could not load certificate preview</p>
                  <motion.a
                    href={achievement.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2 rounded-xl text-sm font-bold"
                    style={{ background: accent + "20", color: accent }}
                  >
                    Open in new tab
                  </motion.a>
                </div>
                <motion.a
                  href={achievement.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
                >
                  <div
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white"
                    style={{ background: accent + "90", boxShadow: `0 4px 20px ${accent}50` }}
                  >
                    <ZoomIn className="w-4 h-4" /> View Full Size
                  </div>
                </motion.a>
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-8 w-full rounded-2xl"
              style={{ background: CARD, border: `1px dashed ${BORDER}` }}
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                style={{ background: accent + "15", border: `1px solid ${accent}30` }}
              >
                <achievement.icon className="w-10 h-10" style={{ color: accent }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: TEXT }}>{achievement.title}</h3>
              <p className="text-sm mb-1" style={{ color: MUTED }}>{achievement.issuer}</p>
              <p className="text-xs font-mono mb-6" style={{ color: accent }}>{achievement.date}</p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                style={{ background: accent + "15", color: accent, border: `0.5px solid ${accent}40` }}
              >
                <Sparkles className="w-3 h-3" />
                Certificate coming soon
              </div>
            </motion.div>
          )}
        </div>

        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ borderTop: `0.5px solid ${BORDER}` }}
        >
          <p className="text-xs" style={{ color: MUTED }}>
            {achievement.certificate ? "Click 'Open Full' to view in browser · Press Esc to close" : "Press Esc to close"}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: accent }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {achievement.issuer}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHOTO LIGHTBOX
// ═══════════════════════════════════════════════════════════════

function PhotoLightbox({ dark, onClose, accent, BG }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[600] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)", cursor: "pointer" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: "default" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-3xl"
          style={{
            background: `conic-gradient(${accent}, #8b5cf6, #ec4899, ${accent})`,
            borderRadius: "28px",
            padding: "3px",
            zIndex: 0,
          }}
        >
          <div style={{ width: "100%", height: "100%", borderRadius: "24px", background: "#000" }} />
        </motion.div>

        <motion.img
          src="/vinay.jpeg"
          alt="Vinay Raj V"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.05 }}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "88vw",
            maxHeight: "80vh",
            width: "auto",
            height: "auto",
            minWidth: "260px",
            borderRadius: "24px",
            objectFit: "contain",
            display: "block",
            boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accent}30`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold text-white"
          style={{
            transform: "translateX(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(12px)",
            border: `0.5px solid ${accent}40`,
            whiteSpace: "nowrap",
          }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
          Vinay Raj V
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        whileHover={{ scale: 1.12, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          color: "#fff",
          backdropFilter: "blur(8px)",
        }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-5 left-1/2 text-xs"
        style={{ transform: "translateX(-50%)", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}
      >
        Click anywhere or press Esc to close
      </motion.p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NEURAL CANVAS BACKGROUND
// ═══════════════════════════════════════════════════════════════

function NeuralCanvas({ dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const NODE_COUNT = Math.floor((W * H) / 18000);
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const nodes = nodesRef.current;
      const nodeColor = dark ? "rgba(34,211,238," : "rgba(99,102,241,";
      const lineColor = dark ? "rgba(139,92,246," : "rgba(99,102,241,";

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.02;
        const alpha = 0.3 + Math.sin(n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor + alpha + ")";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = lineColor + (0.12 * (1 - dist / 130)) + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [dark]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════

function CustomCursor({ dark }) {
  const pos = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(rafRef.current); };
  }, []);

  const accent = dark ? "#22d3ee" : "#6366f1";
  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
      <div ref={ringRef} className="fixed top-0 left-0 z-[9998] pointer-events-none w-9 h-9 rounded-full border" style={{ borderColor: accent + "60" }} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// TYPING HOOK
// ═══════════════════════════════════════════════════════════════

function useTyping(words, speed = 80, pause = 2200) {
  const [text, setText] = useState("");
  const state = useRef({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    const tick = () => {
      const { wi, ci, del } = state.current;
      const word = words[wi];
      if (!del && ci < word.length) {
        setText(word.slice(0, ci + 1));
        state.current.ci++;
      } else if (!del && ci === word.length) {
        state.current.del = true;
        setTimeout(tick, pause);
        return;
      } else if (del && ci > 0) {
        setText(word.slice(0, ci - 1));
        state.current.ci--;
      } else {
        state.current.del = false;
        state.current.wi = (wi + 1) % words.length;
        setText("");
        state.current.ci = 0;
        setTimeout(tick, speed);
        return;
      }
    };
    const id = setTimeout(tick, state.current.del ? 60 : speed);
    return () => clearTimeout(id);
  }, [text, words, speed, pause]);

  return text;
}

// ═══════════════════════════════════════════════════════════════
// COUNTER
// ═══════════════════════════════════════════════════════════════

function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const id = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(Math.floor(start));
          if (start >= target) clearInterval(id);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════
// SKILL CATEGORIES GRID
// ═══════════════════════════════════════════════════════════════

function SkillCategoriesGrid({ dark }) {
  const CARD_BG = dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.9)";
  const CARD_BORDER = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {skillCategories.map((cat, i) => {
        const theme = dark ? cat.dark : cat.light;
        return (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl p-6 relative overflow-hidden group"
            style={{
              background: CARD_BG,
              border: `0.5px solid ${CARD_BORDER}`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}40, transparent)` }}
            />
            <div
              className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: cat.accent }}
            />
            <p className="text-sm font-bold mb-4 relative z-10" style={{ color: cat.accent }}>
              {cat.title}
            </p>
            <div className="flex flex-wrap gap-2 relative z-10">
              {cat.tags.map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.07 }}
                  className="text-xs px-3 py-1.5 rounded-full font-medium cursor-default"
                  style={{
                    background: theme.bg,
                    color: theme.text,
                    border: `0.5px solid ${theme.border}`,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════

function ContactForm({ dark, CARD_BG, CARD_BORDER, TEXT, MUTED, ACCENT }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const inputStyle = {
    width: "100%",
    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    border: `0.5px solid ${CARD_BORDER}`,
    borderRadius: "14px",
    padding: "12px 16px",
    fontSize: "0.875rem",
    color: TEXT,
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "'DM Sans','Nunito',sans-serif",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    marginBottom: "6px",
    color: MUTED,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    // ── Replace this block with your real endpoint (Formspree, EmailJS, etc.) ──
    // Example Formspree:
    // const res = await fetch("https://formspree.io/f/YOUR_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
    // });
    // if (!res.ok) { setStatus("error"); return; }
    const res = await fetch("https://formspree.io/f/xaqaovoe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: form.name,
    email: form.email,
    message: form.message,
  }),
});

if (!res.ok) {
  setStatus("error");
  setLoading(false);
  return;
}

setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div
      className="rounded-3xl p-8 space-y-5"
      style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}` }}
    >
      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = ACCENT)}
          onBlur={e => (e.target.style.borderColor = CARD_BORDER)}
        />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          style={inputStyle}
          onFocus={e => (e.target.style.borderColor = ACCENT)}
          onBlur={e => (e.target.style.borderColor = CARD_BORDER)}
        />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={e => (e.target.style.borderColor = ACCENT)}
          onBlur={e => (e.target.style.borderColor = CARD_BORDER)}
        />
      </div>

      <motion.button
        whileHover={{ scale: status === "sending" ? 1 : 1.02, y: status === "sending" ? 0 : -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        disabled={status === "sending" || status === "sent"}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
        style={{
          background:
            status === "sent"
              ? "linear-gradient(135deg,#10b981,#059669)"
              : `linear-gradient(135deg, #10b981, #06b6d4)`,
          boxShadow: "0 8px 30px rgba(16,185,129,0.25)",
          opacity: status === "sending" ? 0.7 : 1,
          cursor: status === "sending" || status === "sent" ? "default" : "pointer",
        }}
      >
        {status === "sending" && (
          <motion.div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
        )}
        {status === "sent"  && "✓ Message Sent!"}
        {status === "error" && "Failed — Try Again"}
        {!status && <><Send className="w-4 h-4" /> Send Message</>}
      </motion.button>

      {status === "sent" && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-xs"
          style={{ color: "#34d399" }}
        >
          Thanks! I'll get back to you soon 🙌
        </motion.p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AI CHATBOT
// ═══════════════════════════════════════════════════════════════

function ChatBot({ dark, onClose }) {
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hi! I'm Vinay's AI assistant 🤖 Ask me anything about him — projects, skills, availability for internships, or anything else!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setError(null);
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);

    const history = msgs
      .filter((m, idx) => !(m.role === "assistant" && idx === 0))
      .map(m => ({ role: m.role, content: m.text }));

    history.push({ role: "user", content: userMsg });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      setMsgs(m => [...m, { role: "assistant", text: data.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Couldn't reach the AI. Please try again in a moment.");
      setMsgs(m => [...m, { role: "assistant", text: "Oops! Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const bg = dark ? "#0f172a" : "#ffffff";
  const border = dark ? "rgba(34,211,238,0.2)" : "rgba(99,102,241,0.2)";
  const accent = dark ? "#22d3ee" : "#6366f1";
  const userBg = dark ? "rgba(34,211,238,0.15)" : "rgba(99,102,241,0.12)";
  const aiBg = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const textColor = dark ? "#e2e8f0" : "#1e293b";
  const mutedColor = dark ? "#64748b" : "#94a3b8";
  const inputBg = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      style={{ background: bg, border: `1px solid ${border}`, boxShadow: `0 25px 60px rgba(0,0,0,0.4)` }}
      className="fixed bottom-28 right-6 w-80 rounded-3xl z-[200] overflow-hidden flex flex-col"
    >
      <div style={{ borderBottom: `1px solid ${border}`, background: `linear-gradient(135deg, ${accent}22, transparent)` }} className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: accent + "30" }}>🤖</div>
          <div>
            <p className="text-sm font-bold" style={{ color: textColor }}>Ask About Vinay</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-xs" style={{ color: mutedColor }}>AI-powered · Always online</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg transition-colors" style={{ color: mutedColor }}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
              style={{
                background: m.role === "user" ? userBg : aiBg,
                color: textColor,
                border: `0.5px solid ${border}`,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 flex gap-1" style={{ background: aiBg, border: `0.5px solid ${border}` }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {msgs.length === 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {["What are his skills?", "Is he open to internships?", "Tell me about ClassBridge AI"].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs px-2.5 py-1 rounded-full font-medium transition-all hover:scale-105"
              style={{ background: accent + "18", color: accent, border: `0.5px solid ${accent}40` }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div style={{ borderTop: `1px solid ${border}` }} className="p-3 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask anything about Vinay…"
          className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
          style={{ background: inputBg, color: textColor, border: `0.5px solid ${border}` }}
        />
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={send}
          disabled={loading || !input.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity"
          style={{ background: accent }}
        >
          <Send className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION WRAPPER
// ═══════════════════════════════════════════════════════════════

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative z-10 ${className}`}>
      {children}
    </section>
  );
}

function SectionHead({ eyebrow, title, gradient }) {
  return (
    <div className="text-center mb-20">
      <motion.p initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: gradient[0] }}>
        {eyebrow}
      </motion.p>
      <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
        className="text-4xl md:text-6xl font-black" style={{ fontFamily:"'Bebas Neue', 'Oswald', sans-serif", background:`linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        {title}
      </motion.h2>
      <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ delay:0.3, duration:0.6 }}
        className="h-0.5 w-20 mx-auto mt-5 rounded-full" style={{ background:`linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})` }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [photoOpen, setPhotoOpen] = useState(false);
  const typed = useTyping(TYPING_ROLES);
  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0,1], ["0%","100%"]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(e => e.forEach(en => { if (en.isIntersecting) setActiveNav(en.target.id); }), { threshold: 0.4 });
    NAV.forEach(s => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.tags.includes(filter));

  const BG = dark ? "#020617" : "#f8fafc";
  const TEXT = dark ? "#f1f5f9" : "#0f172a";
  const MUTED = dark ? "#64748b" : "#94a3b8";
  const CARD_BG = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const CARD_BORDER = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const ACCENT = dark ? "#22d3ee" : "#6366f1";
  const NAV_BG = dark ? "rgba(2,6,23,0.85)" : "rgba(248,250,252,0.85)";

  return (
    <div style={{ background: BG, color: TEXT, cursor: "none", fontFamily:"'DM Sans','Nunito',sans-serif", minHeight:"100vh", overflowX:"hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
        html { scroll-behavior: smooth; }
        *,*::before,*::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; border-radius: 2px; }
        ::selection { background: ${ACCENT}40; }
        .glow { box-shadow: 0 0 30px ${ACCENT}30; }
      `}</style>

      <NeuralCanvas dark={dark} />
      <CustomCursor dark={dark} />

      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 h-[3px] z-[100]" style={{ width: progressW, background: `linear-gradient(90deg, ${ACCENT}, #8b5cf6, #ec4899)` }} />

      {/* ── NAVBAR ── */}
      <motion.nav initial={{ y:-60, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.6 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
        style={{ background: NAV_BG, borderBottom: `0.5px solid ${CARD_BORDER}` }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <motion.a
            href="https://my-portfolio-nmj4.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale:1.05 }}
            className="text-xl font-black tracking-tight"
            style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.05em", color: ACCENT, textDecoration: "none" }}
          >
            VINAY RAJ V
          </motion.a>
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(s => (
              <motion.a key={s} href={`#${s}`} whileHover={{ y:-2 }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 capitalize"
                style={{ color: activeNav === s ? ACCENT : MUTED, background: activeNav === s ? ACCENT + "15" : "transparent", border: activeNav === s ? `0.5px solid ${ACCENT}40` : "0.5px solid transparent" }}>
                {s}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} onClick={() => setSound(!sound)}
              className="p-2 rounded-xl" style={{ color: MUTED, border: `0.5px solid ${CARD_BORDER}`, background: CARD_BG }}>
              {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>
            <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} onClick={() => setDark(!dark)}
              className="p-2 rounded-xl" style={{ color: MUTED, border: `0.5px solid ${CARD_BORDER}`, background: CARD_BG }}>
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.a href="/resume.pdf" download whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`, boxShadow: `0 4px 20px ${ACCENT}40` }}>
              <Download className="w-3.5 h-3.5" /> Resume
            </motion.a>
            <button className="lg:hidden p-2" style={{ color: MUTED }} onClick={() => setMobileMenuOpen(v=>!v)}>
              <div className="w-5 space-y-1">
                <span className={`block h-0.5 transition-all ${mobileMenuOpen?"rotate-45 translate-y-1.5":""}`} style={{ background: MUTED }} />
                <span className={`block h-0.5 transition-all ${mobileMenuOpen?"opacity-0":""}`} style={{ background: MUTED }} />
                <span className={`block h-0.5 transition-all ${mobileMenuOpen?"-rotate-45 -translate-y-1.5":""}`} style={{ background: MUTED }} />
              </div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
              className="lg:hidden overflow-hidden px-6 pb-4 flex flex-wrap gap-2" style={{ borderTop:`0.5px solid ${CARD_BORDER}` }}>
              {NAV.map(s => (
                <a key={s} href={`#${s}`} onClick={()=>setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider capitalize"
                  style={{ color: ACCENT, background: ACCENT + "15", border:`0.5px solid ${ACCENT}30` }}>{s}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <Section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:180, delay:0.2 }} className="relative mb-8">
          <motion.div animate={{ rotate:360 }} transition={{ duration:15, repeat:Infinity, ease:"linear" }}
            className="absolute -inset-3 rounded-full" style={{ background:`conic-gradient(${ACCENT}, #8b5cf6, #ec4899, ${ACCENT})`, padding:"3px" }}>
            <div className="w-full h-full rounded-full" style={{ background: BG }} />
          </motion.div>

          <motion.div
            onClick={() => setPhotoOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            title="Click to view full photo"
            style={{
              position: "relative",
              zIndex: 1,
              width: "112px",
              height: "112px",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src="/vinay.jpeg"
              alt="Vinay"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ZoomIn style={{ color: "#fff", width: "22px", height: "22px" }} />
            </motion.div>
          </motion.div>

          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 animate-pulse" style={{ background:"#22c55e", borderColor: BG, zIndex:2 }} />
        </motion.div>

        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          className="flex items-center gap-1.5 mb-4 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: MUTED }}>
          <MapPin className="w-3 h-3" style={{ color: ACCENT }} /> Shivamogga, Karnataka, India
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.9 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-3 leading-none"
          style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.02em" }}>
          <span style={{ color: TEXT }}>VINAY </span>
          <span style={{ background:`linear-gradient(135deg, ${ACCENT}, #8b5cf6, #ec4899)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>RAJ V</span>
        </motion.h1>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
          className="flex items-center gap-2 mb-6 h-10" style={{ fontFamily:"'JetBrains Mono',monospace" }}>
          <span className="text-lg md:text-2xl font-semibold" style={{ color: ACCENT }}>&gt; {typed}</span>
          <motion.span animate={{ opacity:[1,0] }} transition={{ duration:0.5, repeat:Infinity }}
            className="w-0.5 h-7 rounded-full inline-block" style={{ background: ACCENT }} />
        </motion.div>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
          className="text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: MUTED }}>
          6th Semester AIML student crafting intelligent systems that bridge<br />cutting-edge research with real-world impact.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-16">
          <motion.a href="#projects" whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.97 }}
            className="px-8 py-3.5 rounded-2xl text-sm font-bold text-white flex items-center gap-2"
            style={{ background:`linear-gradient(135deg, ${ACCENT}, #8b5cf6)`, boxShadow:`0 8px 30px ${ACCENT}40` }}>
            <Zap className="w-4 h-4" /> View My Work
          </motion.a>
          <motion.a href="#contact" whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.97 }}
            className="px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2"
            style={{ background: CARD_BG, border:`1px solid ${CARD_BORDER}`, color: TEXT }}>
            <Mail className="w-4 h-4" /> Say Hello
          </motion.a>
          <motion.button whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.97 }}
            onClick={() => setChatOpen(true)}
            className="px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2"
            style={{ background: "#8b5cf620", border:`1px solid #8b5cf640`, color:"#a78bfa" }}>
            <MessageCircle className="w-4 h-4" /> Ask AI About Me
          </motion.button>
        </motion.div>

        <motion.a href="#about" animate={{ y:[0,8,0] }} transition={{ duration:1.8, repeat:Infinity }}
          style={{ color: MUTED }}><ChevronDown className="w-5 h-5" /></motion.a>
      </Section>

      {/* ── ABOUT ── */}
      <Section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Who I Am" title="About Me" gradient={[ACCENT, "#8b5cf6"]} />
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
              className="space-y-5 leading-relaxed" style={{ color: MUTED, fontSize:"1.05rem" }}>
              <p>Passionate AIML student from Shivamogga, Karnataka, currently in my 6th semester diving deep into Machine Learning, Neural Networks, and modern AI systems.</p>
              <p>I love building intelligent systems — whether it's NLP pipelines, computer vision models, or full-stack ML apps. Always exploring generative AI and MLOps.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Open to Internships", "Shivamogga, KA", "Freelance Available", "6th Semester"].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: ACCENT + "15", border:`0.5px solid ${ACCENT}40`, color: ACCENT }}>{t}</span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val:4,   suffix:"+", label:"Projects Built",  icon:"🚀" },
                { val:8,   suffix:"+", label:"Technologies",    icon:"⚙️" },
                { val:500, suffix:"+", label:"GitHub Commits",  icon:"💻" },
                { val:7,   suffix:"+", label:"Certifications",  icon:"🏆" },
              ].map((s,i) => (
                <motion.div key={s.label} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                  whileHover={{ y:-5 }} className="rounded-2xl p-6 text-center"
                  style={{ background: CARD_BG, border:`0.5px solid ${CARD_BORDER}` }}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-black mb-1" style={{ fontFamily:"'Bebas Neue',sans-serif", color: ACCENT }}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-xs" style={{ color: MUTED }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="What I've Built" title="Featured Projects" gradient={["#8b5cf6","#ec4899"]} />
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map(tag => (
              <motion.button key={tag} onClick={() => setFilter(tag)} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                className="px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all"
                style={{ background: filter === tag ? `linear-gradient(135deg, #8b5cf6, #ec4899)` : CARD_BG, color: filter === tag ? "#fff" : MUTED, border:`0.5px solid ${filter===tag?"transparent":CARD_BORDER}` }}>
                {tag === "All" && <Filter className="w-3 h-3" />} {tag}
              </motion.button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, idx) => (
                <motion.div key={p.id} layout initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.9 }}
                  transition={{ delay: idx * 0.08 }} whileHover={{ y:-8 }}
                  className="rounded-3xl p-8 group relative overflow-hidden"
                  style={{ background: CARD_BG, border:`0.5px solid ${CARD_BORDER}` }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background:`linear-gradient(90deg, ${p.gradient[0]}, ${p.gradient[1]})` }} />
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" style={{ background: p.gradient[0] + "20" }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background:`linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}>
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: MUTED }}>
                        <Star className="w-3 h-3" style={{ color:"#fbbf24" }} /> {p.stars}
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs" style={{ background: CARD_BG, border:`0.5px solid ${CARD_BORDER}` }}>{p.year}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 transition-colors" style={{ color: TEXT }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: MUTED }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tags.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{ background: p.gradient[0] + "20", color: p.gradient[0], border:`0.5px solid ${p.gradient[0]}40` }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.a href={p.github} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                        style={{ background:`linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}>
                        <Github className="w-4 h-4" /> View on GitHub
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="What I Work With" title="Tech Stack" gradient={["#ec4899","#f97316"]} />
          <SkillCategoriesGrid dark={dark} />
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHead eyebrow="My Journey" title="Education" gradient={["#06b6d4","#3b82f6"]} />
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-3 md:left-5 top-2 bottom-2 w-px" style={{ background:`linear-gradient(to bottom, ${ACCENT}80, transparent)` }} />
            {education.map((e, i) => (
              <motion.div key={i} initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.15 }}
                className="relative mb-10">
                <div className="absolute -left-5 md:-left-7 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center text-xs" style={{ background: BG, borderColor: ACCENT }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                </div>
                <div className="rounded-2xl p-6" style={{ background: CARD_BG, border:`0.5px solid ${CARD_BORDER}` }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{e.icon}</span>
                      <h3 className="font-bold" style={{ color: TEXT }}>{e.degree}</h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5"
                      style={{ background: ACCENT + "15", color: ACCENT, border:`0.5px solid ${ACCENT}30` }}>
                      <Calendar className="w-3 h-3" /> {e.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#a78bfa" }}>{e.school}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: MUTED }}>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.location}</span>
                    <span className="font-bold" style={{ color:"#34d399" }}>{e.grade}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── ACHIEVEMENTS ── */}
      <Section id="achievements" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Recognition" title="Achievements" gradient={["#f59e0b","#f97316"]} />

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-xs mb-10 flex items-center justify-center gap-1.5"
            style={{ color: MUTED }}
          >
            <Eye className="w-3.5 h-3.5" /> Click any card to view the certificate
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, scale:0.85 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.1 }}
                whileHover={{ y:-8, scale:1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCert(a)}
                className="rounded-3xl p-6 text-center group relative overflow-hidden"
                style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, cursor: "pointer" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${a.accent}18, transparent 70%)` }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${a.accent}, transparent)` }}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: a.accent + "20", border:`0.5px solid ${a.accent}40` }}>
                    <a.icon className="w-6 h-6" style={{ color: a.accent }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: TEXT }}>{a.title}</h3>
                  <p className="text-xs mb-1" style={{ color: MUTED }}>{a.issuer}</p>
                  <p className="text-xs font-mono mb-3" style={{ color: a.accent }}>{a.date}</p>
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                    style={{
                      background: a.certificate ? a.accent + "20" : "rgba(100,116,139,0.15)",
                      color: a.certificate ? a.accent : MUTED,
                      border: `0.5px solid ${a.certificate ? a.accent + "40" : "rgba(100,116,139,0.3)"}`,
                    }}
                  >
                    {a.certificate
                      ? <><Eye className="w-3 h-3" /> View Certificate</>
                      : <><Sparkles className="w-3 h-3" /> Coming Soon</>
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow="Get In Touch" title="Let's Connect" gradient={["#10b981","#06b6d4"]} />
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — copy + social links */}
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
              <h3 className="text-3xl font-black mb-4 leading-tight" style={{ fontFamily:"'Bebas Neue',sans-serif", color: TEXT }}>
                Open to<br />
                <span style={{ background:`linear-gradient(135deg, #10b981, #06b6d4)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  opportunities
                </span>
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: MUTED }}>
                Looking for internships, ML freelance work, or collaborations.<br />
                Have something cool in mind? I'd love to hear about it.
              </p>

              <div className="space-y-3">
                {[
                  { icon:Github,       label:"GitHub",    sub:"github.com/vinayrajv2005",          href:"https://github.com/vinayrajv2005",                   color:"#6b7280" },
                  { icon:Linkedin,     label:"LinkedIn",  sub:"vinay-raj-v",                       href:"https://www.linkedin.com/in/vinay-raj-v-b89963341/", color:"#0ea5e9" },
                  { icon:Mail,         label:"Email",     sub:"vinayrajv33@gmail.com",             href:"mailto:vinayrajv33@gmail.com",                        color:"#ef4444" },
                  { icon:ExternalLink, label:"Portfolio", sub:"my-portfolio-nmj4.vercel.app",      href:"https://my-portfolio-nmj4.vercel.app/",               color:"#8b5cf6" },
                ].map(({ icon:Icon, label, sub, href, color }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity:0, x:-20 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ x:6, scale:1.01 }}
                    whileTap={{ scale:0.98 }}
                    className="flex items-center gap-4 p-4 rounded-2xl group transition-all"
                    style={{ background: CARD_BG, border:`0.5px solid ${CARD_BORDER}`, textDecoration:"none" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: color + "20", border:`0.5px solid ${color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold" style={{ color: TEXT }}>{label}</p>
                      <p className="text-xs truncate" style={{ color: MUTED }}>{sub}</p>
                    </div>
                    <ExternalLink
                      className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: MUTED }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right — contact form */}
            <motion.div
              initial={{ opacity:0, x:30 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.6, delay:0.1 }}
            >
              <ContactForm
                dark={dark}
                CARD_BG={CARD_BG}
                CARD_BORDER={CARD_BORDER}
                TEXT={TEXT}
                MUTED={MUTED}
                ACCENT={ACCENT}
              />
            </motion.div>

          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 text-center relative z-10" style={{ borderColor: CARD_BORDER }}>
        <p className="text-xs" style={{ color: MUTED }}>
          © 2026 <span style={{ color: ACCENT, fontWeight:700 }}>Vinay Raj V</span> · Shivamogga, Karnataka
          <span className="mx-2">·</span>
          <a
            href="https://my-portfolio-nmj4.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: ACCENT, fontWeight: 700, textDecoration: "none" }}
          >
            my-portfolio-nmj4.vercel.app
          </a>
          <span className="mx-2">·</span>
          Crafted with ♥ &amp; lots of ☕
        </p>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <motion.button whileHover={{ scale:1.12 }} whileTap={{ scale:0.92 }}
        onClick={() => setChatOpen(v=>!v)}
        className="fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl"
        style={{ background:`linear-gradient(135deg, #8b5cf6, #6366f1)`, boxShadow:"0 8px 32px rgba(139,92,246,0.5)" }}>
        {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.5 }}
            whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            className="fixed bottom-6 left-6 z-[150] w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: CARD_BG, border:`0.5px solid ${CARD_BORDER}`, color: ACCENT }}>
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── AI CHATBOT ── */}
      <AnimatePresence>
        {chatOpen && <ChatBot dark={dark} onClose={() => setChatOpen(false)} />}
      </AnimatePresence>

      {/* ── CERTIFICATE MODAL ── */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            achievement={selectedCert}
            dark={dark}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>

      {/* ── PHOTO LIGHTBOX ── */}
      <AnimatePresence>
        {photoOpen && (
          <PhotoLightbox
            dark={dark}
            accent={ACCENT}
            BG={BG}
            onClose={() => setPhotoOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
