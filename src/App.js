import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Mail, Github, Linkedin, ExternalLink, Download, Code2, Award,
  ChevronDown, MapPin, Calendar, Trophy, Cpu, Moon, Sun,
  MessageCircle, X, Send, ArrowUp, Sparkles, Zap,
  Brain, Filter, ZoomIn, FileText, Eye, Shield
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
  {
    id: 1,
    title: "ClassBridge AI (Smart Classroom with Real-Time Translation & AI Notes)",
    desc: "AI-powered smart classroom system that supports real-time translation, live subtitles, automatic note generation, and YouTube lecture processing using NLP, speech recognition, and AI-driven summarization.",
    tags: ["Python", "Flask", "WebRTC", "Natural Language Processing", "Deep Learning", "Speech Recognition", "Whisper", "HuggingFace Transformers", "Real-Time Communication", "Socket.IO", "Multilingual AI", "YouTube Data Processing", "AI Summarization"],
    gradient: ["#06B6D4", "#3B82F6"],
    github: "https://github.com/vinayrajv2005/smart-classroom-ai",
    year: "2026",
  },
  {
    id: 2,
    title: "Fitness Guru – AI Fitness Trainer",
    desc: "Fitness Guru is an AI-powered fitness system that uses pose estimation to detect exercises, analyze posture, and provide real-time feedback with interactive performance tracking dashboards.",
    tags: ["Computer Vision", "ML", "React", "Flask", "MediaPipe", "Chart.js"],
    gradient: ["#8B5CF6", "#EC4899"],
    github: "https://github.com/vinayrajv2005/ai-fitness-coach",
    year: "2025",
  },
  {
    id: 3,
    title: "NEURON — RAG Document Chatbot",
    desc: "AI-powered RAG chatbot that lets users upload multiple PDFs and chat with them intelligently. Uses local HuggingFace embeddings, FAISS vector search, and a local Flan-T5 LLM — no API key required.",
    tags: ["Python", "FastAPI", "HuggingFace", "Flan-T5", "RAG", "LangChain", "FAISS", "Vector Database", "PDF Processing", "Local LLM", "Transformers", "AI Chatbot", "Document QA"],
    gradient: ["#10B981", "#06B6D4"],
    github: "https://github.com/vinayrajv2005/neuron-rag",
    year: "2026",
  },
  {
    id: 4,
    title: "ProteinAI — Structure & Mutation Lab",
    desc: "Full-stack bioinformatics web app combining a BiLSTM for secondary structure prediction and an MLP for pathogenicity classification. Features an interactive Three.js 3D molecular viewer and Chart.js analytics.",
    tags: ["Python", "PyTorch", "BiLSTM", "Flask", "Three.js", "Chart.js", "Bioinformatics", "Deep Learning", "BLOSUM62", "Healthcare AI", "Full-Stack"],
    gradient: ["#F59E0B", "#F97316"],
    github: "https://github.com/vinayrajv2005/protein-structure-predictor",
    year: "2026",
  },
  {
    id: 5,
    title: "LexSimplify — Legal Document Intelligence Platform",
    desc: "Full-stack NLP web app that transforms dense legal documents into plain language using a T5 transformer. Supports PDF, DOCX, and scanned image input via Tesseract OCR with multilingual translation into 15+ languages.",
    tags: ["Python", "Flask", "T5 Transformer", "NLP", "HuggingFace", "Tesseract OCR", "Deep Learning", "Legal AI", "Multilingual", "Text Simplification", "PDF Processing", "Full-Stack"],
    gradient: ["#7c3aed", "#f59e0b"],
    github: "https://github.com/vinayrajv2005/legal-simplifier",
    year: "2026",
  },
];

const education = [
  { degree: "B.E. in Artificial Intelligence & ML", school: "Jawaharlal Nehru National College of Engineering", location: "Shivamogga, Karnataka", period: "2023–2027", grade: "8.66 CGPA", icon: "🎓" },
  { degree: "Pre-University (12th Grade)", school: "ACHARYA Pre University College", location: "Shivamogga, Karnataka", period: "2020–2022", grade: "84%", icon: "📚" },
];

const achievements = [
  { title: "GenAI for Everyone", issuer: "Coursera · Starweaver", date: "Mar 2025", icon: Sparkles, accent: "#0EA5E9", certificate: "https://coursera.org/verify/X1XANHJI4QND" },
  { title: "Implementing AI With Amazon ML", issuer: "Infosys Springboard", date: "Mar 2025", icon: Cpu, accent: "#F59E0B", certificate: "https://drive.google.com/file/d/1n03YiUahv4bo6v5rek3yTvRuXop6_Lu-/preview" },
  { title: "Python & Machine Learning Bootcamp", issuer: "Corizo · IIT Bombay Mood Indigo", date: "Jul 2025", icon: Trophy, accent: "#8B5CF6", certificate: "https://drive.google.com/file/d/1kkfU9Ew-5v7NdZMRHt5iOyOBK3MVwZ9J/preview" },
  { title: "The MERN Stack & Full Stack Dev", issuer: "Infosys Springboard", date: "Jan 2025", icon: Code2, accent: "#10B981", certificate: "https://drive.google.com/file/d/1c3-ViO-oQdAAtlgQJcYv5qM2skE5g2kn/preview" },
  { title: "Artificial Intelligence: Types of AI", issuer: "Infosys Springboard", date: "Feb 2025", icon: Brain, accent: "#EC4899", certificate: "https://drive.google.com/file/d/1si1-WTdZesKEMZ5EdasZPb_lbZm4JQc0/preview" },
  { title: "Python Data Structures", issuer: "Great Learning Academy", date: "Dec 2024", icon: Award, accent: "#06B6D4", certificate: "https://www.mygreatlearning.com/certificate/WXXJFQQZ" },
  { title: "SHE Secure 2025 — National Hackathon", issuer: "JNNCE · Hack2Skill", date: "2025", icon: Trophy, accent: "#F97316", certificate: "https://drive.google.com/file/d/1rxMITBfEQtFNiwmmaC6JelrMJy9o60mg/preview" },
];

const patents = [
  {
    id: "6497347",
    title: "AI Based Water Quality Checking Device",
    authority: "Issued by: UK Intellectual Property Office",
    type: "Certificate of Registration for a UK Design",
    registrationDate: "06 January 2026",
    grantDate: "21 January 2026",
    classification: "Class 10 · Subclass 05 · Instruments, Apparatus and Devices for Checking, Security or Testing",
    inventors: [
      "Shaziya Banu Sharfudden",
      "Dr. Pallavi Gundlupet Balakrishna",
      "Dr. Ashwini Janagal Padmanabha",
      "Khushan Gowda Gowda Halesh",
      "Vinay Raj Venkatesha",
      "Mohammed Ibrahim",
      "Jeevan Hatturmatha Girish",
    ],
    description: "An AI-powered device designed to check and assess water quality. The design is registered under the Registered Designs Act 1949 with the UK Intellectual Property Office, covering instruments and apparatus for checking, security, or testing.",
    accent: "#0EA5E9",
    flag: "🇬🇧",
    certificateUrl: "https://drive.google.com/file/d/1G9K8R7O80Vy4Y_uu4cENl8YcYHygA6ju/preview",
  },
];

const NAV = ["home", "about", "projects", "patents", "skills", "education", "achievements", "contact"];

// ═══════════════════════════════════════════════════════════════
// DETECT TOUCH DEVICE
// ═══════════════════════════════════════════════════════════════
function isTouchDevice() {
  return (typeof window !== "undefined") && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}

// ═══════════════════════════════════════════════════════════════
// GRADIENT TEXT
// ═══════════════════════════════════════════════════════════════
function GradientText({ dark, from, to, solidColor, children, style = {}, className = "" }) {
  if (dark) {
    return (
      <span className={className} style={{ background: `linear-gradient(135deg, ${from}, ${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline", ...style }}>
        {children}
      </span>
    );
  }
  return (
    <span className={className} style={{ color: solidColor || from, display: "inline", ...style }}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// CERTIFICATE MODAL
// ═══════════════════════════════════════════════════════════════
function CertificateModal({ achievement, dark, onClose }) {
  const BG     = dark ? "rgba(2,6,23,0.97)"     : "rgba(255,255,255,0.98)";
  const CARD   = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const BORDER = dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.12)";
  const TEXT   = dark ? "#f1f5f9"                : "#0f172a";
  const MUTED  = dark ? "#64748b"                : "#64748b";
  const accent = achievement.accent;

  const isEmbeddable =
    achievement.certificate?.includes("drive.google.com") ||
    achievement.certificate?.toLowerCase().includes(".pdf") ||
    achievement.certificate?.toLowerCase().includes("preview");

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center p-3 md:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden flex flex-col"
        style={{ background: BG, border: `1px solid ${accent}40`, boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20`, maxHeight: "92vh" }}>
        <div className="h-1 w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80, transparent)` }} />
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: `0.5px solid ${BORDER}`, background: `linear-gradient(135deg, ${accent}10, transparent)` }}>
          <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accent + "25", border: `0.5px solid ${accent}50` }}>
              <achievement.icon className="w-4 h-4" style={{ color: accent }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold leading-tight truncate" style={{ color: TEXT }}>{achievement.title}</p>
              <p className="text-xs truncate" style={{ color: MUTED }}>{achievement.issuer} · {achievement.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {achievement.certificate && (
              <motion.a href={achievement.certificate} target="_blank" rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: accent + "20", color: accent, border: `0.5px solid ${accent}40` }}>
                <ExternalLink className="w-3 h-3" /> Open
              </motion.a>
            )}
            <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: CARD, border: `0.5px solid ${BORDER}`, color: MUTED }}>
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center" style={{ minHeight: "250px" }}>
          {achievement.certificate ? (
            isEmbeddable ? (
              <iframe src={achievement.certificate} className="w-full rounded-2xl"
                style={{ height: "420px", border: `0.5px solid ${BORDER}` }}
                title={achievement.title} allow="autoplay" />
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="relative group w-full">
                <img src={achievement.certificate} alt={achievement.title}
                  className="w-full rounded-2xl object-contain"
                  style={{ maxHeight: "420px", border: `1px solid ${accent}30` }}
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                <div className="w-full rounded-2xl items-center justify-center flex-col gap-3 py-16"
                  style={{ display: "none", background: CARD, border: `1px dashed ${BORDER}` }}>
                  <FileText className="w-12 h-12" style={{ color: MUTED }} />
                  <p className="text-sm" style={{ color: MUTED }}>Could not load certificate preview</p>
                  <motion.a href={achievement.certificate} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl text-sm font-bold"
                    style={{ background: accent + "20", color: accent }}>Open in new tab</motion.a>
                </div>
              </motion.div>
            )
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-8 w-full rounded-2xl"
              style={{ background: CARD, border: `1px dashed ${BORDER}` }}>
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
                style={{ background: accent + "15", border: `1px solid ${accent}30` }}>
                <achievement.icon className="w-8 h-8" style={{ color: accent }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: TEXT }}>{achievement.title}</h3>
              <p className="text-sm mb-1" style={{ color: MUTED }}>{achievement.issuer}</p>
              <p className="text-xs font-mono" style={{ color: accent }}>{achievement.date}</p>
            </motion.div>
          )}
        </div>
        <div className="px-4 py-2 flex-shrink-0 flex items-center justify-between" style={{ borderTop: `0.5px solid ${BORDER}` }}>
          <p className="text-xs" style={{ color: MUTED }}>Tap outside to close</p>
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
// PATENT MODAL
// ═══════════════════════════════════════════════════════════════
function PatentModal({ patent, dark, onClose }) {
  const BG     = dark ? "rgba(2,6,23,0.97)"     : "rgba(255,255,255,0.98)";
  const BORDER = dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.12)";
  const TEXT   = dark ? "#f1f5f9"                : "#0f172a";
  const MUTED  = dark ? "#64748b"                : "#64748b";
  const CARD   = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const accent = patent.accent;

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center p-3 md:p-8"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col"
        style={{ background: BG, border: `1px solid ${accent}50`, boxShadow: `0 40px 100px rgba(0,0,0,0.6)`, maxHeight: "92vh" }}>
        <div className="h-1.5 w-full flex-shrink-0" style={{ background: "linear-gradient(90deg,#0EA5E9,#6366f1,#8b5cf6)" }} />
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: `0.5px solid ${BORDER}`, background: `linear-gradient(135deg, ${accent}10, transparent)` }}>
          <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: accent + "20", border: `1px solid ${accent}40` }}>{patent.flag}</div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5 truncate" style={{ color: accent }}>UK Design Certificate · #{patent.id}</p>
              <p className="text-xs font-bold leading-tight truncate" style={{ color: TEXT }}>{patent.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {patent.certificateUrl && (
              <motion.a href={patent.certificateUrl} target="_blank" rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: accent + "20", color: accent, border: `0.5px solid ${accent}40` }}>
                <ExternalLink className="w-3 h-3" /> Open PDF
              </motion.a>
            )}
            <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: CARD, border: `0.5px solid ${BORDER}`, color: MUTED }}>
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-4" style={{ minHeight: "400px" }}>
          <iframe src={patent.certificateUrl} className="w-full rounded-2xl"
            style={{ height: "100%", minHeight: "420px", border: `1px solid ${accent}30`, background: "#fff" }}
            title="UK Design Certificate" />
        </div>
        <div className="px-4 py-2 flex-shrink-0 flex items-center justify-between" style={{ borderTop: `0.5px solid ${BORDER}` }}>
          <p className="text-xs" style={{ color: MUTED }}>Tap outside to close</p>
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: accent }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            {patent.authority}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PHOTO LIGHTBOX
// ═══════════════════════════════════════════════════════════════
function PhotoLightbox({ dark, onClose, accent }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[600] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)", cursor: "pointer" }}>
      <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="relative" onClick={(e) => e.stopPropagation()} style={{ cursor: "default" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-3xl"
          style={{ background: `conic-gradient(${accent}, #8b5cf6, #ec4899, ${accent})`, borderRadius: "28px", padding: "3px", zIndex: 0 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "24px", background: "#000" }} />
        </motion.div>
        <motion.img src="/vinay.jpeg" alt="Vinay Raj V"
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.05 }}
          style={{ position: "relative", zIndex: 1, maxWidth: "85vw", maxHeight: "75vh", width: "auto", height: "auto",
            minWidth: "220px", borderRadius: "24px", objectFit: "contain", display: "block",
            boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accent}30` }} />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold text-white"
          style={{ transform: "translateX(-50%)", zIndex: 2, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(12px)", border: `0.5px solid ${accent}40`, whiteSpace: "nowrap" }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
          Vinay Raj V
        </motion.div>
      </motion.div>
      <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }} whileTap={{ scale: 0.9 }}
        onClick={onClose} className="absolute top-5 right-5 w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)" }}>
        <X className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// NEURAL CANVAS — reduced particle count on mobile
// ═══════════════════════════════════════════════════════════════
function NeuralCanvas({ dark }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);
  const isTouch = isTouchDevice();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    // Reduce node count on mobile for performance
    const divisor = isTouch ? 40000 : 18000;
    const NODE_COUNT = Math.min(Math.floor((W * H) / divisor), isTouch ? 30 : 80);
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1, pulse: Math.random() * Math.PI * 2,
    }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
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
        const baseAlpha = dark ? 0.3 : 0.15;
        const alpha = baseAlpha + Math.sin(n.pulse) * 0.08;
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
            const lineAlpha = dark ? 0.12 : 0.06;
            ctx.strokeStyle = lineColor + (lineAlpha * (1 - dist / 130)) + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [dark, isTouch]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ═══════════════════════════════════════════════════════════════
// CUSTOM CURSOR — desktop only
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
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
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
      <div ref={dotRef} className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
      <div ref={ringRef} className="fixed top-0 left-0 z-[9998] pointer-events-none w-9 h-9 rounded-full border"
        style={{ borderColor: accent + "60" }} />
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
      if (!del && ci < word.length) { setText(word.slice(0, ci + 1)); state.current.ci++; }
      else if (!del && ci === word.length) { state.current.del = true; setTimeout(tick, pause); return; }
      else if (del && ci > 0) { setText(word.slice(0, ci - 1)); state.current.ci--; }
      else { state.current.del = false; state.current.wi = (wi + 1) % words.length; setText(""); state.current.ci = 0; setTimeout(tick, speed); return; }
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
  const CARD_BG     = dark ? "rgba(255,255,255,0.03)" : "#ffffff";
  const CARD_BORDER = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const CARD_SHADOW = dark ? "none" : "0 2px 16px rgba(0,0,0,0.06)";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {skillCategories.map((cat, i) => {
        const theme = dark ? cat.dark : cat.light;
        return (
          <motion.div key={cat.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }} whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl p-6 relative overflow-hidden group"
            style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, backdropFilter: "blur(8px)", boxShadow: CARD_SHADOW }}>
            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}40, transparent)` }} />
            <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: cat.accent }} />
            <p className="text-sm font-bold mb-4 relative z-10" style={{ color: cat.accent }}>{cat.title}</p>
            <div className="flex flex-wrap gap-2 relative z-10">
              {cat.tags.map(tag => (
                <span key={tag}
                  className="text-xs px-3 py-1.5 rounded-full font-medium cursor-default"
                  style={{ background: theme.bg, color: theme.text, border: `0.5px solid ${theme.border}` }}>
                  {tag}
                </span>
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
  const [status, setStatus] = useState(null);

  const inputStyle = {
    width: "100%",
    background: dark ? "rgba(255,255,255,0.05)" : "#f8fafc",
    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"}`,
    borderRadius: "14px", padding: "12px 16px", fontSize: "0.875rem", color: TEXT,
    outline: "none", transition: "border-color 0.2s", fontFamily: "'DM Sans','Nunito',sans-serif",
  };
  const labelStyle = {
    display: "block", fontSize: "0.75rem", fontWeight: 700, marginBottom: "6px",
    color: MUTED, letterSpacing: "0.05em", textTransform: "uppercase",
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    const res = await fetch("https://formspree.io/f/xaqaovoe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
    });
    if (!res.ok) { setStatus("error"); return; }
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div className="rounded-3xl p-6 space-y-4"
      style={{ background: CARD_BG, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`, boxShadow: dark ? "none" : "0 4px 24px rgba(0,0,0,0.07)" }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input type="text" placeholder="Your name" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle}
          onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)")} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="your@email.com" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle}
          onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)")} />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea rows={5} placeholder="Tell me about your project or opportunity..." value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)")} />
      </div>
      <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit}
        disabled={status === "sending" || status === "sent"}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
        style={{
          background: status === "sent" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg, #10b981, #06b6d4)",
          boxShadow: "0 8px 30px rgba(16,185,129,0.25)", opacity: status === "sending" ? 0.7 : 1,
          cursor: status === "sending" || status === "sent" ? "default" : "pointer",
        }}>
        {status === "sending" && (
          <motion.div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
        )}
        {status === "sent"  && "✓ Message Sent!"}
        {status === "error" && "Failed — Try Again"}
        {!status && <><Send className="w-4 h-4" /> Send Message</>}
      </motion.button>
      {status === "sent" && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="text-center text-xs" style={{ color: "#34d399" }}>
          Thanks! I'll get back to you soon 🙌
        </motion.p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AI CHATBOT — mobile-friendly layout
// ═══════════════════════════════════════════════════════════════
function ChatBot({ dark, onClose }) {
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hi! I'm Vinay's AI assistant 🤖 Ask me anything about him — projects, skills, his UK patent, availability for internships, or anything else!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    const history = msgs.filter((m, idx) => !(m.role === "assistant" && idx === 0)).map(m => ({ role: m.role, content: m.text }));
    history.push({ role: "user", content: userMsg });
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setMsgs(m => [...m, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMsgs(m => [...m, { role: "assistant", text: "Oops! Something went wrong. Please try again." }]);
    } finally { setLoading(false); }
  };

  const bg         = dark ? "#0f172a" : "#ffffff";
  const border     = dark ? "rgba(34,211,238,0.2)" : "rgba(99,102,241,0.2)";
  const accent     = dark ? "#22d3ee" : "#6366f1";
  const userBg     = dark ? "rgba(34,211,238,0.15)" : "rgba(99,102,241,0.1)";
  const aiBg       = dark ? "rgba(255,255,255,0.05)" : "#f8fafc";
  const textColor  = dark ? "#e2e8f0" : "#1e293b";
  const mutedColor = dark ? "#64748b" : "#94a3b8";
  const inputBg    = dark ? "rgba(255,255,255,0.05)" : "#f1f5f9";

  return (
    <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      style={{ background: bg, border: `1px solid ${border}`, boxShadow: `0 25px 60px rgba(0,0,0,0.2)` }}
      className="fixed bottom-24 right-3 left-3 sm:left-auto sm:w-80 sm:right-6 rounded-3xl z-[200] overflow-hidden flex flex-col">
      <div style={{ borderBottom: `1px solid ${border}`, background: `linear-gradient(135deg, ${accent}15, transparent)` }}
        className="p-4 flex items-center justify-between flex-shrink-0">
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
        <button onClick={onClose} className="p-2 rounded-lg" style={{ color: mutedColor }}><X className="w-4 h-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "50vh" }}>
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
              style={{ background: m.role === "user" ? userBg : aiBg, color: textColor, border: `0.5px solid ${border}` }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 flex gap-1" style={{ background: aiBg, border: `0.5px solid ${border}` }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: accent }}
                  animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {msgs.length === 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {["What are his skills?", "Tell me about his UK patent", "Is he open to internships?"].map(q => (
            <button key={q} onClick={() => setInput(q)}
              className="text-xs px-2.5 py-1 rounded-full font-medium transition-all active:scale-95"
              style={{ background: accent + "18", color: accent, border: `0.5px solid ${accent}40` }}>{q}</button>
          ))}
        </div>
      )}
      <div style={{ borderTop: `1px solid ${border}` }} className="p-3 flex gap-2 flex-shrink-0">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask anything about Vinay…"
          className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
          style={{ background: inputBg, color: textColor, border: `0.5px solid ${border}` }} />
        <motion.button whileTap={{ scale: 0.94 }} onClick={send}
          disabled={loading || !input.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40"
          style={{ background: accent }}>
          <Send className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION HELPERS
// ═══════════════════════════════════════════════════════════════
function Section({ id, children, className = "" }) {
  return <section id={id} className={`relative z-10 ${className}`}>{children}</section>;
}

function SectionHead({ eyebrow, title, gradient, dark }) {
  return (
    <div className="text-center mb-16">
      <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: gradient[0] }}>
        {eyebrow}
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black"
        style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}>
        <GradientText dark={dark} from={gradient[0]} to={gradient[1]} solidColor={gradient[0]}>
          {title}
        </GradientText>
      </motion.h2>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="h-0.5 w-20 mx-auto mt-5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})` }} />
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
  const [filter, setFilter] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 4;

  // Detect touch once at mount
  const isTouch = useRef(isTouchDevice()).current;

  const typed = useTyping(TYPING_ROLES);
  const { scrollYProgress } = useScroll();
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => e.forEach(en => { if (en.isIntersecting) setActiveNav(en.target.id); }),
      { threshold: 0.4 }
    );
    NAV.forEach(s => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => { setShowAll(false); }, [filter]);

  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.tags.includes(filter));
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = filteredProjects.length > INITIAL_COUNT;

  const BG          = dark ? "#020617"                : "#fafafa";
  const TEXT        = dark ? "#f1f5f9"                : "#111827";
  const MUTED       = dark ? "#64748b"                : "#6b7280";
  const CARD_BG     = dark ? "rgba(255,255,255,0.03)" : "#ffffff";
  const CARD_BORDER = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const CARD_SHADOW = dark ? "none"                   : "0 2px 12px rgba(0,0,0,0.06)";
  const ACCENT      = dark ? "#22d3ee"                : "#6366f1";
  const NAV_BG      = dark ? "rgba(2,6,23,0.85)"      : "rgba(250,250,250,0.92)";
  const NAV_BORDER  = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  // On touch devices: normal cursor, no custom cursor component
  const cursorStyle = isTouch ? "auto" : "none";

  return (
    <div style={{ background: BG, color: TEXT, cursor: cursorStyle, fontFamily: "'DM Sans','Nunito',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
        html { scroll-behavior: smooth; }
        *,*::before,*::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; border-radius: 2px; }
        ::selection { background: ${ACCENT}40; }
        /* Improve tap targets on mobile */
        button, a { -webkit-tap-highlight-color: transparent; }
        /* Prevent zoom on input focus iOS */
        input, textarea, select { font-size: 16px !important; }
      `}</style>

      <NeuralCanvas dark={dark} />
      {/* Custom cursor only on non-touch devices */}
      {!isTouch && <CustomCursor dark={dark} />}

      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 h-[3px] z-[100]"
        style={{ width: progressW, background: `linear-gradient(90deg, ${ACCENT}, #8b5cf6, #ec4899)` }} />

      {/* ── NAVBAR ── */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
        style={{ background: NAV_BG, borderBottom: `0.5px solid ${NAV_BORDER}` }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.a href="https://my-portfolio-nmj4.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="text-xl font-black tracking-tight"
            style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "0.05em", color: ACCENT, textDecoration: "none" }}>
            VINAY RAJ V
          </motion.a>
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(s => (
              <motion.a key={s} href={`#${s}`} whileHover={{ y: -2 }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 capitalize"
                style={{
                  color: activeNav === s ? ACCENT : MUTED,
                  background: activeNav === s ? ACCENT + "15" : "transparent",
                  border: activeNav === s ? `0.5px solid ${ACCENT}40` : "0.5px solid transparent",
                }}>
                {s}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDark(!dark)}
              className="p-2 rounded-xl" style={{ color: MUTED, border: `0.5px solid ${CARD_BORDER}`, background: CARD_BG }}>
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            {/* ✅ FIX: Resume button visible on ALL screen sizes */}
            <motion.a href="/Vinay Raj V Resume.pdf" download whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`, boxShadow: `0 4px 20px ${ACCENT}40` }}>
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </motion.a>
            <button className="lg:hidden p-2" style={{ color: MUTED }} onClick={() => setMobileMenuOpen(v => !v)}>
              <div className="w-5 space-y-1">
                <span className={`block h-0.5 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} style={{ background: MUTED }} />
                <span className={`block h-0.5 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} style={{ background: MUTED }} />
                <span className={`block h-0.5 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} style={{ background: MUTED }} />
              </div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden px-4 pb-4 flex flex-wrap gap-2"
              style={{ borderTop: `0.5px solid ${NAV_BORDER}` }}>
              {NAV.map(s => (
                <a key={s} href={`#${s}`} onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider capitalize"
                  style={{ color: ACCENT, background: ACCENT + "15", border: `0.5px solid ${ACCENT}30` }}>{s}</a>
              ))}
              {/* Resume link also in mobile menu */}
              <a href="/Vinay Raj V Resume.pdf" download onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: "#fff", background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)` }}>
                <Download className="w-3 h-3" /> Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <Section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, delay: 0.2 }} className="relative mb-8">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full"
            style={{ background: `conic-gradient(${ACCENT}, #8b5cf6, #ec4899, ${ACCENT})`, padding: "3px" }}>
            <div className="w-full h-full rounded-full" style={{ background: BG }} />
          </motion.div>
          <div onClick={() => setPhotoOpen(true)}
            title="Tap to view full photo"
            style={{ position: "relative", zIndex: 1, width: "112px", height: "112px", borderRadius: "50%", overflow: "hidden", cursor: "pointer" }}>
            <img src="/vinay.jpeg" alt="Vinay"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ZoomIn style={{ color: "#fff", width: "22px", height: "22px" }} />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 animate-pulse"
            style={{ background: "#22c55e", borderColor: BG, zIndex: 2 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-center gap-1.5 mb-4 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: MUTED }}>
          <MapPin className="w-3 h-3" style={{ color: ACCENT }} /> Shivamogga, Karnataka, India
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
          className="text-5xl md:text-8xl lg:text-9xl font-black mb-3 leading-none"
          style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "0.02em" }}>
          <span style={{ color: TEXT }}>VINAY </span>
          <GradientText dark={dark} from={ACCENT} to="#ec4899" solidColor={ACCENT}>RAJ V</GradientText>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex items-center gap-2 mb-6 h-10" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
          <span className="text-base md:text-2xl font-semibold" style={{ color: ACCENT }}>&gt; {typed}</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
            className="w-0.5 h-7 rounded-full inline-block" style={{ background: ACCENT }} />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-sm md:text-lg max-w-lg mx-auto mb-8 leading-relaxed px-2" style={{ color: MUTED }}>
          6th Semester AIML student crafting intelligent systems that bridge cutting-edge research with real-world impact.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
          onClick={() => setSelectedPatent(patents[0])}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full cursor-pointer"
          style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)" }}>
          <span className="text-sm">🇬🇧</span>
          <span className="text-xs font-bold" style={{ color: "#0EA5E9" }}>UK Registered Design Holder · Design #6497347</span>
          <Shield className="w-3 h-3" style={{ color: "#0EA5E9" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-16 w-full max-w-sm sm:max-w-none sm:w-auto px-4 sm:px-0">
          <motion.a href="#projects" whileTap={{ scale: 0.97 }}
            className="px-6 py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`, boxShadow: `0 8px 30px ${ACCENT}40` }}>
            <Zap className="w-4 h-4" /> View My Work
          </motion.a>
          <motion.a href="#contact" whileTap={{ scale: 0.97 }}
            className="px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, color: TEXT, boxShadow: CARD_SHADOW }}>
            <Mail className="w-4 h-4" /> Say Hello
          </motion.a>
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => setChatOpen(true)}
            className="px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
            style={{ background: "#8b5cf620", border: `1px solid #8b5cf640`, color: dark ? "#a78bfa" : "#7c3aed" }}>
            <MessageCircle className="w-4 h-4" /> Ask AI About Me
          </motion.button>
        </motion.div>

        <motion.a href="#about" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
          style={{ color: MUTED }}><ChevronDown className="w-5 h-5" /></motion.a>
      </Section>

      {/* ── ABOUT ── */}
      <Section id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead dark={dark} eyebrow="Who I Am" title="About Me" gradient={[ACCENT, "#8b5cf6"]} />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }} className="space-y-5 leading-relaxed" style={{ color: MUTED, fontSize: "1.05rem" }}>
              <p>Passionate AIML student from Shivamogga, Karnataka, currently in my 6th semester diving deep into Machine Learning, Neural Networks, and modern AI systems.</p>
              <p>I love building intelligent systems — whether it's NLP pipelines, computer vision models, or full-stack ML apps. Always exploring generative AI and MLOps.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Open to Internships", "Shivamogga, KA", "Freelance Available", "6th Semester", "🇬🇧 UK Patent Holder"].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: ACCENT + "15", border: `0.5px solid ${ACCENT}40`, color: ACCENT }}>{t}</span>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: 5,  suffix: "+", label: "Projects Built", icon: "🚀" },
                { val: 8,  suffix: "+", label: "Technologies",   icon: "⚙️" },
                { val: 50, suffix: "+", label: "GitHub Commits", icon: "💻" },
                { val: 7,  suffix: "+", label: "Certifications", icon: "🏆" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, boxShadow: CARD_SHADOW }}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-black mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif", color: ACCENT }}>
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
      <Section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead dark={dark} eyebrow="What I've Built" title="Featured Projects" gradient={["#8b5cf6", "#ec4899"]} />
          {/* ✅ FIX: Horizontally scrollable filter tags on mobile */}
          <div className="flex overflow-x-auto gap-2 mb-10 pb-2 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {allTags.map(tag => (
              <motion.button key={tag} onClick={() => setFilter(tag)} whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all"
                style={{
                  background: filter === tag ? "linear-gradient(135deg, #8b5cf6, #ec4899)" : CARD_BG,
                  color: filter === tag ? "#fff" : MUTED,
                  border: `0.5px solid ${filter === tag ? "transparent" : CARD_BORDER}`,
                }}>
                {tag === "All" && <Filter className="w-3 h-3" />} {tag}
              </motion.button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((p, idx) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl p-6 group relative overflow-hidden"
                  style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, boxShadow: CARD_SHADOW }}>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, ${p.gradient[0]}, ${p.gradient[1]})` }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}>
                        <Code2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs"
                        style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, color: MUTED }}>{p.year}</span>
                    </div>
                    <h3 className="text-base font-bold mb-2" style={{ color: TEXT }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tags.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{ background: p.gradient[0] + "18", color: p.gradient[0], border: `0.5px solid ${p.gradient[0]}40` }}>{t}</span>
                      ))}
                    </div>
                    <motion.a href={p.github} target="_blank" rel="noopener noreferrer"
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}>
                      <Github className="w-4 h-4" /> View on GitHub
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {hasMore && (
            <div className="flex justify-center mt-10">
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => setShowAll(v => !v)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, color: TEXT, boxShadow: CARD_SHADOW }}>
                {showAll ? (
                  <><ChevronDown className="w-4 h-4 rotate-180" style={{ color: ACCENT }} /> Show Less</>
                ) : (
                  <><ChevronDown className="w-4 h-4" style={{ color: ACCENT }} /> Show More ({filteredProjects.length - INITIAL_COUNT} more)</>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </Section>

      {/* ── PATENTS ── */}
      <Section id="patents" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead dark={dark} eyebrow="Intellectual Property" title="Registered Design" gradient={["#0EA5E9", "#6366f1"]} />
          {patents.map((patent, i) => (
            <motion.div key={patent.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="rounded-3xl overflow-hidden relative"
                style={{ background: CARD_BG, border: "1px solid rgba(14,165,233,0.25)", boxShadow: dark ? "0 0 60px rgba(14,165,233,0.05)" : "0 4px 32px rgba(14,165,233,0.08)" }}>
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#0EA5E9,#6366f1,#8b5cf6)" }} />
                <div className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                          {patent.flag}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: "rgba(14,165,233,0.15)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.3)" }}>
                              🛡️ UK Registered Design
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: "rgba(34,197,94,0.15)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.3)" }}>
                              ✓ Granted
                            </span>
                          </div>
                          <h3 className="text-xl md:text-3xl font-black leading-tight"
                            style={{ fontFamily: "'Bebas Neue',sans-serif", color: TEXT }}>{patent.title}</h3>
                          <p className="text-sm mt-1" style={{ color: MUTED }}>{patent.authority}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{patent.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Design Number", value: `#${patent.id}` },
                          { label: "Grant Date", value: patent.grantDate },
                          { label: "Registration Date", value: patent.registrationDate },
                          { label: "Classification", value: "Class 10 · Subclass 05" },
                        ].map(({ label, value }) => (
                          <div key={label} className="rounded-xl p-3"
                            style={{ background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc", border: `0.5px solid ${CARD_BORDER}` }}>
                            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: MUTED }}>{label}</p>
                            <p className="text-sm font-bold" style={{ color: TEXT }}>{value}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: MUTED }}>Registered Inventors</p>
                        <div className="flex flex-wrap gap-2">
                          {patent.inventors.map((inv, idx) => (
                            <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                              style={{
                                background: inv.includes("Vinay") ? "rgba(14,165,233,0.2)" : CARD_BG,
                                color: inv.includes("Vinay") ? "#0EA5E9" : MUTED,
                                border: `0.5px solid ${inv.includes("Vinay") ? "rgba(14,165,233,0.5)" : CARD_BORDER}`,
                                fontWeight: inv.includes("Vinay") ? 800 : 500,
                              }}>
                              {inv.includes("Vinay") ? "⭐ " : ""}{inv}
                            </span>
                          ))}
                        </div>
                      </div>
                      <motion.button whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedPatent(patent)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#0EA5E9,#6366f1)", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}>
                        <Eye className="w-4 h-4" /> View Certificate
                      </motion.button>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-4 md:w-56">
                      <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.03, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-36 h-36 rounded-3xl flex items-center justify-center relative"
                        style={{ background: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.1))", border: "1px solid rgba(14,165,233,0.3)" }}>
                        <Shield className="w-16 h-16" style={{ color: "#0EA5E9", opacity: 0.8 }} />
                      </motion.div>
                      <div className="text-center">
                        <p className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#0EA5E9" }}>#{patent.id}</p>
                        <p className="text-xs" style={{ color: MUTED }}>Design Registration Number</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold" style={{ color: "#16a34a" }}>Officially Registered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section id="skills" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead dark={dark} eyebrow="What I Work With" title="Tech Stack" gradient={["#ec4899", "#f97316"]} />
          <SkillCategoriesGrid dark={dark} />
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHead dark={dark} eyebrow="My Journey" title="Education" gradient={["#06b6d4", "#3b82f6"]} />
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-3 md:left-5 top-2 bottom-2 w-px"
              style={{ background: `linear-gradient(to bottom, ${ACCENT}80, transparent)` }} />
            {education.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative mb-8">
                <div className="absolute -left-5 md:-left-7 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ background: BG, borderColor: ACCENT }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                </div>
                <div className="rounded-2xl p-5" style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, boxShadow: CARD_SHADOW }}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{e.icon}</span>
                      <h3 className="font-bold text-sm" style={{ color: TEXT }}>{e.degree}</h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5"
                      style={{ background: ACCENT + "15", color: ACCENT, border: `0.5px solid ${ACCENT}30` }}>
                      <Calendar className="w-3 h-3" /> {e.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: dark ? "#a78bfa" : "#7c3aed" }}>{e.school}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: MUTED }}>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.location}</span>
                    <span className="font-bold" style={{ color: "#16a34a" }}>{e.grade}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── ACHIEVEMENTS ── */}
      <Section id="achievements" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead dark={dark} eyebrow="Recognition" title="Achievements" gradient={["#f59e0b", "#f97316"]} />
          <p className="text-center text-xs mb-8 flex items-center justify-center gap-1.5" style={{ color: MUTED }}>
            <Eye className="w-3.5 h-3.5" /> Tap any card to view the certificate
          </p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCert(a)}
                className="rounded-2xl p-4 text-center group relative overflow-hidden"
                style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, cursor: "pointer", boxShadow: CARD_SHADOW }}>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: a.accent + "20", border: `0.5px solid ${a.accent}40` }}>
                    <a.icon className="w-5 h-5" style={{ color: a.accent }} />
                  </div>
                  <h3 className="font-bold text-xs mb-1 leading-snug" style={{ color: TEXT }}>{a.title}</h3>
                  <p className="text-xs mb-1" style={{ color: MUTED }}>{a.issuer}</p>
                  <p className="text-xs font-mono mb-2" style={{ color: a.accent }}>{a.date}</p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: a.certificate ? a.accent + "20" : "rgba(100,116,139,0.15)", color: a.certificate ? a.accent : MUTED, border: `0.5px solid ${a.certificate ? a.accent + "40" : "rgba(100,116,139,0.3)"}` }}>
                    {a.certificate ? <><Eye className="w-3 h-3" /> View</> : <><Sparkles className="w-3 h-3" /> Soon</>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHead dark={dark} eyebrow="Get In Touch" title="Let's Connect" gradient={["#10b981", "#06b6d4"]} />
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl font-black mb-4 leading-tight" style={{ fontFamily: "'Bebas Neue',sans-serif", color: TEXT }}>
                Open to<br />
                <GradientText dark={dark} from="#10b981" to="#06b6d4" solidColor="#10b981">opportunities</GradientText>
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: MUTED }}>
                Looking for internships, ML freelance work, or collaborations. Have something cool in mind? I'd love to hear about it.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Github,       label: "GitHub",    sub: "github.com/vinayrajv2005",     href: "https://github.com/vinayrajv2005",                   color: dark ? "#6b7280" : "#374151" },
                  { icon: Linkedin,     label: "LinkedIn",  sub: "vinay-raj-v",                  href: "https://www.linkedin.com/in/vinay-raj-v-b89963341/", color: "#0ea5e9" },
                  { icon: Mail,         label: "Email",     sub: "vinayrajv33@gmail.com",        href: "mailto:vinayrajv33@gmail.com",                        color: "#ef4444" },
                  { icon: ExternalLink, label: "Portfolio", sub: "my-portfolio-nmj4.vercel.app", href: "https://my-portfolio-nmj4.vercel.app/",               color: "#8b5cf6" },
                ].map(({ icon: Icon, label, sub, href, color }, i) => (
                  <motion.a key={label} href={href}
                    target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 rounded-2xl group transition-all"
                    style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, textDecoration: "none", boxShadow: CARD_SHADOW }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: color + "20", border: `0.5px solid ${color}40` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold" style={{ color: TEXT }}>{label}</p>
                      <p className="text-xs truncate" style={{ color: MUTED }}>{sub}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-60" style={{ color: MUTED }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <ContactForm dark={dark} CARD_BG={CARD_BG} CARD_BORDER={CARD_BORDER} TEXT={TEXT} MUTED={MUTED} ACCENT={ACCENT} />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-8 text-center relative z-10" style={{ borderColor: CARD_BORDER }}>
        <p className="text-xs px-4" style={{ color: MUTED }}>
          © 2026 <span style={{ color: ACCENT, fontWeight: 700 }}>Vinay Raj V</span> · Shivamogga, Karnataka
          <span className="mx-2">·</span>
          🇬🇧 UK Registered Design Holder · Crafted with ♥ &amp; lots of ☕
        </p>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <motion.button whileTap={{ scale: 0.92 }}
        onClick={() => setChatOpen(v => !v)}
        className="fixed bottom-6 right-4 z-[150] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", boxShadow: "0 8px 32px rgba(139,92,246,0.4)" }}>
        {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-4 z-[150] w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: CARD_BG, border: `0.5px solid ${CARD_BORDER}`, color: ACCENT, boxShadow: CARD_SHADOW }}>
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {chatOpen && <ChatBot dark={dark} onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedCert && <CertificateModal achievement={selectedCert} dark={dark} onClose={() => setSelectedCert(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedPatent && <PatentModal patent={selectedPatent} dark={dark} onClose={() => setSelectedPatent(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {photoOpen && <PhotoLightbox dark={dark} accent={ACCENT} onClose={() => setPhotoOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}