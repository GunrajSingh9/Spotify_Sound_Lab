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
} from "recharts";
import {
  Disc,
  Headphones,
  TrendUp,
  ShareNetwork,
  Download,
  Heart,
  Lightning,
  Clock,
  Pulse,
  Sparkle,
  Play,
  ChartBar,
  ArrowRight,
  Check,
  WifiHigh,
  Database,
  Cpu,
  Scan,
  User,
  Calendar,
  Equalizer,
  ChartLineUp,
  MaskHappy,
  Fire,
  Crown,
  Star,
  MusicNotes,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MorphingIcon, IconMorph } from "@/components/MorphingIcon";

// COSS UI Color System - Fixed Contrast
const colors = {
  primary: "#1DB954",
  primaryHover: "#1ed760",
  background: "#0a0a0a",
  surface: "#141414",
  surfaceHover: "#1a1a1a",
  border: "#2a2a2a",
  text: {
    primary: "#ffffff",
    secondary: "#d4d4d8",  // was #a1a1aa - too dark
    tertiary: "#a1a1aa",   // was #71717a - too dark
  },
};

// Mock data
const mockAudioFeatures = [
  { subject: "Energy", A: 82, fullMark: 100 },
  { subject: "Danceability", A: 74, fullMark: 100 },
  { subject: "Valence", A: 48, fullMark: 100 },
  { subject: "Acousticness", A: 28, fullMark: 100 },
  { subject: "Instrumental", A: 15, fullMark: 100 },
  { subject: "Liveness", A: 62, fullMark: 100 },
];

const mockMoodTrends = [
  { month: "Jan", valence: 68, energy: 78 },
  { month: "Feb", valence: 62, energy: 74 },
  { month: "Mar", valence: 58, energy: 70 },
  { month: "Apr", valence: 48, energy: 65 },
  { month: "May", valence: 42, energy: 68 },
  { month: "Jun", valence: 55, energy: 76 },
  { month: "Jul", valence: 64, energy: 82 },
];

const mockTopArtists = [
  { name: "The Weeknd", plays: 342, hours: 28, genre: "R&B" },
  { name: "Billie Eilish", plays: 287, hours: 21, genre: "Alternative" },
  { name: "Arctic Monkeys", plays: 234, hours: 18, genre: "Indie Rock" },
  { name: "Lana Del Rey", plays: 198, hours: 15, genre: "Indie Pop" },
  { name: "SZA", plays: 176, hours: 13, genre: "R&B" },
];

const mockTopTracks = [
  { name: "Cry For Me", artist: "The Weeknd", plays: 92, duration: "3:44" },
  { name: "Wildflower", artist: "Billie Eilish", plays: 87, duration: "4:21" },
  { name: "I Wanna Be Yours", artist: "Arctic Monkeys", plays: 76, duration: "3:04" },
  { name: "Summertime Sadness", artist: "Lana Del Rey", plays: 68, duration: "4:25" },
  { name: "Kiss Me More", artist: "SZA", plays: 71, duration: "3:28" },
];

const mockGenres = [
  { name: "Pop", percentage: 32 },
  { name: "Hip Hop", percentage: 24 },
  { name: "R&B", percentage: 18 },
  { name: "Indie", percentage: 14 },
  { name: "Electronic", percentage: 8 },
  { name: "Rock", percentage: 4 },
];

const listeningPatterns = [
  { day: "Mon", hours: 3.2 },
  { day: "Tue", hours: 4.1 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 3.9 },
  { day: "Fri", hours: 5.4 },
  { day: "Sat", hours: 6.2 },
  { day: "Sun", hours: 4.8 },
];

const musicPersonalities = [
  {
    type: "The Vibe Curator",
    description: "You craft the perfect atmosphere with your eclectic taste",
    icon: Star,
    traits: ["Eclectic", "Atmospheric", "Curated"],
  },
  {
    type: "The Mood Traveler",
    description: "Your music mirrors your emotional journey through seasons",
    icon: Fire,
    traits: ["Emotional", "Seasonal", "Reflective"],
  },
  {
    type: "The Beat Archaeologist",
    description: "You dig deep to find hidden gems across all eras",
    icon: Crown,
    traits: ["Explorer", "Nostalgic", "Deep Cuts"],
  },
  {
    type: "The Main Character",
    description: "You live life like it's a movie with epic soundtracks",
    icon: MaskHappy,
    traits: ["Dramatic", "Epic", "Cinematic"],
  },
];

const connectionSteps = [
  { icon: User, label: "Authenticating" },
  { icon: WifiHigh, label: "Connecting to Spotify" },
  { icon: Database, label: "Fetching Library Data" },
  { icon: Cpu, label: "Analyzing Audio Features" },
  { icon: Scan, label: "Generating DNA Profile" },
];

const statsData = [
  { label: "Minutes Listened", value: "47,392", subtext: "789 hours", icon: Clock },
  { label: "Unique Artists", value: "1,384", subtext: "+127 new", icon: Headphones },
  { label: "Tracks Played", value: "8,947", subtext: "32/day avg", icon: MusicNotes },
  { label: "Avg Energy", value: "74%", subtext: "High energy", icon: Lightning },
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
    }, 1500);
  };

  const handleShare = () => {
    const text = `My Spotify Sound Lab Results: ${selectedPersonality.type}!\n\n📊 Key Stats:\n• 47,392 minutes listened\n• 1,384 unique artists\n• Top Genre: Pop (32%)\n\n🎭 Personality: ${selectedPersonality.traits.join(", ")}\n\nDecode your music DNA!`;
    navigator.clipboard.writeText(text);
  };

  // Loading Screen
  if (isConnecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="relative z-10 text-center max-w-md px-6">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-[#1DB954] border-t-transparent" />
            <div className="absolute inset-2 rounded-full border-2 border-[#1DB954]/50 border-b-transparent" />
            <div className="absolute inset-4 flex items-center justify-center">
              <Disc size={40} weight="fill" style={{ color: colors.primary }} />
            </div>
          </motion.div>

          <div className="space-y-3">
            {connectionSteps.map((step, idx) => {
              const isActive = idx === connectionStep;
              const isComplete = idx < connectionStep;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isActive || isComplete ? 1 : 0.3, x: 0 }}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all"
                  style={{
                    backgroundColor: isActive ? colors.surface : isComplete ? `${colors.primary}15` : colors.surface,
                    borderColor: isActive ? colors.primary : isComplete ? `${colors.primary}50` : colors.border,
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: isComplete ? colors.primary : isActive ? `${colors.primary}30` : colors.surfaceHover,
                      color: isComplete || isActive ? colors.background : colors.text.tertiary,
                    }}
                  >
                    {isComplete ? <Check size={20} weight="bold" /> : <step.icon size={20} />}
                  </div>
                  <span 
                    className="flex-1 font-medium"
                    style={{ 
                      color: isActive ? colors.text.primary : isComplete ? colors.primary : colors.text.tertiary 
                    }}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8">
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: colors.surfaceHover }}>
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: colors.primary }}
                initial={{ width: 0 }}
                animate={{ width: `${(connectionStep / connectionSteps.length) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-3" style={{ color: colors.text.secondary }}>
              {Math.round((connectionStep / connectionSteps.length) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Landing Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <Sparkle size={16} style={{ color: colors.primary }} />
              <span className="text-sm" style={{ color: colors.text.secondary }}>
                Analyze your Spotify listening habits
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span style={{ color: colors.text.primary }}>Spotify</span>
              <br />
              <span style={{ color: colors.primary }}>Sound Lab</span>
            </h1>

            <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: colors.text.secondary }}>
              Decode your musical DNA. Discover listening patterns, track emotional trends, 
              and uncover your unique sound identity.
            </p>

            {/* 4-Box Bento Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {[
                { icon: "pulse", title: "Deep Analysis", desc: "Audio features & patterns", colSpan: 1 },
                { icon: "trend", title: "Track Evolution", desc: "See how taste changes", colSpan: 1 },
                { icon: "sparkle", title: "Personality Match", desc: "Discover your persona", colSpan: 1 },
                { icon: "music", title: "Music Discovery", desc: "Find new favorites", colSpan: 1 },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="group p-6 rounded-2xl border cursor-pointer"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <IconMorph
                    icon={feature.icon}
                    size={32}
                    color={colors.primary}
                    className="mb-4"
                  />
                  <h3 className="font-semibold mb-1" style={{ color: colors.text.primary }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.text.secondary }}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={handleConnect}
              className="h-14 px-8 text-lg font-semibold rounded-full"
              style={{ 
                backgroundColor: colors.primary, 
                color: colors.background,
              }}
            >
              <Disc size={24} className="mr-2" />
              Analyze My Music
              <ArrowRight size={20} className="ml-2" />
            </Button>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm" style={{ color: colors.text.secondary }}>
              {["No data stored", "Privacy focused", "Generalized insights"].map((item, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <Check size={14} style={{ color: colors.primary }} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-50 border-b"
        style={{ 
          backgroundColor: `${colors.background}CC`, 
          backdropFilter: "blur(20px)",
          borderColor: colors.border,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <MusicNotes size={20} weight="fill" style={{ color: colors.background }} />
            </div>
            <div>
              <h1 className="font-semibold" style={{ color: colors.text.primary }}>
                Spotify Sound Lab
              </h1>
              <p className="text-xs" style={{ color: colors.text.secondary }}>
                Decode Your Music DNA
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              className="border rounded-lg"
              style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            >
              <ShareNetwork size={16} className="mr-2" style={{ color: colors.text.secondary }} />
              <span style={{ color: colors.text.primary }}>Share</span>
            </Button>
            <Button 
              size="sm" 
              className="rounded-lg"
              style={{ backgroundColor: colors.primary, color: colors.background }}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs - Fluid Animation */}
        <div 
          className="relative flex gap-1 p-1 rounded-xl border mb-8"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          {/* Animated Background Pill */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-lg"
            style={{ backgroundColor: colors.primary }}
            initial={false}
            animate={{
              left: `${["overview", "analysis", "trends", "personality"].indexOf(activeTab) * 25 + 0.25}%`,
              width: "24.5%",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          />
          {[
            { id: "overview", label: "Overview", icon: Fire },
            { id: "analysis", label: "Analysis", icon: ChartBar },
            { id: "trends", label: "Trends", icon: ChartLineUp },
            { id: "personality", label: "Personality", icon: MaskHappy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm z-10"
              style={{
                color: activeTab === tab.id ? colors.background : colors.text.secondary,
              }}
            >
              <motion.div
                initial={false}
                animate={{ 
                  scale: activeTab === tab.id ? 1.1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <tab.icon size={18} weight={activeTab === tab.id ? "fill" : "regular"} />
              </motion.div>
              <motion.span
                initial={false}
                animate={{
                  fontWeight: activeTab === tab.id ? 600 : 500,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                {tab.label}
              </motion.span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Key Insight */}
              <Card 
                className="border"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}10)`,
                  borderColor: `${colors.primary}40`,
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${colors.primary}30` }}
                    >
                      <Fire size={24} style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <Badge 
                        className="mb-2 border-0"
                        style={{ 
                          backgroundColor: `${colors.primary}30`, 
                          color: colors.primary,
                        }}
                      >
                        Key Insight
                      </Badge>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text.primary }}>
                        Your music got <span style={{ color: colors.primary }}>23% sadder</span> this winter
                      </h2>
                      <p style={{ color: colors.text.secondary }}>
                        Your valence score dropped from 68% to 42% between January and May.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsData.map((stat, idx) => (
                  <Card 
                    key={idx} 
                    className="border"
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                  >
                    <CardContent className="p-4 text-center">
                      <stat.icon size={28} style={{ color: colors.primary }} className="mx-auto mb-3" weight="duotone" />
                      <div className="text-3xl font-bold mb-1" style={{ color: colors.text.primary }}>
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                        {stat.subtext}
                      </div>
                      <div className="text-sm mt-2" style={{ color: colors.text.tertiary }}>
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Top Artists & Tracks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  className="border"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CardHeader>
                    <CardTitle 
                      className="flex items-center gap-2 text-base"
                      style={{ color: colors.text.primary }}
                    >
                      <Heart size={18} weight="fill" style={{ color: colors.primary }} />
                      Top Artists
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockTopArtists.map((artist, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: colors.surfaceHover }}
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                          style={{ 
                            backgroundColor: colors.border,
                            color: colors.text.primary,
                          }}
                        >
                          {artist.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: colors.text.primary }}>
                            {artist.name}
                          </div>
                          <div className="text-sm" style={{ color: colors.text.secondary }}>
                            {artist.genre}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold" style={{ color: colors.text.primary }}>
                            {artist.plays}
                          </div>
                          <div className="text-xs" style={{ color: colors.text.tertiary }}>
                            plays
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card 
                  className="border"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CardHeader>
                    <CardTitle 
                      className="flex items-center gap-2 text-base"
                      style={{ color: colors.text.primary }}
                    >
                      <Play size={18} weight="fill" style={{ color: colors.primary }} />
                      Top Tracks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockTopTracks.map((track, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: colors.surfaceHover }}
                      >
                        <div 
                          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                          style={{ 
                            backgroundColor: colors.border,
                            color: colors.text.primary,
                          }}
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold" style={{ color: colors.text.primary }}>
                            {track.name}
                          </div>
                          <div className="text-sm" style={{ color: colors.text.secondary }}>
                            {track.artist}
                          </div>
                        </div>
                        <div 
                          className="text-right text-sm"
                          style={{ color: colors.text.tertiary }}
                        >
                          {track.duration}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "analysis" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  className="border"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CardHeader>
                    <CardTitle 
                      className="flex items-center gap-2 text-base"
                      style={{ color: colors.text.primary }}
                    >
                      <Pulse size={18} style={{ color: colors.primary }} />
                      Audio Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={mockAudioFeatures}>
                        <PolarGrid stroke={colors.border} />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: colors.text.secondary, fontSize: 12 }} 
                        />
                        <Radar
                          dataKey="A"
                          stroke={colors.primary}
                          strokeWidth={2}
                          fill={colors.primary}
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card 
                  className="border"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CardHeader>
                    <CardTitle 
                      className="flex items-center gap-2 text-base"
                      style={{ color: colors.text.primary }}
                    >
                      <Equalizer size={18} style={{ color: colors.primary }} />
                      Genre Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockGenres.map((genre, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span style={{ color: colors.text.primary }}>{genre.name}</span>
                          <span style={{ color: colors.text.secondary }}>{genre.percentage}%</span>
                        </div>
                        <div 
                          className="h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: colors.surfaceHover }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ 
                              width: `${genre.percentage}%`, 
                              backgroundColor: colors.primary,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card 
                className="border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <CardHeader>
                  <CardTitle 
                    className="flex items-center gap-2 text-base"
                    style={{ color: colors.text.primary }}
                  >
                    <Calendar size={18} style={{ color: colors.primary }} />
                    Weekly Listening Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={listeningPatterns}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                      <XAxis dataKey="day" tick={{ fill: colors.text.secondary }} />
                      <YAxis tick={{ fill: colors.text.secondary }} />
                      <Bar dataKey="hours" fill={colors.primary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "trends" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <Card 
                className="border"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <CardHeader>
                  <CardTitle 
                    className="flex items-center gap-2 text-base"
                    style={{ color: colors.text.primary }}
                  >
                    <TrendUp size={18} style={{ color: colors.primary }} />
                    Mood Evolution Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={mockMoodTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                      <XAxis dataKey="month" tick={{ fill: colors.text.secondary }} />
                      <YAxis tick={{ fill: colors.text.secondary }} />
                      <Line 
                        type="monotone" 
                        dataKey="valence" 
                        stroke="#ef4444" 
                        strokeWidth={3} 
                        dot={{ fill: "#ef4444" }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        dot={{ fill: "#3b82f6" }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm" style={{ color: colors.text.secondary }}>
                        Happiness
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm" style={{ color: colors.text.secondary }}>
                        Energy
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "personality" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <Card 
                className="border"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}30, ${colors.primary}15)`,
                  borderColor: `${colors.primary}50`,
                }}
              >
                <CardContent className="p-8 text-center">
                  <selectedPersonality.icon 
                    size={64} 
                    weight="fill" 
                    style={{ color: colors.primary }} 
                    className="mx-auto mb-4" 
                  />
                  <h2 
                    className="text-3xl font-bold mb-2"
                    style={{ color: colors.text.primary }}
                  >
                    {selectedPersonality.type}
                  </h2>
                  <p 
                    className="mb-6"
                    style={{ color: colors.text.secondary }}
                  >
                    {selectedPersonality.description}
                  </p>
                  <div className="flex justify-center gap-2">
                    {selectedPersonality.traits.map((trait, idx) => (
                      <Badge 
                        key={idx} 
                        className="border-0 px-3 py-1"
                        style={{ 
                          backgroundColor: `${colors.primary}40`,
                          color: colors.text.primary,
                        }}
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {musicPersonalities
                  .filter((p) => p.type !== selectedPersonality.type)
                  .map((personality, idx) => (
                    <Card
                      key={idx}
                      className="border cursor-pointer transition-colors"
                      style={{ 
                        backgroundColor: colors.surface, 
                        borderColor: colors.border,
                      }}
                      onClick={() => setSelectedPersonality(personality)}
                    >
                      <CardContent className="p-6 text-center">
                        <personality.icon 
                          size={48} 
                          weight="duotone"
                          style={{ color: colors.text.secondary }} 
                          className="mx-auto mb-3" 
                        />
                        <h3 
                          className="font-semibold mb-2"
                          style={{ color: colors.text.primary }}
                        >
                          {personality.type}
                        </h3>
                        <p 
                          className="text-sm leading-relaxed"
                          style={{ color: colors.text.secondary }}
                        >
                          {personality.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              <Card 
                className="border"
                style={{ 
                  backgroundColor: `${colors.primary}15`,
                  borderColor: `${colors.primary}40`,
                }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: colors.primary }}
                      >
                        Share Your Sound Profile
                      </h3>
                      <p style={{ color: colors.text.secondary }}>
                        Let your friends discover their musical identity
                      </p>
                    </div>
                    <Button 
                      onClick={handleShare}
                      className="rounded-lg"
                      style={{ 
                        backgroundColor: colors.primary, 
                        color: colors.background,
                      }}
                    >
                      <ShareNetwork size={18} className="mr-2" />
                      Share Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}