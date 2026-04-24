import { Link } from "wouter";
import { divisiList } from "../data/divisi";
import { DivisiIcon } from "../components/DivisiIcon";
import { OsbaLogo } from "../components/OsbaLogo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 bg-white border-b border-gray-100 z-10 px-6 py-3 flex items-center gap-2 shadow-sm">
        <OsbaLogo size={32} />
        <span className="font-semibold text-gray-800 text-base">Data OSBA</span>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="flex flex-col items-center mb-12">
          <div className="mb-4">
            <OsbaLogo size={72} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight">
            Organisasi Santri<br />Babussalam
          </h1>
          <p className="text-gray-500 mt-3 text-center max-w-sm text-sm leading-relaxed">
            Struktur Kepengurusan OSBA terbagi dalam {divisiList.length} divisi utama. Pilih divisi untuk melihat anggota organisasi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
          {divisiList.map((divisi) => (
            <Link
              key={divisi.slug}
              href={`/${divisi.slug}`}
              className="group flex flex-col items-start gap-3 p-5 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer text-left no-underline"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${divisi.warna}18` }}
              >
                <DivisiIcon icon={divisi.icon} color={divisi.warna} size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{divisi.nama}</p>
                <p className="text-xs text-gray-400 mt-0.5">Lihat Anggota</p>
              </div>
              <span className="text-gray-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-8 flex flex-col items-center gap-3 border-t border-gray-50">
        <OsbaLogo size={32} color="#9ca3af" />
        <p className="text-xs text-gray-400">
          © 2026 Organisasi Santri Babussalam. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
