import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import type { DivisiData, Anggota } from "../types";
import { OsbaLogo } from "../components/OsbaLogo";
import { divisiList } from "../data/divisi";
import NotFound from "./not-found";

export default function AnggotaPage() {
  const params = useParams<{ slug: string; id: string }>();
  const { slug, id } = params;
  const divisiInfo = divisiList.find((d) => d.slug === slug);

  const [data, setData] = useState<DivisiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);
    fetch(`${import.meta.env.BASE_URL}data/${slug}.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((json: DivisiData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (!divisiInfo) return <NotFound />;
  if (error) return <NotFound />;

  const warna = data?.warna ?? divisiInfo.warna;
  const anggota: Anggota | undefined = data?.anggota.find(
    (a) => String(a.id) === String(id),
  );

  if (!loading && data && !anggota) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 bg-white border-b border-gray-100 z-10 px-6 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <OsbaLogo size={32} />
          <span className="font-semibold text-gray-800 text-base">Data OSBA</span>
        </Link>
      </header>

      <main className="flex-1 px-4 py-8 flex justify-center">
        <div className="w-full max-w-sm">
          {loading || !anggota ? (
            <div className="flex items-center justify-center py-20">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: `${warna} transparent transparent transparent` }}
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <div className="relative">
                <div
                  className="h-28 w-full"
                  style={{ backgroundColor: warna }}
                />
                <Link
                  href={`/${slug}`}
                  className="absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-1 text-sm no-underline"
                >
                  ← Kembali
                </Link>
                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white"
                    style={{ backgroundColor: warna }}
                  >
                    {anggota.nama.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="pt-14 pb-6 px-6 flex flex-col items-center bg-white">
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
                    backgroundColor: `${warna}18`,
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
                  <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shrink-0 shadow-sm">
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

                  <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shrink-0 shadow-sm">
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
                  className="mt-5 w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-90 no-underline"
                  style={{ backgroundColor: warna }}
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
          )}
        </div>
      </main>

      <footer className="py-8 flex flex-col items-center gap-3 border-t border-gray-100 bg-white">
        <OsbaLogo size={32} color="#9ca3af" />
        <p className="text-xs text-gray-400">
          © 2026 Organisasi Santri Babussalam. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
