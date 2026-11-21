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
  // Rotasi kartu 3D bebas rotasi Y terus menerus saat digeser (drag/swipe)
  const [currentRotY, setCurrentRotY] = useState(0);
  const [dragOffsetRotY, setDragOffsetRotY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const hasDragged = useRef<boolean>(false);

  // Total rotasi Y saat ini (derajat)
  const totalRotY = currentRotY + dragOffsetRotY;

  // Menentukan sisi mana yang sedang menghadap user
  const normalizedAngle = (((totalRotY % 360) + 360) % 360);
  const isBackFacing = normalizedAngle > 90 && normalizedAngle < 270;

  // Deteksi slug divisi untuk ikon divisi
  const rawDivisi = anggota.divisi?.toLowerCase() || "";
  let divisiSlug = "bph";
  if (rawDivisi.includes("ibadah")) divisiSlug = "ibadah";
  else if (rawDivisi.includes("keamanan")) divisiSlug = "keamanan";
  else if (rawDivisi.includes("kebersihan")) divisiSlug = "kebersihan";
  else if (rawDivisi.includes("bahasa")) divisiSlug = "bahasa";
  else if (rawDivisi.includes("olahraga")) divisiSlug = "olahraga";
  else if (rawDivisi.includes("perpustakaan")) divisiSlug = "perpustakaan";
  else if (rawDivisi.includes("kreatif") || rawDivisi.includes("publikasi")) divisiSlug = "kreatif";
  else if (rawDivisi.includes("humas")) divisiSlug = "humas";
  else if (rawDivisi.includes("kesehatan")) divisiSlug = "kesehatan";
  else if (rawDivisi.includes("bph") || rawDivisi.includes("eksekutif")) divisiSlug = "bph";

  // Mouse Move Tilt biasa saat kursor melayang (hover tanpa drag)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 14;
    setRotateX(rotX);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setRotateX(0);
      setGlare({ x: 50, y: 50, opacity: 0 });
    }
  };

  // Pointer Down (Mulai Drag dengan Mouse atau Touchscreen)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Abaikan jika target klik adalah link/anchor atau tombol
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;

    setIsDragging(true);
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Pointer Move (Sedang Drag / Geser Kartu)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasDragged.current = true;
    }

    // 1 pixel geser = 0.85 derajat rotasi kartu
    setDragOffsetRotY(deltaX * 0.85);

    // Tilt X dinamis saat digeser vertikal
    const tiltX = Math.max(-20, Math.min(20, -deltaY * 0.2));
    setRotateX(tiltX);
  };

  // Pointer Up (Selesai Drag / Lepas Geseran)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    // Jika digeser, snap ke sudut terdekat (0° untuk depan, 180° untuk belakang, dsb)
    if (hasDragged.current) {
      const finalY = currentRotY + dragOffsetRotY;
      // Snap ke kelipatan 180 derajat terdekat
      const snappedRotY = Math.round(finalY / 180) * 180;
      setCurrentRotY(snappedRotY);
      setDragOffsetRotY(0);
    } else {
      // Jika hanya di-klik/tap cepat tanpa digeser, otomatis flip ke sisi sebaliknya
      const targetY = isBackFacing ? Math.floor(currentRotY / 180) * 180 : Math.ceil((currentRotY + 1) / 180) * 180;
      setCurrentRotY(targetY);
      setDragOffsetRotY(0);
    }

    setRotateX(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  // Label jabatan untuk pill style
  const divisionCleanName = anggota.divisi
    .replace(/^Divisi\s+/i, "")
    .replace(/^BPH\s*\((.*?)\)/i, "$1");

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Top Bar: Tombol Kembali & Petunjuk Interaktif Swipe */}
      <div className="flex items-center justify-between w-full max-w-[340px] mb-3 px-2">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm border border-gray-200 transition-all active:scale-95 cursor-pointer"
          >
            ← Kembali
          </button>
        ) : <div />}
        
        {/* Indikator Gesture / Swipe Interaktif */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-gray-200/60 shadow-2xs">
          <span></span>
          <span>Geser kartu untuk membalik</span>
        </div>
      </div>

      {/* Lanyard Clip / Gantungan ID Card Logam */}
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
        className="w-full max-w-[340px] aspect-[1/1.62] touch-none cursor-grab active:cursor-grabbing"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${totalRotY}deg)`,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative w-full h-full rounded-[1.8rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300"
        >
          {/* Card Border Frame Casing (Aluminum / Metallic Frame seperti di foto fisik) */}
          <div
            className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 shadow-inner border border-gray-300 pointer-events-none"
            style={{ transform: "translateZ(-1px)" }}
          />

          {/* Hologram / Specular Glare Effect */}
          <div
            className="absolute inset-0 rounded-[1.8rem] z-30 pointer-events-none transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 65%)`,
              transform: isBackFacing ? "rotateY(180deg) translateZ(2px)" : "translateZ(2px)",
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
              transform: "rotateY(0deg) translateZ(1px)",
              pointerEvents: isBackFacing ? "none" : "auto",
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
              <div className="relative flex flex-col gap-1.5 pb-1">
                {/* Baris Atas: Nama Panggilan Besar */}
                <h3 className="text-2xl font-black tracking-tight leading-none text-white drop-shadow-sm">
                  {anggota.panggilan || anggota.nama.split(" ")[0]}
                </h3>

                {/* Nama Lengkap */}
                <p className="text-[12px] font-medium text-blue-100 truncate max-w-[280px]">
                  {anggota.nama}
                </p>

                {/* Nomor Santri */}
                <p className="text-[11px] font-mono text-blue-300 tracking-wider">
                  {anggota.nomorSantri || "-"}
                </p>

                {/* Button Member Pill & Domain di Ujung Bawah Kanan */}
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-white/50 p-[2px] bg-white/10 backdrop-blur-xs shadow-xs">
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold text-white/95">
                      Member
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold text-gray-900 bg-white rounded-full shadow-xs">
                      {divisionCleanName}
                    </span>
                  </div>

                  {/* Domain Diposisikan di Ujung Bawah Kanan */}
                  <a
                    href="https://babussalam.sch.id"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11.5px] font-bold text-blue-200 hover:text-white transition-colors tracking-wide underline underline-offset-2"
                  >
                    Babussalam.sch.id
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SISI BELAKANG (BACK) - Layout Bersih, Rapi & Turun Bawah   */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[1.7rem] bg-white overflow-hidden flex flex-col justify-between text-gray-800"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(1px)",
              pointerEvents: isBackFacing ? "auto" : "none",
            }}
          >
            {/* Header Bagian Atas: Kubah Ornamen Geometris Biru Bersih */}
            <div className="relative w-full h-24 bg-[#1e40af] overflow-hidden shrink-0">
              {/* Pattern Geometris Biru Lebat di Sisi Atas */}
              <svg
                className="w-full h-full text-white opacity-45"
                viewBox="0 0 340 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path d="M10 10 h40 v40 h-40 v-20 h20 M70 10 h40 v40 h-40 v-20 h20 M130 10 h40 v40 h-40 v-20 h20 M190 10 h40 v40 h-40 v-20 h20 M250 10 h40 v40 h-40 v-20 h20 M310 10 h40 v40 h-40 v-20 h20" />
                <path d="M30 50 h40 v40 h-40 v-20 h20 M90 50 h40 v40 h-40 v-20 h20 M150 50 h40 v40 h-40 v-20 h20 M210 50 h40 v40 h-40 v-20 h20 M270 50 h40 v40 h-40 v-20 h20" />
              </svg>

              {/* Lengkungan Kubah Putih dengan Sudut Halus */}
              <div
                className="absolute inset-x-2 bottom-0 h-16 bg-white rounded-t-[2.4rem] shadow-xs"
              />
            </div>

            {/* Bagian Konten Header: Logo & Organisasi Santri Babussalam (Di Bawah Ornamen) */}
            <div className="px-6 -mt-10 relative z-10 flex flex-col items-center">
              <div className="w-full flex items-center justify-center gap-3 bg-white py-1.5 px-3 rounded-2xl">
                {/* Logo Masjid OSBA */}
                <div className="shrink-0">
                  <OsbaLogo size={42} color="#1d4ed8" />
                </div>
                {/* Teks Organisasi & Kaligrafi Arab */}
                <div className="flex items-center gap-3 text-left">
                  <div className="border-r border-gray-200 pr-3">
                    <p className="text-[12px] font-black text-gray-900 leading-[1.1]">
                      Organisasi
                    </p>
                    <p className="text-[12px] font-black text-gray-900 leading-[1.1]">
                      Santri
                    </p>
                    <p className="text-[12px] font-black text-gray-900 leading-[1.1]">
                      Babussalam
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-arabic font-bold text-gray-800 leading-tight" dir="rtl">
                      جمعية طلبة
                    </p>
                    <p className="text-[11px] font-arabic font-bold text-gray-800 leading-tight" dir="rtl">
                      باب السلام
                    </p>
                  </div>
                </div>
              </div>

              {/* Garis Pembatas Biru Solid */}
              <div className="w-full h-[2.5px] bg-[#1d4ed8] mt-3 mb-2 rounded-full" />
            </div>

            {/* Badan Kartu Belakang: Alamat, Kontak, dan Pernyataan */}
            <div className="px-6 py-2 flex flex-col justify-between flex-1 text-center">
              {/* Alamat Lengkap */}
              <div className="my-auto">
                <p className="text-[9.5px] leading-relaxed text-gray-700 font-medium">
                  Radar Auri, Jl Swadaya 3 No.40 Rt.005/011 Kel. Mekarsari,<br />
                  Kec. Cimanggis, Depok, Jawa Barat, Indonesia 16452
                </p>
              </div>

              {/* Kontak Email & Instagram Berjajar Rapi */}
              <div className="flex flex-col items-center gap-1.5 my-2">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-800">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-600 shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>babussalamsc27@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-800">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-600 shrink-0">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>@babussalamsc</span>
                </div>
              </div>

              {/* Paragraf Ketentuan Resmi Pengurus */}
              <div className="my-auto">
                <p className="text-[8.5px] leading-relaxed text-gray-600 font-normal px-1">
                  Kartu ini merupakan alat pengenal untuk pengurus{" "}
                  <b className="font-bold text-gray-900">organisasi santri babussalam</b>, kartu ini berlaku sampai akhir masa jabatan, apabila menemukan kartu ini harap mengembalikannya kepada pengurus Osba atau pengurus Ponpes Babussalam
                </p>
              </div>
            </div>

            {/* Bagian Bawah Belakang: Babussalam.sch.id Rapi Terpusat */}
            <div className="pb-5 pt-1 flex flex-col items-center">
              <a
                href="https://babussalam.sch.id"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[13px] font-black text-[#1d4ed8] hover:underline tracking-wide"
              >
                Babussalam.sch.id
              </a>
              <div className="w-16 h-0.5 bg-[#1d4ed8] mt-1 rounded-full" />
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
