import React from 'react';
import { BrandingSettings } from '../types';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  branding?: BrandingSettings;
  location?: 'navbar' | 'footer' | 'favicon';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
  branding,
  location = 'navbar',
}) => {
  // Height sizing in pixels
  const heightPx = size === 'sm' ? 28 : size === 'lg' ? 44 : size === 'xl' ? 56 : 38;

  // Resolve custom image URL depending on location and theme
  let customImg: string | undefined;

  if (location === 'footer') {
    customImg = branding?.footerLogoUrl || (theme === 'dark' ? branding?.darkLogoUrl : branding?.lightLogoUrl);
  } else if (location === 'favicon') {
    customImg = branding?.faviconUrl || (theme === 'dark' ? branding?.darkLogoUrl : branding?.lightLogoUrl);
  } else {
    // Default: navbar
    customImg = branding?.navbarLogoUrl || (theme === 'dark' ? branding?.darkLogoUrl : branding?.lightLogoUrl);
  }

  // If image is provided (PNG / JPEG / DataURI), render purely the image with proportional object-contain
  if (customImg) {
    return (
      <div className={`flex items-center select-none shrink-0 ${className}`}>
        <img
          src={customImg}
          alt={branding?.brandTitle || 'oyunekipman.com'}
          style={{ height: heightPx, width: 'auto', maxHeight: heightPx }}
          className="object-contain max-w-[240px] transition-all"
        />
      </div>
    );
  }

  // Fallback crisp SVG emblem (NO TEXT beside it, as explicitly requested)
  return (
    <div className={`flex items-center select-none shrink-0 ${className}`}>
      <svg
        width={heightPx}
        height={heightPx}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <defs>
          <linearGradient id="oe-purple-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="60%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          <linearGradient id="oe-pill-main" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>

        {/* Outer Circular Ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill={theme === 'dark' ? '#000000' : '#FFFFFF'}
          stroke={theme === 'dark' ? '#FFFFFF' : '#0F172A'}
          strokeWidth="8"
        />

        {/* Orbital Guide Brackets */}
        <path
          d="M 28 42 A 40 40 0 0 0 28 78"
          stroke={theme === 'dark' ? '#FFFFFF' : '#0F172A'}
          strokeWidth="1.5"
          strokeOpacity="0.35"
          fill="none"
        />
        <path
          d="M 92 42 A 40 40 0 0 1 92 78"
          stroke={theme === 'dark' ? '#FFFFFF' : '#0F172A'}
          strokeWidth="1.5"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Controller 'e' Circular Head */}
        <circle cx="60" cy="60" r="34" fill="url(#oe-purple-main)" />

        {/* Inner cutout */}
        <rect x="36" y="45" width="48" height="6" fill={theme === 'dark' ? '#000000' : '#FFFFFF'} rx="3" />

        {/* Central Gamepad Bar */}
        <rect x="22" y="52" width="76" height="18" rx="9" fill="url(#oe-pill-main)" />

        {/* Left '-' button */}
        <rect x="36" y="59.5" width="10" height="3" rx="1.5" fill="#FFFFFF" />

        {/* Right '+' button */}
        <rect x="75" y="57" width="3" height="8" rx="1" fill="#FFFFFF" />
        <rect x="72.5" y="59.5" width="8" height="3" rx="1" fill="#FFFFFF" />

        {/* Lower cut-away gap */}
        <path
          d="M 68 76 Q 80 72 82 66"
          stroke={theme === 'dark' ? '#000000' : '#FFFFFF'}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
