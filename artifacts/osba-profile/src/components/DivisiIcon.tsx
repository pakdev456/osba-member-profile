import React from 'react';

interface DivisiIconProps {
  icon: string;
  color: string;
  size?: number;
}

export function DivisiIcon({ icon, color, size = 28 }: DivisiIconProps) {
  const normIcon = icon?.toLowerCase().trim() || "";

  const icons: Record<string, React.ReactElement> = {
    // 1. BPH (Ikon Masjid)
    bph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        {/* Kubah Utama */}
        <path d="M12 2c-1.5 2-4 3.5-4 6h8c0-2.5-2.5-4-4-6z" fill="currentColor" fillOpacity="0.15" />
        {/* Minaret & Dinding */}
        <path d="M4 10v11M20 10v11M8 8v13M16 8v13" />
        {/* Kubah kecil samping */}
        <path d="M4 10c0-1.5 1-2.5 2-3 1 .5 2 1.5 2 3M16 10c0-1.5 1-2.5 2-3 1 .5 2 1.5 2 3" />
        {/* Pintu Gerbang Lengkung */}
        <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
        {/* Garis Dasar */}
        <path d="M2 21h20" />
      </svg>
    ),
    eksekutif: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M12 2c-1.5 2-4 3.5-4 6h8c0-2.5-2.5-4-4-6z" fill="currentColor" fillOpacity="0.15" />
        <path d="M4 10v11M20 10v11M8 8v13M16 8v13" />
        <path d="M4 10c0-1.5 1-2.5 2-3 1 .5 2 1.5 2 3M16 10c0-1.5 1-2.5 2-3 1 .5 2 1.5 2 3" />
        <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
        <path d="M2 21h20" />
      </svg>
    ),

    // 2. Ibadah (Ikon Bulan Sabit / Crescent Moon)
    ibadah: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.15" />
        {/* Bintang kecil pelengkap */}
        <circle cx="17" cy="8" r="1.5" fill="currentColor" />
      </svg>
    ),

    // 3. Keamanan (Ikon Perisai / Shield)
    keamanan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),

    // 4. Kebersihan (Ikon Daun / Leaf)
    kebersihan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.6 2 8.9a7 7 0 0 1-14 0z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 20c0-6.5 3.5-10 7-12" />
      </svg>
    ),

    // 5. Bahasa (Ikon Huruf Hamzah ء / Kaligrafi Hamzah Arab)
    bahasa: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        {/* Bentuk Hamzah Arab Elegan */}
        <path d="M13.8 6.2c-1.2-.8-2.6-.9-3.8-.3-1.6.8-2.5 2.5-2.2 4.2.2 1.3 1.1 2.3 2.3 2.7l-4.5 3.8c-.5.4-.6 1.1-.2 1.6.4.5 1.1.6 1.6.2l5.8-4.9c.4-.3.6-.8.5-1.3-.1-.5-.5-.9-1-.9h-1.2c-1-.2-1.6-.9-1.7-1.7-.1-.9.4-1.8 1.3-2.2.7-.3 1.5-.2 2.1.2.4.3 1 .2 1.3-.2.3-.4.2-1-.2-1.3z" />
        <path d="M7 19.5h10c.6 0 1-.4 1-1s-.4-1-1-1H7c-.6 0-1 .4-1 1s.4 1 1 1z" />
      </svg>
    ),

    // 6. Olahraga (Ikon Petir / Lightning)
    olahraga: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),

    // 7. Perpustakaan (Ikon Buku / Dokumen Terbuka)
    perpustakaan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="currentColor" fillOpacity="0.15" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),

    // 8. Kreatif / Publikasi (Ikon Pesawat Kertas / Paper Plane)
    kreatif: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),
    publikasi: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),

    // 9. Humas (Ikon Siluet Dua Orang / Two People)
    humas: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.15" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),

    // 10. Kesehatan (Ikon Logo Rumah Sakit / Hospital Cross)
    kesehatan: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        {/* Lingkaran / Shield pelindung */}
        <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
        {/* Palang Merah / Hospital Cross */}
        <path d="M12 7v10M7 12h10" strokeWidth="3" strokeLinecap="square" />
      </svg>
    ),
  };

  return (
    <span style={{ color }}>
      {icons[normIcon] ?? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={size} height={size}>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )}
    </span>
  );
}
