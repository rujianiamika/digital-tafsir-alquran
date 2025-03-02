
export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

export interface SurahListResponse {
  code: number;
  message: string;
  data: Surah[];
}

export interface Ayat {
  ayat: number;
  teks: string;
  arabic?: string;
  translation?: string;
}

export interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
  tafsir: Ayat[];
  suratSelanjutnya: Surah | false;
  suratSebelumnya: Surah | false;
}

export interface SurahDetailResponse {
  code: number;
  message: string;
  data: SurahDetail;
}

export interface QuranQuote {
  text: string;
  surah: string;
  ayat: number;
}
