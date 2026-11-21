import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import type { DivisiData, Anggota } from "../types";
import { OsbaLogo } from "../components/OsbaLogo";
import { AnggotaCard } from "../components/AnggotaCard";
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
    fetch(`${import.meta.env.BASE_URL}data/${slug}.json?v=2`, { cache: "no-store" })
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-6 py-3 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <OsbaLogo size={32} />
          <span className="font-bold text-gray-800 text-base">Data OSBA</span>
        </Link>
        <Link
          href={`/${slug}`}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 no-underline transition-colors"
        >
          Daftar {divisiInfo.nama}
        </Link>
      </header>

      <main className="flex-1 px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {loading || !anggota ? (
            <div className="flex items-center justify-center py-20">
              <div
                className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin"
                style={{ borderColor: `${warna} transparent transparent transparent` }}
              />
            </div>
          ) : (
            <AnggotaCard
              anggota={anggota}
              warna={warna}
              onBack={() => {
                window.location.href = `${import.meta.env.BASE_URL}${slug}`;
              }}
            />
          )}
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center gap-2 border-t border-gray-200/60 bg-white/50 backdrop-blur-xs">
        <OsbaLogo size={28} color="#9ca3af" />
        <p className="text-xs text-gray-400">
          © 2026 Organisasi Santri Babussalam. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
