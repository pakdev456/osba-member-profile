import React from 'react';

interface DivisiIconProps {
  icon: string;
  color: string;
  size?: number;
}

export function DivisiIcon({ icon, color, size = 28 }: DivisiIconProps) {
  const icons: Record<string, React.ReactElement> = {
    ibadah: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M12 2a5 5 0 0 1 5 5v1H7V7a5 5 0 0 1 5-5z"/>
        <rect x="5" y="8" width="14" height="3" rx="1"/>
        <path d="M7 11v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8"/>
        <path d="M12 11v9"/>
      </svg>
    ),
    keamanan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V6l-8-4z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
 kebersihan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M3 6l9-4 9 4"/>
        <path d="M21 6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6"/>
        <path d="M8 22V12"/>
        <path d="M16 22V12"/>
        <path d="M12 22V12"/>
        <path d="M3 12h18"/>
      </svg>
    ),
     bahasa: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M2 5h7"/>
        <path d="M5 2v16"/>
        <path d="M5 17c2-2 5-3 8-1"/>
        <path d="M13 5l-2 8h9l-2-8"/>
        <path d="M11 13l-1 4"/>
        <path d="M22 13l-1 4"/>
      </svg>
    ),
    olahraga: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    perpustakaan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        <path d="M8 7h8"/>
        <path d="M8 11h8"/>
        <path d="M8 15h5"/>
      </svg>
    ),
    publikasi: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    humas: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    kesehatan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  };

  return (
    <span style={{ color }}>
      {icons[icon] ?? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={size} height={size}>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )}
    </span>
  );
}
