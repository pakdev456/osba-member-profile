import React, { useState, useRef } from "react";
import type { Anggota } from "../types";
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

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Tombol Balik & Navigasi */}
      <div className="flex items-center justify-between w-full max-w-[340px] mb-4 px-2">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm border border-gray-200 transition-all active:scale-95"
          >
            ← Kembali
          </button>
        ) : <div />}
        
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isFlipped ? "Lihat Depan" : "Balik Kartu (3D)"}
        </button>
      </div>

      {/* Lanyard Clip / Gantungan ID Card Fisik */}
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
          {/* Card Border Frame Casing (Aluminum / Metallic Frame seperti di foto) */}
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
            {/* Header: Teks OSBA & Tahun */}
            <div className="pt-5 px-5 flex justify-between items-start z-10">
              <div className="text-left">
                <p className="text-[11px] font-extrabold text-gray-800 leading-tight">
                  Organisasi Santri Babussalam
                </p>
                <p className="text-[12px] font-black text-gray-900 tracking-wide">
                  2027
                </p>
              </div>
            </div>

            {/* Background Pattern Geometris Biru (Arabesque / Kufic Motif di sisi kiri & kanan) */}
            <div className="absolute inset-x-0 top-0 h-[68%] pointer-events-none opacity-90 overflow-hidden">
              {/* Pattern Kiri */}
              <svg
                className="absolute left-2 top-28 w-24 h-48 opacity-85 text-[#1e40af]"
                viewBox="0 0 100 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path d="M10 10 h40 v40 h-40 v-20 h20 v-10 h-10 v-10" />
                <path d="M50 50 h30 v30 h-30 v-15 h15 v-10" />
                <path d="M10 70 h30 v40 h-30 v-20 h15" />
                <path d="M50 110 h40 v40 h-40 v-20 h20" />
                <path d="M10 130 h40 v40 h-40 v-20 h20" />
              </svg>
              {/* Pattern Kanan */}
              <svg
                className="absolute right-2 top-10 w-24 h-48 opacity-85 text-[#1e40af]"
                viewBox="0 0 100 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path d="M20 20 h40 v40 h-40 v-20 h20 v-10 h-10 v-10" />
                <path d="M60 60 h30 v30 h-30 v-15 h15 v-10" />
                <path d="M20 80 h30 v40 h-30 v-20 h15" />
                <path d="M60 120 h35 v40 h-35 v-20 h18" />
              </svg>
            </div>

            {/* Bagian Tengah: Logo OSBA Resmi */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl shadow-sm border border-blue-50/80">
                <OsbaLogo size={82} color="#1d3461" />
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                {anggota.divisi}
              </p>
            </div>

            {/* Bagian Bawah: Blue Bar Elegan (Sesuai Foto ID Card) */}
            <div className="relative z-10 bg-gradient-to-r from-[#173b75] to-[#1d4ed8] text-white p-5 rounded-b-[1.7rem] shadow-lg">
              <div className="flex justify-between items-end">
                <div className="flex-1 pr-2">
                  {/* Nama Panggilan Besar */}
                  <h3 className="text-2xl font-black tracking-tight leading-none text-white drop-shadow-sm">
                    {anggota.panggilan || anggota.nama.split(" ")[0]}
                  </h3>
                  {/* Nama Lengkap */}
                  <p className="text-[12px] font-semibold text-blue-100 mt-1 truncate max-w-[190px]">
                    {anggota.nama}
                  </p>
                  {/* Nomor Santri */}
                  <p className="text-[11px] font-mono text-blue-200 mt-0.5 tracking-wide">
                    {anggota.nomorSantri || "002.1320.040"}
                  </p>

                  {/* Badge Divisi / Jabatan */}
                  <div className="mt-2.5 inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium text-white border border-white/30">
                    Member {anggota.divisi.replace("Divisi ", "")}
                  </div>
                </div>

                {/* QR Code Mini */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-gray-900" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h2v4h-2v-4zm2 2h2v2h-2v-2zm-6 0h2v2h-2v-2zm-4-6h2v2h-2v-2zm2 2h2v2h-2v-2z" />
                    </svg>
                  </div>
                  <span className="text-[7px] text-blue-200 mt-1 font-mono tracking-tighter">
                    babussalam.sch.id
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SISI BELAKANG (BACK)                                      */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[1.7rem] bg-white overflow-hidden flex flex-col justify-between p-5 text-gray-800"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Header Belakang: Kubah Ornamen Geometris Biru */}
            <div className="relative -mx-5 -mt-5 pt-3 pb-4 px-5 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 overflow-hidden text-center">
              {/* Motif Pattern Kubah */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h15v15H0zM15 15h15v15H15z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 mb-1">
                  <OsbaLogo size={24} color="#ffffff" />
                </div>
                <h4 className="text-white font-extrabold text-sm tracking-wide">
                  Organisasi Santri Babussalam
                </h4>
                <p className="text-blue-100 text-[10px] font-arabic mt-0.5" dir="rtl">
                  جمعية طلبة باب السلام
                </p>
              </div>
            </div>

            {/* Garis Pembatas */}
            <div className="w-full h-0.5 bg-blue-600 my-2" />

            {/* Informasi Alamat & Kontak Resmi Babussalam */}
            <div className="text-center flex flex-col gap-2 my-auto">
              <p className="text-[10px] leading-relaxed text-gray-600 font-medium px-2">
                Radar Auri, Jl Swadaya 3 No.40 Rt.005/011 Kel. Mekarsari, Kec. Cimanggis, Depok, Jawa Barat, Indonesia 16452
              </p>

              {/* Kontak Email & Media Sosial */}
              <div className="flex flex-col items-center gap-1 mt-1 text-[9px] text-gray-700 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span>✉️</span>
                  <span>babussalamsc27@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>📷</span>
                  <span>@babussalamsc</span>
                </div>
              </div>

              {/* Pernyataan Resmi ID Card */}
              <div className="mt-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[8.5px] leading-relaxed text-gray-500 italic">
                Kartu ini merupakan alat pengenal untuk pengurus <b>organisasi santri babussalam</b>, kartu ini berlaku sampai akhir masa jabatan, apabila menemukan kartu ini harap mengembalikannya kepada pengurus Osba atau pengurus Ponpes Babussalam.
              </div>
            </div>

            {/* Footer Website Resmi */}
            <div className="pt-2 border-t border-gray-100 text-center">
              <a
                href="https://babussalam.sch.id"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                Babussalam.sch.id
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Aksi Cepat Kunjungi Instagram Anggota */}
      {anggota.instagram && anggota.instagram !== "https://instagram.com/" && (
        <a
          href={anggota.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 no-underline"
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
