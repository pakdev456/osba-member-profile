import type { Anggota } from "../types";

interface AnggotaCardProps {
  anggota: Anggota;
  warna: string;
  onBack: () => void;
}

export function AnggotaCard({ anggota, warna, onBack }: AnggotaCardProps) {
  return (
    <div className="overflow-hidden rounded-t-3xl md:rounded-3xl" style={{ backgroundColor: `${warna}15` }}>
      <div className="relative">
        <div
          className="h-28 w-full"
          style={{ backgroundColor: warna }}
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-1 text-sm"
        >
          ← Kembali
        </button>
        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white"
            style={{ backgroundColor: warna }}
          >
            {anggota.nama.charAt(0)}
          </div>
        </div>
      </div>

      <div className="pt-14 pb-6 px-6 flex flex-col items-center">
        <h2
          className="text-2xl font-extrabold text-center"
          style={{ color: warna }}
        >
          {anggota.nama}
        </h2>
        <p className="text-gray-500 text-sm mt-1">"{anggota.panggilan}"</p>

        <div
          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${warna}20`,
            color: warna,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}>
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
            <line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
          {anggota.divisi}
        </div>

        <div className="mt-5 w-full flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke={warna} strokeWidth="2" width={18} height={18}>
                <line x1="4" y1="9" x2="20" y2="9"/>
                <line x1="4" y1="15" x2="20" y2="15"/>
                <line x1="10" y1="3" x2="8" y2="21"/>
                <line x1="16" y1="3" x2="14" y2="21"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Nomor Santri</p>
              <p className="text-base font-semibold text-gray-800 mt-0.5">{anggota.nomorSantri}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke={warna} strokeWidth="2" width={18} height={18}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Masa Jabatan</p>
              <p className="text-base font-semibold text-gray-800 mt-0.5">{anggota.masaJabatan}</p>
            </div>
          </div>
        </div>

        <a
          href={anggota.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: warna }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          Kunjungi Instagram
        </a>
      </div>
    </div>
  );
}
