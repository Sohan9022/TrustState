import React from 'react';

/**
 * TrustState Aerodynamic Nexus Shield Brand Mark
 * Crafted with continuous Bézier cyber-ribbons forming an impenetrable zero-trust
 * shield boundary and an illuminated cryptographic state lease core.
 */
export function TrustStateMark({ size = 32, className = "" }) {
  const uniqueId = React.useId().replace(/:/g, '');
  const emeraldId = `ts-nx-em-${uniqueId}`;
  const cyanId = `ts-nx-cy-${uniqueId}`;
  const glowId = `ts-nx-glow-${uniqueId}`;
  const shadowId = `ts-nx-sh-${uniqueId}`;

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
        {/* Vibrant Emerald Gradient (Trust & Zero-Trust Defense) */}
        <linearGradient id={emeraldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Electric Cyan Gradient (Runtime State & Execution Velocity) */}
        <linearGradient id={cyanId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Ambient Core Glow */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
        </radialGradient>

        {/* Specular Drop Shadow */}
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#10B981" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Ambient Ethereal Glow Backdrop */}
      <circle cx="32" cy="32" r="22" fill={`url(#${glowId})`} />

      {/* Left Defensive Wing & Top Crown (The 'Trust' Shield Anchor) */}
      <path
        d="M32 7 C34 7 50 14.5 53 16 C54.5 16.8 55 18.5 54 20 L48 24 C47 24.8 45.5 24.5 44.5 23.8 C41 21.5 35 19 32 19 C28 19 22 21.5 19 24 C17.5 25.2 16 27.5 16 31 C16 41 24 49 32 53 C34 54 34 54 32 57 C30.5 55.5 10 44 10 30 C10 21 17 13 32 7 Z"
        fill={`url(#${emeraldId})`}
        filter={`url(#${shadowId})`}
      />

      {/* Right Dynamic Wing & Lower Cradle (The 'State' Runtime Foundation) */}
      <path
        d="M32 57 C30 57 14 49.5 11 48 C9.5 47.2 9 45.5 10 44 L16 40 C17 39.2 18.5 39.5 19.5 40.2 C23 42.5 29 45 32 45 C36 45 42 42.5 45 40 C46.5 38.8 48 36.5 48 33 C48 23 40 15 32 11 C30 10 30 10 32 7 C33.5 8.5 54 20 54 34 C54 43 47 51 32 57 Z"
        fill={`url(#${cyanId})`}
      />

      {/* Central Verified Cryptographic Diamond Lease Node */}
      <polygon points="32,23 40,32 32,41 24,32" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="3.2" fill="#10B981" />
      <circle cx="32" cy="32" r="1.3" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Full Brand Lockup with Catchy Logo Mark + Wordmark + Version Badge
 */
export default function TrustStateLogo({
  size = 30,
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
