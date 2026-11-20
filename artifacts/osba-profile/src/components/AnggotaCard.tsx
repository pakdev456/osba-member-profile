import type { Anggota } from "../types";

interface AnggotaCardProps {
  anggota: Anggota;
  warna: string;
  onBack: () => void;
}

export function AnggotaCard({ anggota, warna, onBack }: AnggotaCardProps) {
  return (
    <div className="perspective-1000 group w-full max-w-sm mx-auto p-4">
      <div className="transition-all duration-700 ease-out transform-style-3d group-hover:rotate-y-12 group-hover:rotate-x-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] bg-white border-2 border-white/50 relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        
        <div className="relative">
          {/* Top Section */}
          <div className="h-36 w-full relative overflow-hidden" style={{ backgroundColor: warna }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            
            <button
              onClick={onBack}
              className="absolute top-4 left-4 text-white/90 hover:text-white flex items-center gap-1 text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md transition-all hover:bg-white/30"
            >
              ← Kembali
            </button>
          </div>

          {/* Avatar / Paper Plane Logo Area */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <div
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-white shadow-2xl border-[6px] border-white transition-transform duration-500 hover:rotate-12"
              style={{ backgroundColor: warna }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8 flex flex-col items-center bg-white">
            <h2
              className="text-3xl font-black text-center tracking-tight"
              style={{ color: warna }}
            >
              {anggota.nama}
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide italic">"{anggota.panggilan}"</p>

            <div
              className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest"
              style={{
                backgroundColor: `${warna}15`,
                color: warna,
              }}
            >
              {anggota.divisi}
            </div>

            <div className="mt-8 w-full flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-gray-50/50 rounded-3xl px-6 py-4 border border-gray-100/50">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-gray-100">
                  <span className="text-2xl">🆔</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No. Santri</p>
                  <p className="text-base font-bold text-gray-800">{anggota.nomorSantri}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50/50 rounded-3xl px-6 py-4 border border-gray-100/50">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-gray-100">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Masa Jabatan</p>
                  <p className="text-base font-bold text-gray-800">{anggota.masaJabatan}</p>
                </div>
              </div>
            </div>

            <a
              href={anggota.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-black text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-xl"
              style={{ backgroundColor: warna }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>📸</span>
              KUNJUNGI INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
