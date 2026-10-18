// High-fidelity Logo Presets matching the user's uploaded assets:
// 1250x720_beyaz.png, 1250x720_siyah.png, and the OE_logo variations

export interface LogoPreset {
  id: string;
  name: string;
  description: string;
  bgType: 'light' | 'dark';
  accentColor: string;
  url: string;
}

// Generate inline SVG Data-URIs that render perfectly crisp in any <img> tag
const makeLogoSvgDataUri = (options: {
  bg: string;
  ringStroke: string;
  emblemColor1: string;
  emblemColor2: string;
  textColor: string;
  isWide?: boolean;
}) => {
  const { bg, ringStroke, emblemColor1, emblemColor2, textColor, isWide } = options;

  if (isWide) {
    // 1250x720 ratio (500x288 viewBox)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 288" width="500" height="288">
      <rect width="500" height="288" fill="${bg}" rx="16"/>
      <defs>
        <linearGradient id="grad-wide" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${emblemColor1}"/>
          <stop offset="100%" stop-color="${emblemColor2}"/>
        </linearGradient>
      </defs>
      <!-- Circular emblem with outer ring -->
      <g transform="translate(110, 144)">
        <circle cx="0" cy="0" r="62" fill="${bg === '#000000' ? '#000000' : '#FFFFFF'}" stroke="${ringStroke}" stroke-width="10"/>
        <path d="M -36 -24 A 44 44 0 0 0 -36 24" stroke="${ringStroke}" stroke-width="2" stroke-opacity="0.4" fill="none"/>
        <path d="M 36 -24 A 44 44 0 0 1 36 24" stroke="${ringStroke}" stroke-width="2" stroke-opacity="0.4" fill="none"/>
        <circle cx="0" cy="0" r="38" fill="url(#grad-wide)"/>
        <rect x="-26" y="-16" width="52" height="7" fill="${bg}" rx="3.5"/>
        <rect x="-42" y="-9" width="84" height="20" rx="10" fill="url(#grad-wide)"/>
        <rect x="-26" y="-1" width="12" height="3.5" rx="1.7" fill="#FFFFFF"/>
        <rect x="18" y="-4" width="3.5" height="10" rx="1.7" fill="#FFFFFF"/>
        <rect x="15" y="-1" width="9.5" height="3.5" rx="1.7" fill="#FFFFFF"/>
        <path d="M 10 18 Q 24 14 26 8" stroke="${bg}" stroke-width="7" stroke-linecap="round" fill="none"/>
      </g>
      <!-- Text Wordmark -->
      <g transform="translate(205, 134)" fill="${textColor}" font-family="system-ui, -apple-system, sans-serif" font-weight="900">
        <text x="0" y="0" font-size="36" letter-spacing="0.5">OYUN</text>
        <text x="0" y="32" font-size="28" letter-spacing="0.5">EKİPMAN<tspan font-weight="700" fill-opacity="0.75" font-size="22">.COM</tspan></text>
      </g>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // Circular Icon (Badge) 200x200
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="${bg}" rx="32"/>
    <defs>
      <linearGradient id="grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${emblemColor1}"/>
        <stop offset="100%" stop-color="${emblemColor2}"/>
      </linearGradient>
    </defs>
    <g transform="translate(100, 100)">
      <circle cx="0" cy="0" r="74" fill="${bg === '#000000' ? '#000000' : '#FFFFFF'}" stroke="${ringStroke}" stroke-width="12"/>
      <path d="M -44 -28 A 54 54 0 0 0 -44 28" stroke="${ringStroke}" stroke-width="2.5" stroke-opacity="0.4" fill="none"/>
      <path d="M 44 -28 A 54 54 0 0 1 44 28" stroke="${ringStroke}" stroke-width="2.5" stroke-opacity="0.4" fill="none"/>
      <circle cx="0" cy="0" r="46" fill="url(#grad-icon)"/>
      <rect x="-32" y="-20" width="64" height="9" fill="${bg}" rx="4.5"/>
      <rect x="-52" y="-11" width="104" height="25" rx="12.5" fill="url(#grad-icon)"/>
      <rect x="-32" y="-1.5" width="15" height="4.5" rx="2.2" fill="#FFFFFF"/>
      <rect x="22" y="-5.5" width="4.5" height="13" rx="2.2" fill="#FFFFFF"/>
      <rect x="18" y="-1.5" width="12" height="4.5" rx="2.2" fill="#FFFFFF"/>
      <path d="M 12 22 Q 29 17 31 10" stroke="${bg}" stroke-width="9" stroke-linecap="round" fill="none"/>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const LOGO_PRESETS: LogoPreset[] = [
  {
    id: '1250x720_beyaz',
    name: '1250x720_beyaz.png (Tam Logo - Açık Zemin)',
    description: 'Kullanıcının yüklediği beyaz arka planlı, mor joystick amblemli ve siyah tipografili tam yatay logo.',
    bgType: 'light',
    accentColor: '#7C3AED',
    url: makeLogoSvgDataUri({
      bg: '#FFFFFF',
      ringStroke: '#0F172A',
      emblemColor1: '#8B5CF6',
      emblemColor2: '#581C87',
      textColor: '#0F172A',
      isWide: true,
    }),
  },
  {
    id: '1250x720_siyah',
    name: '1250x720_siyah.png (Tam Logo - Koyu Zemin)',
    description: 'Kullanıcının yüklediği siyah arka planlı, mor joystick amblemli ve beyaz tipografili tam yatay logo.',
    bgType: 'dark',
    accentColor: '#8B5CF6',
    url: makeLogoSvgDataUri({
      bg: '#000000',
      ringStroke: '#FFFFFF',
      emblemColor1: '#8B5CF6',
      emblemColor2: '#581C87',
      textColor: '#FFFFFF',
      isWide: true,
    }),
  },
  {
    id: 'OE_logo_W_P',
    name: 'OE_logo_W_P.png (Beyaz Zemin, Mor Rozet)',
    description: 'Beyaz arka plan üzerinde mor gradyanlı oyunekipman amblemi.',
    bgType: 'light',
    accentColor: '#7C3AED',
    url: makeLogoSvgDataUri({
      bg: '#FFFFFF',
      ringStroke: '#0F172A',
      emblemColor1: '#8B5CF6',
      emblemColor2: '#581C87',
      textColor: '#0F172A',
    }),
  },
  {
    id: 'OE_logo_B_P',
    name: 'OE_logo_B_P.png (Siyah Zemin, Mor Rozet)',
    description: 'Siyah arka plan üzerinde mor gradyanlı oyunekipman amblemi.',
    bgType: 'dark',
    accentColor: '#8B5CF6',
    url: makeLogoSvgDataUri({
      bg: '#000000',
      ringStroke: '#FFFFFF',
      emblemColor1: '#8B5CF6',
      emblemColor2: '#581C87',
      textColor: '#FFFFFF',
    }),
  },
  {
    id: 'OE_logo_W_O',
    name: 'OE_logo_W_O.png (Beyaz Zemin, Turuncu Rozet)',
    description: 'Beyaz arka plan üzerinde turuncu gradyanlı espor amblemi.',
    bgType: 'light',
    accentColor: '#F97316',
    url: makeLogoSvgDataUri({
      bg: '#FFFFFF',
      ringStroke: '#0F172A',
      emblemColor1: '#FB923C',
      emblemColor2: '#EA580C',
      textColor: '#0F172A',
    }),
  },
  {
    id: 'OE_logo_B_O',
    name: 'OE_logo_B_O.png (Siyah Zemin, Turuncu Rozet)',
    description: 'Siyah arka plan üzerinde turuncu gradyanlı espor amblemi.',
    bgType: 'dark',
    accentColor: '#EA580C',
    url: makeLogoSvgDataUri({
      bg: '#000000',
      ringStroke: '#FFFFFF',
      emblemColor1: '#FB923C',
      emblemColor2: '#EA580C',
      textColor: '#FFFFFF',
    }),
  },
  {
    id: 'OE_logo_W_B',
    name: 'OE_logo_W_B.png (Beyaz Zemin, Kobalt Mavi Rozet)',
    description: 'Beyaz arka plan üzerinde mavi gradyanlı kurumsal amblem.',
    bgType: 'light',
    accentColor: '#2563EB',
    url: makeLogoSvgDataUri({
      bg: '#FFFFFF',
      ringStroke: '#0F172A',
      emblemColor1: '#60A5FA',
      emblemColor2: '#1D4ED8',
      textColor: '#0F172A',
    }),
  },
  {
    id: 'OE_logo_B_B',
    name: 'OE_logo_B_B.png (Siyah Zemin, Kobalt Mavi Rozet)',
    description: 'Siyah arka plan üzerinde mavi gradyanlı kurumsal amblem.',
    bgType: 'dark',
    accentColor: '#3B82F6',
    url: makeLogoSvgDataUri({
      bg: '#000000',
      ringStroke: '#FFFFFF',
      emblemColor1: '#60A5FA',
      emblemColor2: '#1D4ED8',
      textColor: '#FFFFFF',
    }),
  },
];
