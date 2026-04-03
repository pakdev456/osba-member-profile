import { useEffect, useState } from "react";
import type { DivisiData, Anggota } from "../types";
import { DivisiIcon } from "./DivisiIcon";
import { AnggotaCard } from "./AnggotaCard";
import { divisiList } from "../data/divisi";

interface DivisiModalProps {
  slug: string;
  onClose: () => void;
}

export function DivisiModal({ slug, onClose }: DivisiModalProps) {
  const [data, setData] = useState<DivisiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnggota, setSelectedAnggota] = useState<Anggota | null>(null);

  const divisiInfo = divisiList.find((d) => d.slug === slug);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}data/${slug}.json`)
      .then((r) => r.json())
      .then((json: DivisiData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedAnggota) setSelectedAnggota(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, selectedAnggota]);

  const warna = data?.warna ?? divisiInfo?.warna ?? "#2a9d8f";

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          if (selectedAnggota) setSelectedAnggota(null);
          else onClose();
        }}
      />
      {selectedAnggota ? (
        <div
          className="relative z-10 w-full max-w-sm mx-auto rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: `${warna}15` }}
        >
          <AnggotaCard
            anggota={selectedAnggota}
            warna={warna}
            onBack={() => setSelectedAnggota(null)}
          />
        </div>
      ) : (
        <div
          className="relative z-10 w-full max-w-lg mx-auto rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden bg-white"
          style={{ maxHeight: "85vh" }}
        >
          <div
            className="px-6 pt-6 pb-5"
            style={{ backgroundColor: warna }}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-2xl leading-none"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <DivisiIcon icon={slug} color="white" size={28} />
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-medium">Divisi</p>
                <h2 className="text-white text-2xl font-bold">{data?.divisi ?? slug}</h2>
              </div>
            </div>
            <p className="text-white/70 text-sm mt-3">
              {data?.anggota.length ?? 0} anggota terdaftar
            </p>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 180px)" }}>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: `${warna} transparent transparent transparent` }}
                />
              </div>
            ) : (
              <ul className="px-4 py-4 flex flex-col gap-2">
                {data?.anggota.map((anggota) => (
                  <li key={anggota.id}>
                    <button
                      onClick={() => setSelectedAnggota(anggota)}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors text-left group"
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                        style={{ backgroundColor: warna }}
                      >
                        {anggota.nama.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{anggota.nama}</p>
                        <p className="text-xs text-gray-400 mt-0.5">"{anggota.panggilan}"</p>
                      </div>
                      <span className="text-gray-300 group-hover:text-gray-400 text-lg transition-colors">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
