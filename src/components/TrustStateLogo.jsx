import React from 'react';

/**
 * TrustState Catchy Brand Logo Mark
 * Precision Cyber-Shield Monogram with Interlocking 'T' (Trust) and 'S' (State)
 * and an illuminated Central Cryptographic Lease Diamond.
 */
export function TrustStateMark({ size = 32, className = "" }) {
  const uniqueId = React.useId().replace(/:/g, '');
  const emeraldId = `ts-em-${uniqueId}`;
  const cyanId = `ts-cy-${uniqueId}`;
  const sparkId = `ts-spark-${uniqueId}`;
  const glowId = `ts-glow-${uniqueId}`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
    >
      <defs>
        {/* Emerald gradient for the protective Trust boundary & T-Crown */}
        <linearGradient id={emeraldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Electric Cyan gradient for the dynamic State runtime ribbon */}
        <linearGradient id={cyanId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Radiant core spark gradient for the cryptographic state node */}
        <linearGradient id={sparkId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        {/* Ambient neon drop shadow */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#10B981" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Layer 1: Outer Hex-Shield Attestation Track */}
      <path
        d="M32 4 L55 14 C55 14 56 32 55 36 C53 48 44 57 32 60 C20 57 11 48 9 36 C8 32 9 14 9 14 L32 4 Z"
        stroke={`url(#${emeraldId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.35"
        strokeDasharray="4 2"
      />

      {/* Layer 2: Top Shield Crown & Downward 'T' Anchor (Trust Element) */}
      <path
        d="M32 8.5 L51 17.5 L46 23.5 L36 18.5 V30 H28 V18.5 L18 23.5 L13 17.5 L32 8.5 Z"
        fill={`url(#${emeraldId})`}
        filter={`url(#${glowId})`}
      />

      {/* Layer 3: Dynamic Interlocking 'S' Ribbon (State Machine & Session Loop) */}
      <path
        d="M50 25 C50 20.5 46.5 17 41.5 17 H34 V21.5 H41 C43 21.5 45 23 45 25 C45 27.5 43 29 40 29.5 L32 31 C26.5 32 23 36 23 41.5 C23 47.5 27.5 52 34 52 H42 V47.5 H34.5 C30 47.5 28 45 28 42 C28 39.5 30.5 37.5 34 37 L42 35.5 C47.5 34.5 50 30.5 50 25 Z"
        fill={`url(#${cyanId})`}
      />

      {/* Layer 4: Lower Base Keystone */}
      <path
        d="M32 57.5 L24 50 L27.5 46.5 L32 50.5 L36.5 46.5 L40 50 L32 57.5 Z"
        fill={`url(#${emeraldId})`}
        opacity="0.9"
      />

      {/* Layer 5: Central Cryptographic Lease Diamond (Attestation Spark) */}
      <polygon
        points="32,26 36.5,31 32,36 27.5,31"
        fill={`url(#${sparkId})`}
      />
      <circle cx="32" cy="31" r="1.3" fill="#047857" />
    </svg>
  );
}

/**
 * Full Brand Lockup with Catchy Logo Mark + Wordmark + Version Badge
 */
export default function TrustStateLogo({
  size = 32,
  showText = true,
  showBadge = true,
  badgeText = "v2.0",
  className = "",
  textClassName = "",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center space-x-2.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Catchy Logo Mark with cyber glow container */}
      <div className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-slate-800/10 dark:from-emerald-500/20 dark:via-cyan-500/10 dark:to-slate-900/40 border border-emerald-500/20 dark:border-emerald-500/30 group-hover:border-emerald-500/50 group-hover:scale-105 transition-all shadow-sm">
        <TrustStateMark size={size} />
      </div>

      {/* Typography Wordmark */}
      {showText && (
        <div className="flex items-center space-x-2">
          <span className={`font-extrabold text-base tracking-tight text-slate-900 dark:text-white ${textClassName}`}>
            Trust
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              State
            </span>
          </span>

          {showBadge && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-500/30">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
