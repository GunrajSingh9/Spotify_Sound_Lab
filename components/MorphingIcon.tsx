"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Icon definitions using exactly 3 lines each
// Lines that aren't used collapse to center point {x1: 12, y1: 12, x2: 12, y2: 12}
type LineConfig = { x1: number; y1: number; x2: number; y2: number; opacity?: number };

const iconConfigs: Record<string, LineConfig[]> = {
  // Pulse - three zigzag segments
  pulse: [
    { x1: 4, y1: 12, x2: 8, y2: 12 },
    { x1: 8, y1: 12, x2: 12, y2: 4 },
    { x1: 12, y1: 4, x2: 20, y2: 20 },
  ],
  // Trend - up diagonal with arrow
  trend: [
    { x1: 4, y1: 16, x2: 12, y2: 8 },
    { x1: 12, y1: 8, x2: 16, y2: 12 },
    { x1: 16, y1: 12, x2: 16, y2: 4 },
  ],
  // Sparkle - star shape
  sparkle: [
    { x1: 12, y1: 2, x2: 12, y2: 22 },
    { x1: 2, y1: 12, x2: 22, y2: 12 },
    { x1: 5, y1: 5, x2: 19, y2: 19 },
  ],
  // Heart - two curves
  heart: [
    { x1: 12, y1: 21, x2: 4, y2: 12 },
    { x1: 4, y1: 12, x2: 12, y2: 4 },
    { x1: 12, y1: 4, x2: 20, y2: 12 },
  ],
  // Chart - bar chart
  chart: [
    { x1: 4, y1: 4, x2: 4, y2: 20 },
    { x1: 12, y1: 10, x2: 12, y2: 20 },
    { x1: 20, y1: 6, x2: 20, y2: 20 },
  ],
  // Music - note
  music: [
    { x1: 8, y1: 16, x2: 8, y2: 4 },
    { x1: 8, y1: 4, x2: 18, y2: 4 },
    { x1: 18, y1: 4, x2: 18, y2: 14 },
  ],
  // Disc - circle with line
  disc: [
    { x1: 12, y1: 2, x2: 12, y2: 10 },
    { x1: 12, y1: 14, x2: 12, y2: 22 },
    { x1: 2, y1: 12, x2: 22, y2: 12 },
  ],
  // Play - triangle
  play: [
    { x1: 5, y1: 3, x2: 5, y2: 21 },
    { x1: 5, y1: 3, x2: 19, y2: 12 },
    { x1: 5, y1: 21, x2: 19, y2: 12 },
  ],
  // Pause - two vertical bars
  pause: [
    { x1: 8, y1: 4, x2: 8, y2: 20 },
    { x1: 16, y1: 4, x2: 16, y2: 20 },
    { x1: 12, y1: 12, x2: 12, y2: 12, opacity: 0 },
  ],
  // Headphones - arch
  headphones: [
    { x1: 4, y1: 12, x2: 4, y2: 18 },
    { x1: 20, y1: 12, x2: 20, y2: 18 },
    { x1: 4, y1: 12, x2: 20, y2: 12 },
  ],
  // Fire - flame
  fire: [
    { x1: 12, y1: 22, x2: 6, y2: 14 },
    { x1: 6, y1: 14, x2: 12, y2: 2 },
    { x1: 12, y1: 2, x2: 18, y2: 14 },
  ],
  // Star - four points
  star: [
    { x1: 12, y1: 2, x2: 12, y2: 22 },
    { x1: 2, y1: 12, x2: 22, y2: 12 },
    { x1: 5, y1: 19, x2: 19, y2: 5 },
  ],
  // Crown - three points
  crown: [
    { x1: 2, y1: 8, x2: 7, y2: 4 },
    { x1: 7, y1: 4, x2: 17, y2: 4 },
    { x1: 17, y1: 4, x2: 22, y2: 8 },
  ],
  // Mask - face outline
  mask: [
    { x1: 4, y1: 8, x2: 4, y2: 16 },
    { x1: 4, y1: 16, x2: 20, y2: 16 },
    { x1: 20, y1: 16, x2: 20, y2: 8 },
  ],
  // Clock - circle with hands
  clock: [
    { x1: 12, y1: 12, x2: 12, y2: 6 },
    { x1: 12, y1: 12, x2: 17, y2: 12 },
    { x1: 12, y1: 2, x2: 12, y2: 2, opacity: 0 },
  ],
  // Lightning - bolt
  lightning: [
    { x1: 12, y1: 2, x2: 6, y2: 12 },
    { x1: 6, y1: 12, x2: 14, y2: 12 },
    { x1: 14, y1: 12, x2: 8, y2: 22 },
  ],
  // Share - connected dots
  share: [
    { x1: 6, y1: 8, x2: 18, y2: 8 },
    { x1: 18, y1: 8, x2: 18, y2: 16 },
    { x1: 6, y1: 16, x2: 18, y2: 16 },
  ],
  // Download - arrow down
  download: [
    { x1: 12, y1: 4, x2: 12, y2: 16 },
    { x1: 8, y1: 12, x2: 12, y2: 16 },
    { x1: 12, y1: 16, x2: 16, y2: 12 },
  ],
  // Check - checkmark
  check: [
    { x1: 4, y1: 12, x2: 9, y2: 17 },
    { x1: 9, y1: 17, x2: 20, y2: 6 },
    { x1: 12, y1: 12, x2: 12, y2: 12, opacity: 0 },
  ],
  // Equalizer - three bars
  equalizer: [
    { x1: 6, y1: 18, x2: 6, y2: 6 },
    { x1: 12, y1: 18, x2: 12, y2: 10 },
    { x1: 18, y1: 18, x2: 18, y2: 4 },
  ],
  // Calendar - grid
  calendar: [
    { x1: 4, y1: 8, x2: 20, y2: 8 },
    { x1: 4, y1: 14, x2: 20, y2: 14 },
    { x1: 4, y1: 4, x2: 20, y2: 4 },
  ],
  // User - person
  user: [
    { x1: 12, y1: 8, x2: 12, y2: 16 },
    { x1: 8, y1: 20, x2: 16, y2: 20 },
    { x1: 12, y1: 4, x2: 12, y2: 4, opacity: 0 },
  ],
  // Wifi - arcs
  wifi: [
    { x1: 4, y1: 10, x2: 12, y2: 4 },
    { x1: 12, y1: 4, x2: 20, y2: 10 },
    { x1: 12, y1: 18, x2: 12, y2: 22 },
  ],
  // Database - cylinder
  database: [
    { x1: 4, y1: 6, x2: 20, y2: 6 },
    { x1: 4, y1: 12, x2: 20, y2: 12 },
    { x1: 4, y1: 18, x2: 20, y2: 18 },
  ],
  // Cpu - chip
  cpu: [
    { x1: 6, y1: 6, x2: 18, y2: 6 },
    { x1: 6, y1: 18, x2: 18, y2: 18 },
    { x1: 6, y1: 6, x2: 6, y2: 18 },
  ],
  // Scan - box with lines
  scan: [
    { x1: 4, y1: 4, x2: 20, y2: 4 },
    { x1: 4, y1: 20, x2: 20, y2: 20 },
    { x1: 12, y1: 8, x2: 12, y2: 16 },
  ],
  // ArrowRight - arrow pointing right
  arrowRight: [
    { x1: 4, y1: 12, x2: 18, y2: 12 },
    { x1: 14, y1: 8, x2: 18, y2: 12 },
    { x1: 14, y1: 16, x2: 18, y2: 12 },
  ],
  // MusicNotes - double note
  musicNotes: [
    { x1: 8, y1: 16, x2: 8, y2: 4 },
    { x1: 16, y1: 14, x2: 16, y2: 4 },
    { x1: 8, y1: 4, x2: 16, y2: 4 },
  ],
};

interface MorphingIconProps {
  from: string;
  to: string;
  size?: number;
  color?: string;
  isHovered?: boolean;
  strokeWidth?: number;
}

export function MorphingIcon({
  from,
  to,
  size = 32,
  color = "#1DB954",
  isHovered = false,
  strokeWidth = 2,
}: MorphingIconProps) {
  const fromConfig = iconConfigs[from] || iconConfigs.pulse;
  const toConfig = iconConfigs[to] || iconConfigs.heart;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ overflow: "visible" }}
    >
      {[0, 1, 2].map((index) => {
        const fromLine = fromConfig[index] || { x1: 12, y1: 12, x2: 12, y2: 12 };
        const toLine = toConfig[index] || { x1: 12, y1: 12, x2: 12, y2: 12 };

        return (
          <motion.line
            key={index}
            x1={isHovered ? toLine.x1 : fromLine.x1}
            y1={isHovered ? toLine.y1 : fromLine.y1}
            x2={isHovered ? toLine.x2 : fromLine.x2}
            y2={isHovered ? toLine.y2 : fromLine.y2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{
              x1: isHovered ? toLine.x1 : fromLine.x1,
              y1: isHovered ? toLine.y1 : fromLine.y1,
              x2: isHovered ? toLine.x2 : fromLine.x2,
              y2: isHovered ? toLine.y2 : fromLine.y2,
              opacity: isHovered
                ? (toLine.opacity ?? 1)
                : (fromLine.opacity ?? 1),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
              delay: index * 0.03,
            }}
          />
        );
      })}
    </svg>
  );
}

// Preset icon pairs for common transitions
interface IconMorphPairProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
}

const iconMorphPairs: Record<string, { from: string; to: string }> = {
  pulse: { from: "pulse", to: "heart" },
  trend: { from: "trend", to: "chart" },
  sparkle: { from: "sparkle", to: "star" },
  heart: { from: "heart", to: "pulse" },
  music: { from: "music", to: "play" },
  play: { from: "play", to: "pause" },
  pause: { from: "pause", to: "play" },
  disc: { from: "disc", to: "music" },
  headphones: { from: "headphones", to: "music" },
  fire: { from: "fire", to: "star" },
  star: { from: "star", to: "crown" },
  crown: { from: "crown", to: "star" },
  mask: { from: "mask", to: "user" },
  clock: { from: "clock", to: "disc" },
  lightning: { from: "lightning", to: "fire" },
  share: { from: "share", to: "download" },
  download: { from: "download", to: "check" },
  check: { from: "check", to: "share" },
  equalizer: { from: "equalizer", to: "pulse" },
  calendar: { from: "calendar", to: "clock" },
  user: { from: "user", to: "mask" },
  wifi: { from: "wifi", to: "database" },
  database: { from: "database", to: "cpu" },
  cpu: { from: "cpu", to: "scan" },
  scan: { from: "scan", to: "check" },
  arrowRight: { from: "arrowRight", to: "download" },
  musicNotes: { from: "musicNotes", to: "disc" },
};

export function IconMorph({
  icon,
  size = 32,
  color = "#1DB954",
  className,
}: IconMorphPairProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pair = iconMorphPairs[icon] || { from: icon, to: icon };

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MorphingIcon
        from={pair.from}
        to={pair.to}
        size={size}
        color={color}
        isHovered={isHovered}
      />
    </div>
  );
}

// Hook for controlling morph state externally
export function useIconMorph(icon: string) {
  const [isHovered, setIsHovered] = useState(false);
  const pair = iconMorphPairs[icon] || { from: icon, to: icon };

  return {
    isHovered,
    setIsHovered,
    morphProps: {
      from: pair.from,
      to: pair.to,
      isHovered,
    },
  };
}

export { iconMorphPairs };
export type { IconMorphPairProps };
