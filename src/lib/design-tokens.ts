/**
 * Conveo Design System Tokens
 * Strictly adhering to Design.md (Light - Conveo Enterprise) & Design.md(1) (Dark - Operational High-Density)
 */

export const colors = {
  light: {
    surface: '#faf8ff',
    surfaceDim: '#d2d9f4',
    surfaceBright: '#faf8ff',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f2f3ff',
    surfaceContainer: '#eaedff',
    surfaceContainerHigh: '#e1e7ff',
    surfaceContainerHighest: '#dae2fc',
    onSurface: '#131b2e',
    onSurfaceVariant: '#464554',
    inverseSurface: '#283044',
    inverseOnSurface: '#eef0ff',
    outline: '#767586',
    outlineVariant: '#c6c5d7',
    surfaceTint: '#484bd6',
    primary: '#2c2abc',
    onPrimary: '#ffffff',
    primaryContainer: '#4648d4',
    onPrimaryContainer: '#d1d1ff',
    inversePrimary: '#c0c1ff',
    secondary: '#516072',
    onSecondary: '#ffffff',
    secondaryContainer: '#d1e1f7',
    onSecondaryContainer: '#556476',
    tertiary: '#6d3600',
    onTertiary: '#ffffff',
    tertiaryContainer: '#904900',
    onTertiaryContainer: '#ffcaa6',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',
    background: '#faf8ff',
    onBackground: '#131b2e',
    surfaceVariant: '#dae2fc',
    surfaceMain: '#faf8ff',
    surfaceSidebar: '#f2f3ff',
    surfaceGlass: 'rgba(250, 248, 255, 0.8)',
    borderSubtle: '#c7c4d7',
    statusSuccess: '#10b981',
    statusError: '#ba1a1a',
  },
  dark: {
    surface: '#131313',
    surfaceDim: '#131313',
    surfaceBright: '#3a3939',
    surfaceContainerLowest: '#0e0e0e',
    surfaceContainerLow: '#1c1b1b',
    surfaceContainer: '#201f1f',
    surfaceContainerHigh: '#2a2a2a',
    surfaceContainerHighest: '#353534',
    onSurface: '#e5e2e1',
    onSurfaceVariant: '#c7c4d7',
    inverseSurface: '#e5e2e1',
    inverseOnSurface: '#313030',
    outline: '#908fa0',
    outlineVariant: '#464554',
    surfaceTint: '#c0c1ff',
    primary: '#c0c1ff',
    onPrimary: '#1000a9',
    primaryContainer: '#8083ff',
    onPrimaryContainer: '#0d0096',
    inversePrimary: '#494bd6',
    secondary: '#4edea3',
    onSecondary: '#003824',
    secondaryContainer: '#00a572',
    onSecondaryContainer: '#00311f',
    tertiary: '#ffb2b7',
    onTertiary: '#67001b',
    tertiaryContainer: '#ff516a',
    onTertiaryContainer: '#5b0017',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    background: '#131313',
    onBackground: '#e5e2e1',
    surfaceVariant: '#353534',
    deepSlate: '#0a0a0a',
    surfaceSidebar: '#111111',
    surfaceCard: '#1a1a1a',
    statusLive: '#10b981',
    statusError: '#f43f5e',
    indigoAccent: '#6366f1',
    borderLow: 'rgba(255, 255, 255, 0.1)',
    borderHigh: 'rgba(255, 255, 255, 0.2)',
  },
} as const

export const typography = {
  displayLg: 'text-[48px] font-semibold leading-[56px] tracking-[-0.02em]',
  headlineLg: 'text-[32px] font-semibold leading-[40px] tracking-[-0.02em]',
  headlineMd: 'text-[24px] font-semibold leading-[32px] tracking-[-0.01em]',
  titleSm: 'text-[18px] font-medium leading-[28px]',
  bodyLg: 'text-[16px] font-normal leading-[24px]',
  bodyMd: 'text-[14px] font-normal leading-[20px]',
  labelMd: 'text-[14px] font-medium leading-[20px] tracking-[0.02em]',
  labelSm: 'text-[12px] font-medium leading-[16px] tracking-[0.02em] uppercase',
  code: 'font-mono text-[14px] font-normal leading-[20px]',
} as const

export const rounded = {
  sm: 'rounded-sm', // 0.25rem
  default: 'rounded', // 0.5rem
  md: 'rounded-md', // 0.75rem
  lg: 'rounded-lg', // 1rem
  xl: 'rounded-xl', // 1.5rem
  full: 'rounded-full', // 9999px
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  marginDesktop: '40px',
  sidebarWidth: '280px',
  touchTargetMin: '48px',
} as const

export const shadows = {
  sm: 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
  md: 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]',
  lg: 'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]',
  glowIndigo: 'shadow-[0_0_20px_rgba(99,102,241,0.25)]',
  glowLive: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
} as const
