import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import type { DivisiData } from "../types";
import { DivisiIcon } from "../components/DivisiIcon";
import { OsbaLogo } from "../components/OsbaLogo";
import { divisiList } from "../data/divisi";
import NotFound from "./not-found";

export default function DivisiPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 bg-white border-b border-gray-100 z-10 px-6 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <OsbaLogo size={32} />
          <span className="font-semibold text-gray-800 text-base">Data OSBA</span>
        </Link>
      </header>

      <div
        className="px-6 pt-6 pb-8"
        style={{ backgroundColor: warna }}
      >
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="text-white/80 hover:text-white text-sm flex items-center gap-1 mb-4 no-underline"
          >
            ← Kembali ke beranda
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <DivisiIcon icon={slug} color="white" size={32} />
            </div>
            <div>
              <p className="text-white/70 text-xs uppercase tracking-widest font-medium">Divisi</p>
              <h1 className="text-white text-3xl font-bold">{data?.divisi ?? divisiInfo.nama}</h1>
              <p className="text-white/70 text-sm mt-1">
                {data?.anggota.length ?? 0} anggota terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: `${warna} transparent transparent transparent` }}
              />
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {data?.anggota.map((anggota) => (
                <li key={anggota.id}>
                  <Link
                    href={`/${slug}/${anggota.id}`}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white hover:shadow-md transition-shadow text-left group no-underline"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                      style={{ backgroundColor: warna }}
                    >
                      {anggota.nama.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{anggota.nama}</p>
                      <p className="text-xs text-gray-400 mt-0.5">"{anggota.panggilan}"</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-400 text-lg transition-colors">›</span>
                  </Link>
                </li>
              ))}
            </ul>
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
