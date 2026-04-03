export interface Anggota {
  id: number;
  nama: string;
  panggilan: string;
  nomorSantri: string;
  masaJabatan: string;
  instagram: string;
  divisi: string;
}

export interface DivisiData {
  divisi: string;
  warna: string;
  anggota: Anggota[];
}

export interface DivisiInfo {
  nama: string;
  slug: string;
  warna: string;
  icon: string;
}
