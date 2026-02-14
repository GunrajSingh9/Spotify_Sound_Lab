"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Music,
  Headphones,
  TrendingUp,
  Share2,
  Download,
  Heart,
  Zap,
  Clock,
  Activity,
  Sparkles,
  Play,
  Disc3,
  ArrowRight,
  CheckCircle2,
  Wifi,
  Database,
  Cpu,
  Scan,
  User,
  Calendar,
  Volume2,
  Gauge,
  Sun,
  Moon,
  Cloud,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced realistic mock data
const mockAudioFeatures = [
  { subject: "Energy", A: 82, fullMark: 100 },
  { subject: "Danceability", A: 74, fullMark: 100 },
  { subject: "Valence", A: 48, fullMark: 100 },
  { subject: "Acousticness", A: 28, fullMark: 100 },
  { subject: "Instrumental", A: 15, fullMark: 100 },
  { subject: "Liveness", A: 62, fullMark: 100 },
];

const mockMoodTrends = [
  { month: "Jan", valence: 68, energy: 78, label: "Winter" },
  { month: "Feb", valence: 62, energy: 74, label: "Winter" },
  { month: "Mar", valence: 58, energy: 70, label: "Spring" },
  { month: "Apr", valence: 48, energy: 65, label: "Spring" },
  { month: "May", valence: 42, energy: 68, label: "Spring" },
  { month: "Jun", valence: 55, energy: 76, label: "Summer" },
  { month: "Jul", valence: 64, energy: 82, label: "Summer" },
];

const mockTopArtists = [
  { name: "The Weeknd", plays: 342, hours: 28, genre: "R&B", trend: "+15%", gradient: "from-rose-500 via-red-500 to-orange-500", textColor: "text-rose-400", image: "🎭" },
  { name: "Billie Eilish", plays: 287, hours: 21, genre: "Alternative", trend: "+18%", gradient: "from-emerald-400 via-teal-500 to-cyan-600", textColor: "text-emerald-400", image: "🌙" },
  { name: "Arctic Monkeys", plays: 234, hours: 18, genre: "Indie Rock", trend: "+22%", gradient: "from-slate-400 via-gray-500 to-zinc-600", textColor: "text-slate-400", image: "🐒" },
  { name: "Lana Del Rey", plays: 198, hours: 15, genre: "Indie Pop", trend: "+12%", gradient: "from-blue-400 via-indigo-500 to-purple-600", textColor: "text-blue-400", image: "✨" },
  { name: "SZA", plays: 176, hours: 13, genre: "R&B", trend: "+25%", gradient: "from-purple-400 via-fuchsia-500 to-pink-600", textColor: "text-purple-400", image: "🦋" },
];

const mockTopTracks = [
  { name: "Cry For Me", artist: "The Weeknd", plays: 92, duration: "3:44", trend: "😢" },
  { name: "Wildflower", artist: "Billie Eilish", plays: 87, duration: "4:21", trend: "🌸" },
  { name: "I Wanna Be Yours", artist: "Arctic Monkeys", plays: 76, duration: "3:04", trend: "🎸" },
  { name: "Summertime Sadness", artist: "Lana Del Rey", plays: 68, duration: "4:25", trend: "✨" },
  { name: "Kiss Me More", artist: "SZA", plays: 71, duration: "3:28", trend: "💋" },
];

const mockGenres = [
  { name: "Pop", percentage: 32, count: 398, gradient: "from-pink-500 via-rose-500 to-red-500", color: "#ec4899" },
  { name: "Hip Hop", percentage: 24, count: 298, gradient: "from-yellow-400 via-amber-500 to-orange-500", color: "#f59e0b" },
  { name: "R&B", percentage: 18, count: 224, gradient: "from-purple-500 via-violet-500 to-indigo-500", color: "#8b5cf6" },
  { name: "Indie", percentage: 14, count: 174, gradient: "from-cyan-500 via-blue-500 to-indigo-500", color: "#06b6d4" },
  { name: "Electronic", percentage: 8, count: 99, gradient: "from-green-400 via-emerald-500 to-teal-500", color: "#10b981" },
  { name: "Rock", percentage: 4, count: 50, gradient: "from-red-500 via-rose-500 to-pink-500", color: "#f43f5e" },
];

const listeningPatterns = [
  { day: "Mon", hours: 3.2, intensity: 85 },
  { day: "Tue", hours: 4.1, intensity: 92 },
  { day: "Wed", hours: 2.8, intensity: 78 },
  { day: "Thu", hours: 3.9, intensity: 88 },
  { day: "Fri", hours: 5.4, intensity: 98 },
  { day: "Sat", hours: 6.2, intensity: 100 },
  { day: "Sun", hours: 4.8, intensity: 94 },
];

const musicPersonalities = [
  {
    type: "The Vibe Curator",
    description: "You craft the perfect atmosphere with your eclectic taste",
    gradient: "from-fuchsia-500 via-purple-500 to-violet-600",
    glow: "shadow-purple-500/50",
    icon: "🎨",
    traits: ["Eclectic", "Atmospheric", "Curated"],
    stats: { diversity: 92, consistency: 78, exploration: 88 },
  },
  {
    type: "The Mood Traveler",
    description: "Your music mirrors your emotional journey through seasons",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    glow: "shadow-blue-500/50",
    icon: "🌊",
    traits: ["Emotional", "Seasonal", "Reflective"],
    stats: { diversity: 85, consistency: 65, exploration: 72 },
  },
  {
    type: "The Beat Archaeologist",
    description: "You dig deep to find hidden gems across all eras",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    glow: "shadow-orange-500/50",
    icon: "⛏️",
    traits: ["Explorer", "Nostalgic", "Deep Cuts"],
    stats: { diversity: 96, consistency: 45, exploration: 98 },
  },
  {
    type: "The Main Character",
    description: "You live life like it's a movie with epic soundtracks",
    gradient: "from-rose-400 via-pink-500 to-purple-600",
    glow: "shadow-pink-500/50",
    icon: "🎬",
    traits: ["Dramatic", "Epic", "Cinematic"],
    stats: { diversity: 70, consistency: 88, exploration: 55 },
  },
];

const seasonalData = [
  { season: "Winter", valence: 45, energy: 68, icon: Snowflake, color: "from-blue-400 to-cyan-400" },
  { season: "Spring", valence: 52, energy: 72, icon: Cloud, color: "from-green-400 to-emerald-400" },
  { season: "Summer", valence: 72, energy: 85, icon: Sun, color: "from-yellow-400 to-orange-400" },
  { season: "Fall", valence: 48, energy: 65, icon: Moon, color: "from-orange-400 to-red-400" },
];

const connectionSteps = [
  { icon: User, label: "Authenticating", duration: 1500, color: "from-blue-400 to-blue-600" },
  { icon: Wifi, label: "Connecting to Spotify", duration: 2000, color: "from-green-400 to-green-600" },
  { icon: Database, label: "Fetching Library Data", duration: 2500, color: "from-purple-400 to-purple-600" },
  { icon: Cpu, label: "Analyzing Audio Features", duration: 2000, color: "from-yellow-400 to-amber-500" },
  { icon: Scan, label: "Generating DNA Profile", duration: 1500, color: "from-pink-400 to-rose-500" },
];

const statsData = [
  { label: "Minutes Listened", value: "47,392", subtext: "789 hours", icon: Clock, gradient: "from-cyan-400 via-blue-500 to-indigo-600" },
  { label: "Unique Artists", value: "1,384", subtext: "+127 new", icon: Headphones, gradient: "from-purple-400 via-violet-500 to-purple-600" },
  { label: "Tracks Played", value: "8,947", subtext: "32/day avg", icon: Music, gradient: "from-pink-400 via-rose-500 to-pink-600" },
  { label: "Avg Energy", value: "74%", subtext: "High energy", icon: Zap, gradient: "from-yellow-400 via-amber-500 to-orange-500" },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(musicPersonalities[1]);
  const [activeTab, setActiveTab] = useState("overview");
  const [connectionStep, setConnectionStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setConnectionStep(0);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setConnectionStep(currentStep);
      
      if (currentStep >= connectionSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsConnecting(false);
          setIsLoggedIn(true);
        }, 800);
      }
    }, connectionSteps[0].duration);
  };

  const handleShare = () => {
    const text = `🎵 My Spotify Sound Lab Results: ${selectedPersonality.type}!\n\n📊 Key Stats:\n• 47,392 minutes listened\n• 1,384 unique artists\n• Top Genre: Pop (32%)\n\n🎭 Personality: ${selectedPersonality.traits.join(", ")}\n\nDecode your music DNA!`;
    navigator.clipboard.writeText(text);
    
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center gap-3 font-semibold";
    toast.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Loading Screen
  if (isConnecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-xl"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                background: `radial-gradient(circle, ${['rgba(29,185,84,0.3)', 'rgba(139,92,246,0.3)', 'rgba(59,130,246,0.3)', 'rgba(236,72,153,0.3)'][i % 4]} 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Audio Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-full"
              animate={{
                height: [20, 60 + Math.random() * 80, 20],
              }}
              transition={{
                duration: 0.8 + Math.random() * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-2xl px-6">
          {/* Enhanced Logo with Multiple Rings */}
          <div className="relative w-48 h-48 mx-auto mb-12">
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #1DB954, #A78BFA, #3B82F6, #EC4899, #1DB954)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle Ring */}
            <motion.div
              className="absolute inset-2 rounded-full bg-slate-950"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background: "conic-gradient(from 180deg, rgba(29,185,84,0.5), rgba(139,92,246,0.5), rgba(59,130,246,0.5), rgba(236,72,153,0.5), rgba(29,185,84,0.5))",
              }}
            />
            
            {/* Inner Content */}
            <div className="absolute inset-4 bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Disc3 className="w-24 h-24 text-green-500" />
              </motion.div>
              
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 bg-green-500/20 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Title */}
          <motion.h2 
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Analyzing Your Music
          </motion.h2>
          <motion.p 
            className="text-slate-400 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Decoding your sound profile...
          </motion.p>

          {/* Enhanced Steps */}
          <div className="space-y-4">
            {connectionSteps.map((step, idx) => {
              const isActive = idx === connectionStep;
              const isComplete = idx < connectionStep;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: isActive || isComplete ? 1 : 0.4,
                    x: 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                  className={`relative flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 backdrop-blur-sm ${
                    isActive 
                      ? "bg-gradient-to-r from-white/15 to-white/5 border border-green-500/50 shadow-lg shadow-green-500/30" 
                      : isComplete 
                        ? "bg-gradient-to-r from-green-500/20 to-green-500/5 border border-green-500/40" 
                        : "bg-white/5 border border-white/10"
                  }`}
                >
                  {/* Step Number */}
                  <div className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isComplete 
                      ? "bg-green-500 text-white" 
                      : isActive 
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white" 
                        : "bg-white/10 text-slate-500"
                  }`}>
                    {isComplete ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
                      isComplete 
                        ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-green-500/50" 
                        : isActive 
                          ? `bg-gradient-to-br ${step.color} text-white shadow-lg` 
                          : "bg-white/10 text-slate-500"
                    }`}
                  >
                    <step.icon className="w-7 h-7" />
                  </motion.div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <span className={`block text-lg font-semibold ${isActive ? "text-white" : isComplete ? "text-green-400" : "text-slate-500"}`}>
                      {step.label}
                    </span>
                    {isActive && (
                      <motion.span 
                        className="text-sm text-green-400/80"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Processing...
                      </motion.span>
                    )}
                  </div>

                  {/* Status Indicator */}
                  {isActive && (
                    <motion.div
                      className="flex gap-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mt-12">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Progress</span>
              <span className="font-bold text-green-400">{Math.round((connectionStep / connectionSteps.length) * 100)}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, #1DB954, #10B981, #34D399, #1DB954)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(connectionStep / connectionSteps.length) * 100}%`,
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{ 
                  width: { duration: 0.5 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            
            {/* Stats Preview */}
            <motion.div 
              className="mt-6 flex justify-center gap-8 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: connectionStep >= 2 ? 1 : 0 }}
            >
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">1,384</div>
                <div className="text-slate-500">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold text-lg">8,947</div>
                <div className="text-slate-500">Tracks</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold text-lg">789</div>
                <div className="text-slate-500">Hours</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Landing Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(29, 185, 84, 0.15) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(29, 185, 84, 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center top',
          }} />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + Math.random() * 4}px`,
                height: `${4 + Math.random() * 4}px`,
                background: `linear-gradient(135deg, ${['#1DB954', '#A78BFA', '#60A5FA', '#F472B6', '#FBBF24'][i % 5]}, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="relative w-44 h-44 mx-auto mb-10"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-green-400 to-emerald-500 opacity-30"
                animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'linear-gradient(135deg, rgba(29,185,84,0.3), transparent)',
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute inset-8 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 0 40px rgba(29, 185, 84, 0.4)",
                    "0 0 80px rgba(29, 185, 84, 0.6)",
                    "0 0 40px rgba(29, 185, 84, 0.4)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Disc3 className="w-20 h-20 text-white" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
                Spotify
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                Sound Lab
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto"
            >
              Uncover the hidden patterns in your music. 
              Discover your unique sound identity, track emotional trends, 
              and visualize your musical journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { 
                  icon: Activity, 
                  title: "Deep Analysis", 
                  desc: "Audio features, energy & mood patterns",
                  gradient: "from-blue-500 via-cyan-500 to-teal-500"
                },
                { 
                  icon: TrendingUp, 
                  title: "Track Evolution", 
                  desc: "Seasonal trends & listening habits",
                  gradient: "from-purple-500 via-pink-500 to-rose-500"
                },
                { 
                  icon: Sparkles, 
                  title: "Personality Match", 
                  desc: "Discover your music persona",
                  gradient: "from-amber-400 via-orange-500 to-red-500"
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={handleConnect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full text-xl font-bold shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Music className="w-6 h-6" />
                  Analyze My Music
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500"
            >
              {["No data stored", "Privacy focused", "Generalized insights"].map((badge, idx) => (
                <span key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white"
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">Spotify Sound Lab</h1>
            <p className="text-xs text-slate-400">Decode Your Music DNA</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Share</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all font-medium shadow-lg shadow-green-500/25"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 bg-white/5 p-2 rounded-2xl mb-8 border border-white/10 gap-2">
            <TabsTrigger 
              value="overview"
              className="capitalize rounded-xl transition-all font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-rose-500/50 data-[state=active]:scale-105 data-[state=active]:border-0 hover:text-rose-400"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                Overview
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="analysis"
              className="capitalize rounded-xl transition-all font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 data-[state=active]:scale-105 data-[state=active]:border-0 hover:text-cyan-400"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                Analysis
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="trends"
              className="capitalize rounded-xl transition-all font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-violet-500/50 data-[state=active]:scale-105 data-[state=active]:border-0 hover:text-violet-400"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                Trends
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="personality"
              className="capitalize rounded-xl transition-all font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/50 data-[state=active]:scale-105 data-[state=active]:border-0 hover:text-amber-400"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">🎭</span>
                Personality
              </span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-500/30 via-fuchsia-500/30 to-purple-600/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-purple-600/10 animate-pulse" />
                  <CardContent className="relative p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/30">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-3 bg-yellow-500/20 text-yellow-300 border-yellow-500/40 px-3 py-1">
                          ✨ Key Discovery
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                          Your music got <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">23% sadder</span> this winter
                        </h2>
                        <p className="text-slate-200 text-lg">
                          Your valence score dropped from 68% to 42% between January and May. 
                          This correlates with slower tempos (BPM ↓ 12%) and 34% more acoustic tracks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsData.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className={`border-0 bg-gradient-to-br ${stat.gradient} overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-black/40" />
                      <CardContent className="relative p-6 text-center">
                        <stat.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                        <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
                        <div className="text-xs text-white/80">{stat.subtext}</div>
                        <div className="text-sm text-white/90 font-medium mt-1">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="border-0 bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-500">Top Artists</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockTopArtists.map((artist, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.08)" }}
                          className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer group"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${artist.gradient} flex items-center justify-center text-xl shadow-lg`}>
                            {artist.image}
                          </div>
                          <div className="flex-1">
                            <div className={`font-semibold ${artist.textColor}`}>{artist.name}</div>
                            <div className="text-sm text-slate-400">{artist.genre} • {artist.hours} hrs</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{artist.plays}</div>
                            <div className={`text-xs ${artist.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{artist.trend}</div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="border-0 bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">Top Tracks</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockTopTracks.map((track, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.08)" }}
                          className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer group"
                        >
                          <div className="text-2xl">{track.trend}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">{track.name}</div>
                            <div className="text-sm text-slate-400">{track.artist}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">{track.plays}</div>
                            <div className="text-xs text-slate-500">{track.duration}</div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-400">
                        <Activity className="w-5 h-5" />
                        Audio Features Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockAudioFeatures}>
                          <PolarGrid stroke="rgba(74, 222, 128, 0.2)" />
                          <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: "#4ade80", fontSize: 12, fontWeight: 500 }} 
                          />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar
                            name="Your Music"
                            dataKey="A"
                            stroke="#4ade80"
                            strokeWidth={3}
                            fill="url(#greenGradient)"
                            fillOpacity={0.5}
                          />
                          <defs>
                            <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#4ade80" stopOpacity={0.8}/>
                              <stop offset="100%" stopColor="#10b981" stopOpacity={0.3}/>
                            </linearGradient>
                          </defs>
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-400">
                        <Gauge className="w-5 h-5" />
                        Genre Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={mockGenres}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="percentage"
                          >
                            {mockGenres.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {mockGenres.map((genre, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: genre.color }} />
                            <span className="text-slate-300">{genre.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Weekly Listening Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={listeningPatterns}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" tick={{ fill: "#94a3b8" }} />
                        <YAxis tick={{ fill: "#94a3b8" }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "rgba(15, 23, 42, 0.9)", 
                            border: "none",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="hours" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                      Mood Evolution Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={mockMoodTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" tick={{ fill: "#94a3b8" }} axisLine={false} />
                        <YAxis tick={{ fill: "#94a3b8" }} domain={[0, 100]} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            padding: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="valence"
                          name="Happiness"
                          stroke="#f43f5e"
                          strokeWidth={5}
                          dot={{ fill: "#f43f5e", strokeWidth: 0, r: 8 }}
                          activeDot={{ r: 10, strokeWidth: 0 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="energy"
                          name="Energy"
                          stroke="#3b82f6"
                          strokeWidth={5}
                          dot={{ fill: "#3b82f6", strokeWidth: 0, r: 8 }}
                          activeDot={{ r: 10, strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-8 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-rose-500 shadow-lg shadow-rose-500/50" />
                        <span className="font-medium">Happiness (Valence)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                        <span className="font-medium">Energy Level</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seasonalData.map((season, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className={`border-0 bg-gradient-to-br ${season.color} overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-black/30" />
                      <CardContent className="relative p-6 text-center">
                        <season.icon className="w-10 h-10 mx-auto mb-3 text-white" />
                        <h3 className="text-xl font-bold text-white mb-2">{season.season}</h3>
                        <div className="space-y-1">
                          <div className="text-sm text-white/80">Happiness: {season.valence}%</div>
                          <div className="text-sm text-white/80">Energy: {season.energy}%</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Personality Tab */}
            <TabsContent value="personality" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${selectedPersonality.gradient} p-1 shadow-2xl ${selectedPersonality.glow}`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <CardContent className="relative p-10 text-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-9xl mb-6 drop-shadow-2xl"
                    >
                      {selectedPersonality.icon}
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">{selectedPersonality.type}</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">{selectedPersonality.description}</p>
                    <div className="flex justify-center gap-3 flex-wrap mb-8">
                      {selectedPersonality.traits.map((trait, idx) => (
                        <Badge key={idx} className="bg-white/30 text-white border-0 px-6 py-2 text-base font-semibold backdrop-blur-sm">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold text-white">{selectedPersonality.stats.diversity}%</div>
                        <div className="text-xs text-white/70">Diversity</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold text-white">{selectedPersonality.stats.consistency}%</div>
                        <div className="text-xs text-white/70">Consistency</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold text-white">{selectedPersonality.stats.exploration}%</div>
                        <div className="text-xs text-white/70">Exploration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {musicPersonalities
                  .filter((p) => p.type !== selectedPersonality.type)
                  .map((personality, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      onClick={() => setSelectedPersonality(personality)}
                      className="cursor-pointer"
                    >
                      <Card className={`border-0 bg-gradient-to-br ${personality.gradient} p-0.5 h-full group`}>
                        <div className="bg-slate-950/90 rounded-[15px] h-full p-6 group-hover:bg-slate-950/80 transition-all">
                          <CardContent className="p-0 text-center">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                              {personality.icon}
                            </div>
                            <h3 className="font-bold text-xl mb-2 text-white">{personality.type}</h3>
                            <p className="text-sm text-slate-400">{personality.description}</p>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Share Your Sound Profile</h3>
                        <p className="text-slate-300">Let your friends discover their musical identity</p>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleShare}
                          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full font-bold shadow-lg shadow-green-500/30 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          Share Results
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </motion.div>
  );
}