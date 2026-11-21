import React, { useState, useRef } from "react";
import type { Anggota } from "../types";
import { DivisiIcon } from "./DivisiIcon";
import { OsbaLogo } from "./OsbaLogo";

interface AnggotaCardProps {
  anggota: Anggota;
  warna: string;
  onBack?: () => void;
}

export function AnggotaCard({ anggota, warna, onBack }: AnggotaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Deteksi slug divisi untuk ikon divisi
  const divisiSlug =
    anggota.divisi?.toLowerCase().replace(/^divisi\s+/, "").trim() || "eksekutif";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  // Label jabatan untuk pill style
  const divisionCleanName = anggota.divisi.replace(/^Divisi\s+/i, "");

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Tombol Balik & Navigasi */}
      <div className="flex items-center justify-between w-full max-w-[340px] mb-4 px-2">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm border border-gray-200 transition-all active:scale-95 cursor-pointer"
          >
            ← Kembali
          </button>
        ) : <div />}
        
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isFlipped ? "Lihat Depan" : "Balik Kartu (3D)"}
        </button>
      </div>

      {/* Lanyard Clip / Gantungan ID Card Fisik Logam */}
      <div className="flex flex-col items-center -mb-3 z-20 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-400 via-gray-100 to-gray-300 border-2 border-gray-400/80 shadow-md flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-700/80 border border-amber-900/40 shadow-inner" />
        </div>
        <div className="w-4 h-6 border-2 border-gray-400 bg-white/50 backdrop-blur-xs rounded-xs -mt-1 shadow-xs flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full border border-gray-400 bg-gray-200" />
        </div>
      </div>

      {/* 3D Scene Wrapper */}
      <div
        style={{ perspective: 1200 }}
        className="w-full max-w-[340px] aspect-[1/1.62] cursor-grab active:cursor-grabbing"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full h-full rounded-[1.8rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300"
        >
          {/* Card Border Frame Casing (Aluminum / Metallic Frame seperti di foto fisik) */}
          <div
            className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 -z-10 shadow-inner border border-gray-300"
            style={{ transform: "translateZ(-2px)" }}
          />

          {/* Hologram / Specular Glare Effect */}
          <div
            className="absolute inset-0 rounded-[1.8rem] z-30 pointer-events-none transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 65%)`,
            }}
          />

          {/* ========================================================= */}
          {/* SISI DEPAN (FRONT)                                       */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[1.7rem] bg-white overflow-hidden flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            {/* Header: Teks OSBA & Tahun 2027 */}
            <div className="pt-4 px-5 flex justify-between items-start z-10">
              <div className="text-left">
                <p className="text-[10px] font-extrabold text-gray-800 leading-tight">
                  Organisasi Santri Babussalam
                </p>
                <p className="text-[11px] font-black text-gray-900 tracking-wide">
                  2027
                </p>
              </div>
            </div>

            {/* Pattern Kotak-Kotak Geometris (Ornamen Kufic Lebat Kiri & Kanan Persis di Foto) */}
            {/* Sisi Kiri */}
            <svg
              className="absolute left-0 top-24 w-28 h-56 pointer-events-none text-[#1d4ed8] opacity-90"
              viewBox="0 0 120 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="square"
            >
              <path d="M10 10 h50 v50 h-50 v-25 h25 v-12 h-12" />
              <path d="M60 10 h45 v45 h-45 v-20 h20" />
              <path d="M10 70 h50 v50 h-50 v-25 h25 v-12" />
              <path d="M70 65 h40 v50 h-40 v-25 h20" />
              <path d="M10 130 h50 v50 h-50 v-25 h25 v-12" />
              <path d="M70 125 h40 v50 h-40 v-25 h20" />
              <path d="M10 190 h50 v45 h-50 v-20 h25" />
              <path d="M70 185 h40 v45 h-40 v-20 h20" />
            </svg>

            {/* Sisi Kanan */}
            <svg
              className="absolute right-0 top-12 w-28 h-56 pointer-events-none text-[#1d4ed8] opacity-90"
              viewBox="0 0 120 240"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="square"
            >
              <path d="M110 10 h-50 v50 h50 v-25 h-25 v-12 h12" />
              <path d="M50 10 h-40 v45 h40 v-20 h-20" />
              <path d="M110 70 h-50 v50 h50 v-25 h-25 v-12" />
              <path d="M50 65 h-40 v50 h40 v-25 h-20" />
              <path d="M110 130 h-50 v50 h50 v-25 h-25 v-12" />
              <path d="M50 125 h-40 v50 h40 v-25 h-20" />
              <path d="M110 190 h-50 v45 h50 v-20 h-25" />
              <path d="M50 185 h-40 v45 h40 v-20 h-20" />
            </svg>

            {/* Bagian Tengah: Logo Divisi Tanpa Teks di Bawahnya */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="p-4 bg-white/95 backdrop-blur-xs rounded-3xl shadow-md border border-blue-100 flex items-center justify-center text-blue-700">
                <DivisiIcon icon={divisiSlug} color={warna || "#1d4ed8"} size={68} />
              </div>
            </div>

            {/* Bagian Bawah: Blue Bar Elegan (Sesuai Foto ID Card) */}
            <div className="relative z-10 bg-gradient-to-r from-[#143468] via-[#173e80] to-[#1e4eb8] text-white p-5 rounded-b-[1.7rem] shadow-xl">
              <div className="flex flex-col gap-1.5">
                {/* Baris Atas: Nama Panggilan Besar & Domain di Kanan Atas */}
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-black tracking-tight leading-none text-white drop-shadow-sm">
                    {anggota.panggilan || anggota.nama.split(" ")[0]}
                  </h3>
                  <a
                    href="https://babussalam.sch.id"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[12px] font-bold text-blue-200 hover:text-white transition-colors tracking-wide underline underline-offset-2"
                  >
                    babussalam.sch.id
                  </a>
                </div>

                {/* Nama Lengkap */}
                <p className="text-[12px] font-medium text-blue-100 truncate max-w-[280px]">
                  {anggota.nama}
                </p>

                {/* Nomor Santri */}
                <p className="text-[11px] font-mono text-blue-300 tracking-wider">
                  {anggota.nomorSantri || "-"}
                </p>

                {/* Button Member Pill (Bentuk Pill Oval dengan Outer Ring & Fill Putih di Kanan) */}
                <div className="mt-2 flex items-center">
                  <div className="inline-flex items-center rounded-full border border-white/50 p-[2px] bg-white/10 backdrop-blur-xs shadow-xs">
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold text-white/95">
                      Member
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-gray-900 bg-white rounded-full shadow-xs">
                      {divisionCleanName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SISI BELAKANG (BACK) - Sesuai Persis dengan Gambar 2       */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[1.7rem] bg-white overflow-hidden flex flex-col justify-between p-5 text-gray-800"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Background Ornamen Geometris Biru Penuh di Sisi Atas */}
            <div className="absolute inset-x-0 top-0 h-36 bg-[#1e40af] overflow-hidden pointer-events-none">
              <svg
                className="w-full h-full text-white opacity-40"
                viewBox="0 0 340 144"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path d="M10 10 h40 v40 h-40 v-20 h20 M70 10 h40 v40 h-40 v-20 h20 M130 10 h40 v40 h-40 v-20 h20 M190 10 h40 v40 h-40 v-20 h20 M250 10 h40 v40 h-40 v-20 h20 M310 10 h40 v40 h-40 v-20 h20" />
                <path d="M30 60 h40 v40 h-40 v-20 h20 M90 60 h40 v40 h-40 v-20 h20 M150 60 h40 v40 h-40 v-20 h20 M210 60 h40 v40 h-40 v-20 h20 M270 60 h40 v40 h-40 v-20 h20" />
              </svg>
            </div>

            {/* Header Lengkungan Kubah Putih (Arch Mosque) */}
            <div className="relative z-10 -mx-5 -mt-5 pt-7 pb-4 px-5">
              <div
                className="bg-white rounded-t-[2.5rem] pt-3 pb-2 px-4 shadow-sm border-t border-gray-100 flex items-center justify-center gap-3"
                style={{
                  clipPath: "ellipse(95% 85% at 50% 85%)",
                }}
              >
                {/* Logo Masjid OSBA */}
                <div className="shrink-0">
                  <OsbaLogo size={42} color="#1d4ed8" />
                </div>
                {/* Teks Organisasi Santri Babussalam */}
                <div className="text-left">
                  <p className="text-[12px] font-black text-gray-900 leading-tight">
                    Organisasi
                  </p>
                  <p className="text-[12px] font-black text-gray-900 leading-tight">
                    Santri
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[12px] font-black text-gray-900 leading-tight">
                      Babussalam
                    </span>
                    <span className="text-[10px] font-arabic text-gray-700 font-bold" dir="rtl">
                      جمعية طلبة باب السلام
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Garis Horizontal Biru Panjang */}
            <div className="w-full h-[2.5px] bg-[#1d4ed8] my-1 rounded-full" />

            {/* Konten Belakang: Alamat, Email, Instagram, Pernyataan */}
            <div className="flex flex-col justify-around flex-1 my-1 px-1">
              {/* Alamat Lengkap */}
              <p className="text-[9.5px] leading-relaxed text-gray-700 text-center font-medium">
                Radar Auri, Jl Swadaya 3 No.40 Rt.005/011 Kel. Mekarsari, Kec. Cimanggis, Depok, Jawa Barat, Indonesia 16452
              </p>

              {/* Email & Instagram dengan Ikon */}
              <div className="flex flex-col items-center gap-1.5 my-2">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-800">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-600">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>babussalamsc27@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-800">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-600">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>@babussalamsc</span>
                </div>
              </div>

              {/* Teks Pernyataan Resmi ID Card Pengurus */}
              <p className="text-[9px] leading-normal text-gray-600 text-center font-normal px-2">
                Kartu ini merupakan alat pengenal untuk pengurus{" "}
                <b className="font-bold text-gray-800">organisasi santri babussalam</b>, kartu ini berlaku sampai akhir masa jabatan, apabila menemukan kartu ini harap mengembalikannya kepada pengurus Osba atau pengurus Ponpes Babussalam
              </p>
            </div>

            {/* Footer Belakang: Babussalam.sch.id (Teks Lebih Besar dengan Garis Bawah Biru) */}
            <div className="pt-2 pb-1 border-t border-gray-100 flex flex-col items-center">
              <a
                href="https://babussalam.sch.id"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[13px] font-extrabold text-[#1d4ed8] hover:underline tracking-wide"
              >
                Babussalam.sch.id
              </a>
              <div className="w-16 h-0.5 bg-[#1d4ed8] mt-0.5 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Kunjungi Instagram Anggota */}
      {anggota.instagram && anggota.instagram !== "https://instagram.com/" && (
        <a
          href={anggota.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 no-underline cursor-pointer"
          style={{ backgroundColor: warna }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          Profil Instagram {anggota.panggilan || anggota.nama.split(" ")[0]}
        </a>
      )}
    </div>
  );
}
